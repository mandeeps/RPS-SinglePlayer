// Generated by CoffeeScript 1.6.3
(function() {
  var allowCORS, app, db, express, mongoose, port;

  express = require('express');

  app = express();

  mongoose = require('mongoose');

  mongoose.connect('mongodb://127.0.0.1:27017/rps');

  port = 8080;

  allowCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
      return res.send(200);
    } else {
      return next();
    }
  };

  app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(allowCORS);
  });

  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    var Player;
    Player = mongoose.model('Player', {
      name: String,
      winCount: Number,
      lossCount: Number,
      tieCount: Number
    });
    app.put('/api/players/:person', function(req, res) {
      console.log('put request');
      console.log(req.params);
      return Player.findOne({
        'name': req.params.person
      }, function(err, account) {
        if (err) {
          return res.send(err);
        } else {
          if (account == null) {
            Player.create({
              name: req.params.person,
              winCount: 0,
              lossCount: 0,
              tieCount: 0
            }, function(err, account) {
              if (err) {
                res.send(err);
              }
              return res.json(account);
            });
          } else {
            res.json(account);
          }
          return console.log('account: ' + account);
        }
      });
    });
    app.get('/api/players', function(req, res) {
      console.log('got get request');
      return Player.find({}, null, {
        sort: {
          winCount: -1
        },
        limit: 3
      }, function(err, players) {
        if (err) {
          res.send(err);
          console.log(err);
        }
        res.json(players);
        return console.log('response to get');
      });
    });
    app.post('/api/players', function(req, res) {
      console.log('update one account');
      console.log(req.body);
      return Player.findOneAndUpdate({
        'name': req.body.name
      }, {
        $set: {
          winCount: req.body.winCount,
          lossCount: req.body.lossCount,
          tieCount: req.body.tieCount
        }
      }, function(err, player) {
        if (err) {
          return res.send(err);
        }
      });
    });
    app.listen(port);
    return console.log('running on ' + port);
  });

}).call(this);