- Issues:
**1. could not connect to postgres sql => open security group and add more rule to support inbound from anywhere and port.

- pgAdmin add connect to aws:
    database: 'sharemoney',
    host: 'database-share-money.c4ybiljgernl.us-east-2.rds.amazonaws.com',
    port: '5432',
    user: 'postgres',
    password: 'Admin-123',


#=================================================================================
- SQL INSERT DATA:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO public.contents(
	id, "providerId", description, "userId", "actionType", "createdAt", "updatedAt", url)
	VALUES (uuid_generate_v4(),uuid_generate_v4(), 'youtube', uuid_generate_v4(), 'view', now(), now(), 'https://www.youtube.com/watch?v=9SZA5yVJbhI&feature=share&fbclid=IwAR0Dg910cCLY-07eksfGwUgq0j1eUYU6_GPzZEPWg0UodaZwoJrBTGNAC7k');

#=================================================================================