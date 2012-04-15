angular.module('MainModule', ['ngResource', 'ngSanitize'])
    .factory('repoUrlTransformer', RepoUrlTransformerFactory)
    .factory('patchProcessor', PatchProcessorFactory)
    .factory('repoResource', ["$resource", RepoResourceFactory])
    .filter('diffToHtml', PatchProcessorFactory)
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix("!");
//        $locationProvider.html5Mode(true);
        $routeProvider.when('/', {template: './js/templates/index.html', controller:RepoInitCtrl});
        $routeProvider.when('/slideshow', {template: './js/templates/slideshow.html'});
    });



angular.module('MainModuleDev', ['MainModule', 'ngMockE2E']).run(function($httpBackend, $resource) {
    $httpBackend.whenGET(/^\/js\/spec\/mocks.*\//).passThrough();

    var base = 'https://api.github.com/repos/e2e/test';
    $httpBackend.whenGET(base).respond(gitoscop.mock.repo);
    $httpBackend.whenGET(base + '/commits').respond(gitoscop.mock.commits);
    $httpBackend.whenGET(base + '/commits/15c1fe392942b70e456f10afbdfd9c3329249a43').respond(gitoscop.mock.commitsById['15c1fe392942b70e456f10afbdfd9c3329249a43']);
    $httpBackend.whenGET(base + '/commits/428f2b563663315df4f235ca19cef4bdcf82e2ab').respond(gitoscop.mock.commitsById['428f2b563663315df4f235ca19cef4bdcf82e2ab']);
    $httpBackend.whenGET(/.*/).passThrough();
});