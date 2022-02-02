# toDo-backend
my first expressJs application

1. change postgres user password:
```
sudo -u postgres psql postgres
```
```
\password postgres
```
2. migrations:
```
cd src && npx sequelize-cli init # to create migrations env
```
after this, change config/config.js, to your data and run migration
```
npx sequelize-cli db:migrate
```
3. run:
```
cd src && env USERNAME=myUsername PASSWORD=mySecretPassword DBNAME=myDatabaseName node app.js
```
