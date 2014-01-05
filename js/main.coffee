"use strict"

window.addEventListener 'load', ->
  FastClick.attach document.body
,false

main = angular.module('RPS',[])

main.service 'sharedData', ->
  this.name = 'name'
  this.choice = 'choice'
  this.winCount = 0
  this.lossCount = 0
  this.tieCount = 0
  this.view = 'partials/about.html'

main.controller 'Partials', ($scope, sharedData) ->
  $scope.data = sharedData

main.controller 'AskName', ($scope, sharedData, $http) ->
  $scope.message = 'Hello, what is your name?'
  $scope.name = 'Player'
  $scope.submit = ->
    sharedData.name = $scope.name if $scope.name?
    $http.put('https://mean-rps.herokuapp.com/api/players/' + sharedData.name)
    .success (data) ->
      console.log 'Succcess: ' + data
      sharedData.winCount = data.winCount
      sharedData.lossCount = data.lossCount
      sharedData.tieCount = data.tieCount
    .error (err) ->
      console.log 'Error getting this players data: ' + err
    sharedData.view = 'partials/choice.html' if $scope.name?

main.controller 'ChooseRPS', ($scope, sharedData) ->
  $scope.message = "OK " + sharedData.name + "! Choose Rock, Paper or Scissors!"
  $scope.images =
    rock:
      image: 'static/rock.svg'
      name: 'rock'
    paper:
      image: 'static/paper.svg'
      name: 'paper'
    scissors:
      image: 'static/scissors.svg'
      name: 'scissors'

  $scope.select = (choice) ->
    sharedData.choice = choice
    sharedData.view = 'partials/end.html'

main.controller 'Final', ($scope, sharedData, $http) ->
  $scope.name = sharedData.name
  $scope.choice = sharedData.choice
  select = ['rock', 'paper', 'scissors']
  rand = Math.floor(Math.random() * select.length)
  $scope.comp = select[rand]
  if sharedData.choice is $scope.comp then result = 'tied'; sharedData.tieCount++
  if sharedData.choice is 'rock' and $scope.comp is 'paper' then result = 'lose'; sharedData.lossCount++
  if sharedData.choice is 'rock' and $scope.comp is 'scissors' then result = 'win'; sharedData.winCount++
  if sharedData.choice is 'paper' and $scope.comp is 'rock' then result = 'win'; sharedData.winCount++
  if sharedData.choice is 'paper' and $scope.comp is 'scissors' then result = 'lose'; sharedData.lossCount++
  if sharedData.choice is 'scissors' and $scope.comp is 'rock' then result = 'lose'; sharedData.lossCount++
  if sharedData.choice is 'scissors' and $scope.comp is 'paper' then result = 'win'; sharedData.winCount++
  $scope.message = sharedData.name + ', you ' + result + '!'
  $scope.scores = 'Won: ' + sharedData.winCount + ' Lost: ' + sharedData.lossCount + ' Tied: ' + sharedData.tieCount
  $http.post('https://mean-rps.herokuapp.com/api/players', {'name':sharedData.name,'winCount':sharedData.winCount,'lossCount':sharedData.lossCount,'tieCount':sharedData.tieCount})
  .error (err) ->
    console.log err
  $http.get('https://mean-rps.herokuapp.com/api/players')
  .success (data) ->
    $scope.db = data
  .error (err) ->
    console.log 'Error getting list of players: ' + err
  $scope.click = ->
    sharedData.view = 'partials/choice.html'

main.controller 'about', ($scope, sharedData) ->
  $scope.click = ->
    sharedData.view = 'partials/play.html'