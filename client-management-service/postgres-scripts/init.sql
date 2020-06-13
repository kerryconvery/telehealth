CREATE DATABASE telehealth;
GRANT ALL PRIVILEGES ON DATABASE telehealth to postgres;

CREATE SCHEMA telehealth AUTHORIZATION postgres;

GRANT ALL PRIVILEGES ON SCHEMA telehealth to postgres;

CREATE TABLE telehealth.clients (
	id UUID PRIMARY KEY,
  title VARCHAR (4),
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
  phone_number VARCHAR (10) NOT NULL
);

GRANT ALL PRIVILEGES ON TABLE telehealth.clients to postgres;

SET search_path = telehealth, public;