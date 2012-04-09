describe("Repo linkage controller test", function() {

    var testScope;
    var repoResourceMock;

    beforeEach(function() {
        module("MainModule", function($provide) {
            repoResourceMock = {
                'byUrl': function() {return{'get': function() {return "test"}}},
                'commitsByUrl': function() {return{'query': function() {return ["test"]}}}
            };

            spyOn(repoResourceMock, 'byUrl').andCallThrough();
            spyOn(repoResourceMock, 'commitsByUrl').andCallThrough();

            $provide.value('repoResource', repoResourceMock);
        });

        inject(function($rootScope) {
            $rootScope.repo = {};
            testScope = $rootScope.$new();
        });

    });

    it('should inject test scope', inject(function($controller) {

        $controller(RepoInitCtrl, {$scope: testScope});
        testScope.repo.url = "http://google.com";

        expect(testScope.repo.apiUrl).toBeUndefined();
        testScope.getRepoData();
        testScope.$digest();

        expect(testScope.repo.apiUrl).toBeDefined();
        expect(testScope.repo.data).toBeDefined();
        expect(repoResourceMock.byUrl).toHaveBeenCalled();
    }));

    it('should request commits as soon is repo data retrieved', inject(function($controller) {
        testScope.repo.data = {'url': "http://api.example.com"};
        $controller(RepoInitCtrl, {$scope: testScope, repoResource: repoResourceMock});
        testScope.$digest();

        expect(repoResourceMock.commitsByUrl).toHaveBeenCalled();

    }));
});