angular.module('MainModule', ['ngResource'])
    .factory('repoUrlTransformer', RepoUrlTransformerFactory)
    .factory('patchProcessor', PatchProcessorFactory)
    .factory('repoResource', ["$resource", RepoResourceFactory])
    .filter('diffToHtml', PatchProcessorFactory)
    .config(function($locationProvider) {
        $locationProvider.hashPrefix("");
        $locationProvider.html5Mode(true);
    });



angular.module('MainModuleDev', ['MainModule', 'ngMockE2E']).run(function($httpBackend, $resource) {
    $httpBackend.whenGET(/^\/js\/spec\/mocks.*\//).passThrough();
    $httpBackend.whenGET('https://api.github.com/repos/e2e/test').respond(
        gitoscop.mock.repo
    );
    $httpBackend.whenGET('https://api.github.com/repos/e2e/test/commits').respond(
        gitoscop.mock.commits
    );
    $httpBackend.whenGET(/.*/).passThrough();
});