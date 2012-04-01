describe("Repo linkage controller test", function() {

    var testScope;
    var repoResourceMock;

    beforeEach(function() {
        module("MainModule", function($provide) {
            repoResourceMock = {};
            $provide.value('repoResource', repoResourceMock);
        });

        inject(function($rootScope) {
            $rootScope.repo = {};
            testScope = $rootScope.$new();
        });

    });

    it('should inject test scope', inject(function($controller) {

        repoResourceMock.byUrl = function() {return{'get': function() {return "test"}}};

        $controller(RepoLinkageController, {$scope: testScope});

        testScope.repo.url = "http://google.com";

        expect(testScope.repo.apiUrl).toBeUndefined();
        testScope.getRepoData();

        testScope.$digest();

        expect(testScope.repo.apiUrl).toBeDefined();
    }));
});