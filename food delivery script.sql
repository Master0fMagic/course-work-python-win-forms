CREATE TABLE client(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
fistname TEXT NOT NULL,
lastname TEXT NOT NULL,
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



INSERT INTO client (fistname, lastname, email, phonenumber) VALUES
("������", "�������������", "dmytro.korobchanskiy@gmail.com", "+3804545879465"),
("�������", "����������", "michael.poperechniy@gmail.com", "+38045875454455"),
("�����", "����������", "andrew@gmail.com", "+3804456875465465"),
("���������", "���������������", "volodimyr@gmail.com", "+38067446545151"),
("������", "������������", "mikola@gmail.com", "+3804542003874"),
("������", "��������", "vasyl@gmail.com", "+380749635432345"),
("����", "������������", "ivan@gmail.com", "+3809638545241"),
("�'�������", "�����", "vyacheslav@gmail.com", "+380124578645"),
("������", "�������", "maksim@gmail.com", "+3804156789132"),
("�����", "������", "evgen@gmail.com", "+380001457800");


INSERT INTO foodplace (name, address) VALUES
("�����������","��.����� 25"),
("ѳ����","��. ���������������� 126"),
("��������","���. ������� 37�");

INSERT INTO product (name, description, price, placeid) VALUES
("������ ����", "������, �������� �� ������, ������ 0.33", 125., 1),
("�������� ����", "��������, �������� �� ������, ����� 0.33", 147., 1),
("������ ����", "������, 9��; ���� ����������, ���� 0.33", 136., 1),
("������� �������������� 2��", "", 41.49, 2),
("�������� ������ ���� 2.5��", "", 75., 2),
("���� ���������� 2� ����������", "", 27.80, 2),
("��� Գ��", "48��, �����, ����� ����, �����", 865., 3),
("ϳ��� 4 ���� ����", "������� 1 ����", 750., 3),
("�������", "1�", 35., 3);
