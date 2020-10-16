# MLMS (MakerLab Management Software)

## Developer

using npm as a package manager, please install node to get npm package manager.

##### Running the frontend:

```
cd client
npm i #install all dependencies
npm start #starts the react app in dev mode
```

Before you run the server, you need to edit the databasecapstone/settings.py/ file to point to your database server

##### Running the server

```
cd databasecapstone
python3 manage.py migrate
python3 manage.py runserver #runs the server
```

##### Remember to setup environment variables for the email smtp server

#

## Creating SuperUser

```
python manage.py createsuperuser
```

#

## Deployment

##### note this is done in a server with nginx loaded

##### load React with static files:

```
cd client
npm run build
cp build /var/www/html/MLMS # nginx is configured to o
```

to begin the process of making a daemon use

```
pm2 ecosystem
```

Insert neccessary evironment variables in the ecosystem.config.js file. Then run:

```
pm2 start ecosystem
```
