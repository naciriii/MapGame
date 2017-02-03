angular.module('starter.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl as apctrl'
  })



  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
    .state('app.produits', {
      url: '/produits/:type',
      views: {
        'menuContent': {
          templateUrl: 'templates/produits.html',
          controller: 'ProduitsCtrl as pctrl'
        }
      }
    })
  .state('app.detaille', {
    url: '/produits/detaille/:idProd',
    views: {
      'menuContent': {
        templateUrl: 'templates/detaille.html',
        controller: 'ProduitsCtrl as pctrl'
      }
    }
  })
  .state('app.panier', {
    url: '/panier',
    views: {
      'menuContent': {
        templateUrl: 'templates/panier.html',
        controller: 'ProduitsCtrl as pctrl'
      }
    }
  })
   .state('app.commandes', {
    url: '/commandes',
    views: {
      'menuContent': {
        templateUrl: 'templates/commandes.html',
        controller: 'commandesController as cmdctrl'
      }
    }
  })
  .state('app.compte', {
    url: '/compte',
    views: {
      'menuContent': {
        templateUrl: 'templates/compte.html',
        controller: 'compteController as cctrl'
      }
    }
  })
  .state('app.inscription', {
    url: '/inscription',
    views: {
      'menuContent': {
        templateUrl: 'templates/inscription.html',
        controller: 'inscriptionController as insctrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
