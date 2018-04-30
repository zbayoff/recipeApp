import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';

const app = angular.module('recipeApp', ['ngAnimate', 'ngRoute']);

app.config(function config($locationProvider, $routeProvider) {
  $routeProvider
    .when('/recipes', {
      template: '<recipe-list></recipe-list>'
    })
    .when('/recipes/:recipeId', {
      template: '<recipe-detail></recipe-detail>'
    })
  // .otherwise('/');
  $locationProvider.html5Mode(true);
});

// app.controller('NavController', function ($scope, $location) {
//   $scope.isActive = function (viewLocation) {
//     var active = viewLocation === $location.path();
//     return active;
//   };
// });

app.component('navList', {
  templateUrl: '/includes/nav.html',
  controller: function NavController ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      let active = viewLocation === $location.path();
      if ($location.path().substring(0, 8) === '/recipes' && viewLocation === '/recipes') {
        active = true;
        return active;
      }
      return active;
    };
  }
})

app.component('recipeDetail', {
  templateUrl: '/includes/recipe.html',
  controller: function RecipeDetailController($http, $routeParams) {
    $http.get('/api/recipes/' + $routeParams.recipeId).then(response => {
      this.recipe = response.data;
      this.setImage(this.recipe.image);
    });

    // For previous and next recipe operation
    $http.get('/api/recipes/').then(response => {

      let currentRecipeIndexId = response.data.findIndex((element) => {
        return element._id === $routeParams.recipeId;
      });

      // if current recipe id is 0, prevRecipe needs to be array.length - 1
      // if current recipe id is array.length - 1, nextrecipe needs to be index 0
      let recipeArrayLength = response.data.length;

      if (currentRecipeIndexId === 0) {
        this.prevRecipe = response.data[recipeArrayLength - 1]._id;
      } else {
        this.prevRecipe = response.data[currentRecipeIndexId - 1]._id;
      }

      if (currentRecipeIndexId === recipeArrayLength - 1) {
        this.nextRecipe = response.data[0]._id;
      } else {
        this.nextRecipe = response.data[currentRecipeIndexId + 1]._id;
      }
    });

    this.setImage = imageUrl => (this.mainImageUrl = imageUrl);
    this.back = () => window.history.back();
    this.editorEnabled = false;
    this.toggleEditor = () => (this.editorEnabled = !this.editorEnabled);
    this.saveRecipe = (recipe, recipeid) => {
      $http.put('/api/recipes/' + recipeid, recipe).then(res => (this.editorEnabled = false));
    };
  }
});

app.component('recipeList', {
  templateUrl: '/includes/recipes.html',
  controller: function RecipeAppController($http, $scope) {
    $scope.orderProp = 'date';
    $http.get('/api/recipes').then(res => {
      $scope.recipes = res.data;
      $scope.orderProp = 'date';
    });

    $scope.deleteRecipe = function (index, recipeid) {

      $http.delete('/api/recipes/' + recipeid).then(() => {
        let indexOfrecipeToDelete = $scope.recipes.findIndex((recipe) => {
          return recipe._id === recipeid;
        });
        $scope.recipes.splice(indexOfrecipeToDelete, 1);
      });

    };

    $scope.addRecipe = function (data) {
      $http.post('/api/recipes/', data).then(res => {
        console.log(res.data);
        $scope.recipes.push(res.data);
        $scope.recipe = {};
      });
    };


    let addRecipeHeader = document.querySelector('.addRecipe-header');
    addRecipeHeader.addEventListener('click', scrollToAddRecipe)
    
    function scrollToAddRecipe () {
      console.log(addRecipeHeader.offsetTop);
      let topOfAddRecipeHeader = addRecipeHeader.offsetTop;
      window.scrollTo(0, topOfAddRecipeHeader);
    }
  }
});









// const panels = document.querySelectorAll('.panel');

// function toggleActive() {
//   closePanels();
//   this.classList.toggle('active');
// }

// panels.forEach(panel => panel.addEventListener('click', toggleActive)); 

// function openActive(e) {
//   if (e.propertyName.includes('flex')) {
// this.classList.toggle('open-active');
//   }
// }

// panels.forEach(panel => panel.addEventListener('transitionend', openActive));

// function closePanels() {
//   panels.forEach(panel => panel.classList.remove('active'));
// }