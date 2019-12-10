- Issues could not connect to postgres sql => open security group and add more rule to support inbound from anywhere and port.
- pgAdmin add connect to aws:
    database: 'sharemoney',
    host: 'database-share-money.c4ybiljgernl.us-east-2.rds.amazonaws.com',
    port: '5432',
    user: 'postgres',
    password: 'Admin-123',
- x