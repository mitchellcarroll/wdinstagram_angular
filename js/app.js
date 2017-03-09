let data = [
  {
    author: "Mike",
    body: "New pup",
    photo_url:"https://www.pexels.com/photo/black-and-brown-short-haired-puppy-in-cup-39317/"
  },
  {
    author: "Katie",
    body: "Long day",
    photo_url: "https://www.pexels.com/photo/tan-pug-covered-with-brown-blanket-37029/"
  },
  {
    author:"Tom",
    body: "Feed me",
    photo_url: "https://www.pexels.com/photo/black-flat-coated-retriever-89775/"
  },
]

angular
.module("wdinstagramApp", [
  "ui.router",
  "ngResource"
])
.config(["$stateProvider",
RouterFunction
])
.factory("EntryFactory", [
  "$resource",
  EntryFactoryFunction
])
.controller("EntryIndexController", [
  "EntryFactory",
  EntryIndexControllerFunction
])
.controller("EntryNewController", [
  "EntryFactory",
  "$state",
  EntryNewControllerFunction
])
.controller("EntryShowController",[
  "EntryFactory",
  "$stateParams",
  EntryShowControllerFunction
])
.controller("EntryEditController",[
  "EntryFactory",
  "$stateParams",
  "$state"
  EntryEditControllerFunction
])

funciton RouterFunction($stateProvider)
$stateProvider
.state("entryIndex", {
  url: "/entries",
  templateUrl: "js/ng-views/index.html",
  controller: "EntryIndexController",
  controllerAs: "vm"
})
.state("entryNew",{
  url: "/entries/new",
  templateUrl: "js/ng-views/new.html",
  controller: "EntryNewController",
  controller: "vm"
})
.state("entryShow",{
  url: "/entries/:id",
  templateUrl: "js/ng-views/show.html",
  controller: "EntryShowController",
  controllerAs: "vm"
})
.state("entryEdit",{
  url: "entries/edit",
  templateUrl: "js/ng-views/edit.html",
  controller: "EntryEditController",
  controllerAs: "vm"
})

function EntryFactoryFunction($resource) {
  return $resource("http://localhost:3000/entries/:id")
}

function EntryIndexControllerFunction(EntryFactory){
  this.entries = EntryFactory.query()
}

function EntryNewControllerFunction(EntryFactory, $state) {
  this.entry = new EntryFactory()
  this.create = function() {
    this.entry.$save(function(entry) {
      $state.go("entryShow", {id: entry.id})
    })
  }
}

function EntryShowControllerFunction(EntryFactory, $stateParams) {
  this.entry = EntryFactory.get({id: $stateParams.id})
}

function EntryEditControllerFunction(EntryFactory, $stateParams, $state) {
  this.entry = EntryFactory.get({id: $stateParams.id})
  this.update = function() {
    this.entry.$update({id: $stateParams.id}), function(entry) {
      $state.go("entryShow", {id: entry.id})
    }
  }
}
