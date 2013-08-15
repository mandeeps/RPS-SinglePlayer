// Generated by CoffeeScript 1.6.3
(function() {
  var main;

  main = angular.module('RPS', ['ui.bootstrap']);

  main.config(function($routeProvider) {
    return $routeProvider.when('/page/:slug', {
      templateUrl: 'partials/page.html',
      controller: 'RouteController'
    }).otherwise({
      redirectTo: 'page/name'
    });
  });

  angular.module('RPS').controller('RouteController', function($scope, $rootScope, $routeParams) {
    var slug;
    slug = $routeParams.slug;
    return $scope.page = $rootScope.pages[slug];
  });

  angular.module('RPS').controller('AppController', function($scope, $rootScope) {
    return $rootScope.pages = {
      "name": "part where player name entered",
      "contact": "This is the contact page."
    };
  });

  angular.module('RPS').controller('choices', function($scope) {
    return $scope.images = {
      'rock': {
        image: 'static/rock.svg'
      },
      'paper': {
        image: 'static/paper.svg'
      },
      'scissors': {
        image: 'static/scissors.svg'
      }
    };
  });

  angular.module('RPS').controller('AskPlayer', function($scope) {
    $scope.question = 'Hello, what is your name?';
    $scope.name = 'Player';
    return $scope.submit = function() {
      return alert('this is the part where I change the view...');
    };
  });

}).call(this);
