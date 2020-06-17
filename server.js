const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
let weatherRepo = require('./weather');
let openWeatherApi = require('./openweatherApi');

class RequestHandler {
  authenticate(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
      if (username === config.testUsername && password === config.testUserpassword) {
        let token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' });
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }

  async getWeather(req, res) {
    try {
      let data = await openWeatherApi.getCurrentWeatherHongKong();
      if (data) {
        await weatherRepo.insertWeatherData(data);
      } else {
        data = await weatherRepo.getBackupWeatherData();
      }

      res.json({ success: true, data: data });
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  }
}

function main() {
  let app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  let handlers = new RequestHandler();
  app.post('/authenticate', handlers.authenticate);
  app.get('/weather', middleware.validateJWT, handlers.getWeather);

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
