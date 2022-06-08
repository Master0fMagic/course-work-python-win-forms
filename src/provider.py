from abc import ABC, abstractmethod
import dto
import sqlite3
import converter
import time


class SqliteDatabaseProvider:
    __connection = None

    @classmethod
    def get_service(cls):
        if not cls.__connection:
            cls.__connection = sqlite3.connect('food-delivery.db')
        return SqliteDatabaseProvider()

    def execute_select(self, query: str):
        cursor = self.__connection.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()
        return records

    def execute_update(self, query):
        cursor = self.__connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        self.__connection.commit()
        cursor.close()
        return res


class AbstractClientProvider(ABC):
    @abstractmethod
    def is_login_exist(self, login: str) -> bool:
        pass

    @abstractmethod
    def check_password(self, login: str, password: str) -> bool:
        pass

    @abstractmethod
    def get_client(self, login: str) -> dto.Client:
        pass

    @abstractmethod
    def register_new_user(self, firstname: str, lastname: str, phone_number: str, password: str, email: str):
        pass


class AbstractOrderProvider(ABC):
    @abstractmethod
    def get_short_order_info(self, order_id: int) -> dto.Order:
        pass

    @abstractmethod
    def get_full_order_info(self, order_id: int) -> dto.Order:
        pass

    @abstractmethod
    def get_short_order_info_by_client(self, client_id: int) -> list[dto.Order]:
        pass

    @abstractmethod
    def create_order(self, client_id: int, food_place_id: int, items: list[dto.OrderItem]):
        pass

    @abstractmethod
    def complete_order(self, order_id):
        pass


class AbstractFoodProvider(ABC):
    @abstractmethod
    def get_food_place_list(self) -> list[dto.FoodPlace]:
        pass

    @abstractmethod
    def get_product_by_food_place(self, place_id: int) -> list[dto.Product]:
        pass


class SqliteDataProvider(AbstractClientProvider, AbstractOrderProvider, AbstractFoodProvider):
    _provider = None

    def __init__(self):
        self._db = SqliteDatabaseProvider.get_service()

    @classmethod
    def get_provider(cls) -> AbstractClientProvider:
        if not cls._provider:
            cls._provider = SqliteDataProvider()
        return cls._provider

    def is_login_exist(self, login: str) -> bool:
        sql = f'''
        SELECT EXISTS (
	SELECT c.id
	from client c 
	where c.email = '{login}'
		or c.phonenumber = '{login}'
);
        '''
        res = self._db.execute_select(sql)
        return bool(int(res[0][0]))

    def check_password(self, login: str, password: str) -> bool:
        sql = f'''SELECT c.password = '{password}'
FROM client c 
WHERE c.email = '{login}' or c.phonenumber = '{login}';
'''
        res = self._db.execute_select(sql)
        return bool(int(res[0][0]))

    def get_client(self, login: str) -> dto.Client:
        sql = f'''
        SELECT *
from client c 
where c.email = '{login}' or c.phonenumber = '{login}';
'''
        return converter.DbResponseToClientConverter().convert(data=self._db.execute_select(sql)[0])

    def register_new_user(self, firstname: str, lastname: str, phone_number: str, password: str,
                          email: str) -> dto.Client:
        sql = f'''
        INSERT INTO client (fistname, lastname, email, phonenumber, password) VALUES
("{firstname}", "{lastname}", "{email}", "{phone_number}", "{password}")
        '''
        self._db.execute_update(sql)
        return self.get_client(email)
        pass

    def get_short_order_info(self, order_id: int) -> dto.Order:
        sql = f'''
SELECT *
from "order" o 
where o.id ='{order_id}'
'''
        return converter.DbResponseToOrderConverter().convert(data=self._db.execute_select(sql))

    def get_full_order_info(self, order_id: int) -> dto.Order:
        order = self.get_short_order_info(order_id)
        sql = f'''
        SELECT o.amount, p.id, p.name, p.description , p.price 
FROM orderitem o join product p on p.id = o.productid
WHERE o.orderid = '{order_id}'
'''
        items = [converter.DbResponseToOrderItemConverter().convert(data=item) for item in self._db.execute_select(sql)]
        order.add_items(items)
        return order

    def get_short_order_info_by_client(self, client_id: int) -> list[dto.Order]:
        sql = f'''
SELECT *
from "order" o 
where o.clientid = '{client_id}'
'''
        return [converter.DbResponseToOrderConverter().convert(data=item) for item in self._db.execute_select(sql)]

    def create_order(self, client_id: int, food_place_id: int, items: list[dto.OrderItem]) -> None:
        sql = f'''
INSERT INTO "order" (createdtime, isdelivered, clientid, placeid) VALUES
({int(time.time())},{False} ,{client_id} ,{food_place_id} ) returning id
'''
        order_id = int(self._db.execute_update(sql)[0][0])
        sql = f'''
INSERT INSERT orderitem (orderid, productid, amount) VALUES
{', '.join([f'({order_id},{item.product.id},{item.amount})' for item in items])};
'''
        self._db.execute_update(sql)

    def complete_order(self, order_id):
        sql = f'''
UPDATE "order" 
set isdelivered = TRUE 
where id ='{order_id}'
'''
        self._db.execute_update(sql)

    def get_food_place_list(self) -> list[dto.FoodPlace]:
        sql = '''
       SELECT *
from foodplace f '''
        return [converter.DbResponseToFoodPlaceConverter().convert(data=item) for item in self._db.execute_select(sql)]

    def get_product_by_food_place(self, place_id: int) -> list[dto.Product]:
        sql = f'''
SELECT p.id, p.name, p.description , p.price 
FROM product p
WHERE p.placeid = {place_id}
'''
        return [converter.DbResponseToProductConverter().convert(data=item) for item in self._db.execute_select(sql)]

