describe("Repo linkage controller test", function() {

    var testScope, $$provide;
    var repoResourceMock;

    beforeEach(function() {
        module("MainModule", function($provide) {
            repoResourceMock = {};
            $provide.value('repoResource', repoResourceMock);
        });

        inject(function($rootScope) {
            testScope = $rootScope.$new();
        });

    });

    it('should inject test scope', inject(function($controller) {

        repoResourceMock.byUrl = function() {return{'get': function() {return "test"}}};

        $controller(RepoLinkageController, {$scope: testScope});

        testScope.repo.url = "http://google.com";

        expect(testScope.repo.apiUrl).toBeUndefined();
        testScope.getRepoData();

        expect(testScope.repo.apiUrl).toBeDefined();
    }));
});