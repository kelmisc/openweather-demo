# openweather-demo

1. run docker-compose run openweather npm install
2. insert the openweather api key in config.js
3. run docker-compose up
4. connect to mongodb in docker 
5. run use weather and db.createCollection("weather") in mongodb
6. post http://localhost:8000/authenticate with {username: 'test', password: 'password'}
7. copy the token from the response of /authenticate
8. get http://localhost:8000/weather with the copied token.
