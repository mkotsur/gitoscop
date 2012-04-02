angular.module('MainModule', ['ngResource'])
    .factory('repoUrlTransformer', RepoUrlTransformerFactory)
    .factory('patchProcessor', PatchProcessorFactory)
    .factory('repoResource', ["$resource", RepoResourceFactory])
    .filter('diffToHtml', PatchProcessorFactory)
    .config(function($locationProvider) {
        $locationProvider.hashPrefix("");
        $locationProvider.html5Mode(true);
    });