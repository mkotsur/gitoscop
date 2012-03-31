
angular.module('MainModule', ['ngResource'])
    .factory('repoUrlTransformer', RepoUrlTransformerFactory)
    .factory('repoResource', ["$resource", RepoResourceFactory]);