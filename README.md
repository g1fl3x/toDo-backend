# toDo-backend
my first expressJs application

1. change postgres user password (optional):
```
sudo -u postgres psql postgres
```
```
\password postgres # you can skip this
```

2. create .env
```
nano config/.env
```

.env example:
```
APP_PORT=3000
USERNAME=mySecretUsername
PASSWORD=myVeryVeryVerySecretPassw0rd
DB_NAME=postgres
```

3. migrations:
for run migration:
```
npx sequelize-cli db:migrate
```
for restore old migration:
```
npx sequelize-cli db:migrate:undo
```

4. run:
```
cd src && node app.js
```
