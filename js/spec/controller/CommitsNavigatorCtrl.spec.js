describe("Commits navigation controller test", function() {

    var testScope;

    var twoCommitsMock = [
        {'sha': 'first-commit-hash', commit: {}},
        {'sha': 'second-commit-hash', commit: {}}
    ];

    var fourCommitsWithIgnoredMock = [
        {'sha': 'first-commit-hash', commit: {message: "Ololo #gcignore"}},
        {'sha': 'second-commit-hash', commit: {message: "I pass"}},
        {'sha': 'third-commit-hash', commit: {message: "I do not pass #gcignore"}},
        {'sha': 'fourth-commit-hash', commit: {message: "I pass again"}}
    ];

    var fourCommitsMock = [
        {'sha': 'first-commit-hash', commit: {}},
        {'sha': 'second-commit-hash', commit: {}},
        {'sha': 'third-commit-hash', commit: {}},
        {'sha': 'fourth-commit-hash', commit: {}}
    ];

    beforeEach(function() {
        module('MainModule');
        inject(function($rootScope) {
            $rootScope.repo = {};
            $rootScope.slideshow = {};
            testScope = $rootScope.$new();
        });
    });

    it("Should not have next and previous references when pointer is empty", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope});
        testScope.$digest();

        expect(testScope.previousRevision).toBeNull();
        expect(testScope.nextRevision).toBeNull();
    }));

    it ("should set slideshow pointer to the first commit", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope});
        testScope.repo.commits = twoCommitsMock;
        testScope.$digest();
        expect(testScope.slideshow.pointer).toBe('first-commit-hash');
    }));


    it("should have only next reference when pointer points to first commit", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope});
        testScope.repo.commits = twoCommitsMock;
        testScope.$digest();

        expect(testScope.previousRevision).toBeNull();
        expect(testScope.nextRevision).not.toBeNull();

        testScope.slideshow.pointer = 'second-commit-hash';
        testScope.$digest();
        expect(testScope.previousRevision).not.toBeNull();
        expect(testScope.nextRevision).toBeNull();
    }));

    it("should have only previous reference when pointer points to last commit", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope});
        testScope.repo.commits = twoCommitsMock;
        testScope.$digest();

        testScope.slideshow.pointer = 'second-commit-hash';
        testScope.$digest();

        expect(testScope.previousRevision).not.toBeNull();
        expect(testScope.nextRevision).toBeNull();

        testScope.slideshow.pointer = 'first-commit-hash';
        testScope.$digest();
        expect(testScope.previousRevision).toBeNull();
        expect(testScope.nextRevision).not.toBeNull();
    }));

    it("should update commits when next or previous action called", inject(function($controller) {

        $controller(CommitsNavigatorCtrl, {$scope: testScope});

        testScope.repo.commits = fourCommitsMock;
        testScope.$digest();

        testScope.slideshow.pointer = 'second-commit-hash';
        testScope.$digest();

        expect(testScope.previousRevision).toBe('first-commit-hash');
        expect(testScope.nextRevision).toBe('third-commit-hash');

        testScope.goNext().$digest();

        expect(testScope.slideshow.pointer).toBe('third-commit-hash');
        expect(testScope.previousRevision).toBe('second-commit-hash');
        expect(testScope.nextRevision).toBe('fourth-commit-hash');

        testScope.goPrevious().$digest();

        expect(testScope.slideshow.pointer).toBe('second-commit-hash');
        expect(testScope.previousRevision).toBe('first-commit-hash');
        expect(testScope.nextRevision).toBe('third-commit-hash');


    }));

    it ("should not set slideshow pointer to the commit which is ignored", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope})
        testScope.repo.commits = fourCommitsWithIgnoredMock;
        testScope.$digest();

        expect(testScope.slideshow.pointer).toBe('second-commit-hash');
    }));

    it ("should skip ignored commits when browsing", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope})
        testScope.repo.commits = fourCommitsWithIgnoredMock;
        testScope.$digest();

        testScope.goNext(); // Check going forward
        expect(testScope.slideshow.pointer).toBe('fourth-commit-hash');

        testScope.goPrevious();  // Check going backward
        expect(testScope.slideshow.pointer).toBe('second-commit-hash');

        testScope.goPrevious(); // And again
        expect(testScope.slideshow.pointer).toBe('second-commit-hash');

    }));

    it ("should skip ignored commits when browsing backward", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope})
        testScope.repo.commits = fourCommitsWithIgnoredMock;
        testScope.$digest();
        testScope.goNext();

        expect(testScope.slideshow.pointer).toBe('fourth-commit-hash');
    }));

});