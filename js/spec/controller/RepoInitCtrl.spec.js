describe("Repo linkage controller test", function() {

    var testScope;
    var RepoStub, CommitsStub;

    beforeEach(function() {
        module("MainModule", function($provide) {
            RepoStub = {get: function() {return 'test'}};
            CommitsStub = {query: function() {return ['test']}};

            spyOn(RepoStub, 'get').andCallThrough();
            spyOn(CommitsStub, 'query').andCallThrough();


            $provide.value('Commits', CommitsStub);
            $provide.value('Repo', RepoStub);
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

        testScope.$apply(function() {
            testScope.getRepoData();
        });

        expect(testScope.repo.id).toBeDefined();
        expect(testScope.repo.data).toBeDefined();
        expect(RepoStub.get).toHaveBeenCalled();
    }));

    it('should request commits as soon is repo data retrieved', inject(function($controller) {
        testScope.repo.data = {'url': "http://api.example.com"};
        testScope.$apply(function() {
            $controller(RepoInitCtrl, {$scope: testScope});
        });
        expect(CommitsStub.query).toHaveBeenCalled();
    }));
});