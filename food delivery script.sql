CREATE TABLE client(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
fistname TEXT NOT NULL,
lastname TEXT NOT NULL,
password TEXT NOT NULL,
email TEXT,
phonenumber TEXT NOT NULL
);


CREATE TABLE foodplace(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
address TEXT NOT NULL
);

CREATE TABLE product(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT,
price DOUBLE NOT NULL,
placeid INTEGER NOT NULL,
FOREIGN KEY(placeid) REFERENCES foodplace(id)
);

CREATE TABLE "order"(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
createdtime UNSIGNED BIG INT NOT NULL,
isdelivered BOOLEAN DEFAULT FALSE NOT NULL,
clientid INTEGER NOT NULL,
placeid INTEGER NOT NULL,
FOREIGN KEY(clientid) REFERENCES client(id),
FOREIGN KEY(placeid) REFERENCES foodplace(id)
);


CREATE TABLE orderitem(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
orderid INTEGER NOT NULL,
productid INTEGER NOT NULL,
amount INTEGER NOT NULL,
FOREIGN KEY(productid) REFERENCES product(id),
FOREIGN KEY(orderid) REFERENCES "order"(id)
);



INSERT INTO client (fistname, lastname, email, phonenumber, password) VALUES
("Дмитро", "Коробчанський", "dmytro.korobchanskiy@gmail.com", "+3804545879465", "123123"),
("Михайло", "Поперечний", "michael.poperechniy@gmail.com", "+38045875454455", "123123"),
("Андрій", "Андрійнович", "andrew@gmail.com", "+3804456875465465", "123123"),
("Володимир", "Володимировский", "volodimyr@gmail.com", "+38067446545151", "123123"),
("Микола", "Мисичанський", "mikola@gmail.com", "+3804542003874", "123123"),
("Василь", "Вовський", "vasyl@gmail.com", "+380749635432345", "123123"),
("Іван", "Скоробогатих", "ivan@gmail.com", "+3809638545241", "123123"),
("В'ячеслав", "Велих", "vyacheslav@gmail.com", "+380124578645", "123123"),
("Максим", "Чичиков", "maksim@gmail.com", "+3804156789132", "123123"),
("Євген", "Лужний", "evgen@gmail.com", "+380001457800", "123123");


INSERT INTO foodplace (name, address) VALUES
("Макдональдс","пр.Науки 25"),
("Сільпо","пр. Тракторобудівників 126"),
("Сушипапа","вул. Сумська 37А");

INSERT INTO product (name, description, price, placeid) VALUES
("БігМак меню", "БігМак, картопля фрі велика, спрайт 0.33", 125., 1),
("БігТейсті меню", "БігТейсті, картопля фрі велика, фанта 0.33", 147., 1),
("Нагетс меню", "Нагетс, 9шт; соус часниковий, кола 0.33", 136., 1),
("Борошно Новопокровське 2кг", "", 41.49, 2),
("Картопля молода сітка 2.5кг", "", 75., 2),
("Вода Моршинська 2л негазована", "", 27.80, 2),
("Сет Філа", "48шт, васабі, соєвий соус, імбир", 865., 3),
("Піцца 4 пори роки", "довжина 1 метр", 750., 3),
("Лимонад", "1л", 35., 3);


SELECT * from client c;

SELECT o.id, o.createdtime , o.isdelivered , o.clientid , f.name || ', ' || f.address , sum(o2.amount * p.price)
from "order" o
join foodplace f on f.id = o.placeid
join orderitem o2 on o2.orderid = o.id
join product p on o2.productid = p.id
where o.clientid = 1
GROUP BY o.id;

SELECT *
from "order" o;

SELECT *
from client c;


SELECT *
from "order" o
where o.clientid = 1;









