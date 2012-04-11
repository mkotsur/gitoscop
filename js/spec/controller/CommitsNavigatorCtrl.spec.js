describe("Commits navigation controller test", function() {

    var testScope;

    var twoCommitsMock = [{'sha': 'first-commit-hash'}, {'sha': 'second-commit-hash'}];
    var threeCommitsMock = [{'sha': 'first-commit-hash'}, {'sha': 'second-commit-hash'}, {'sha': 'third-commit-hash'}];
    var fourCommitsMock = [{'sha': 'first-commit-hash'}, {'sha': 'second-commit-hash'}, {'sha': 'third-commit-hash'}, {'sha': 'fourth-commit-hash'}];

    beforeEach(function() {
        inject(function($rootScope) {
            $rootScope.repo = {};
            $rootScope.slideshow = {};
            testScope = $rootScope.$new();
        });
    });

    it("Should not have next and previous references when pointer is empty", inject(function($controller) {
        $controller(CommitsNavigatorCtrl, {$scope: testScope});

        expect(testScope.previousRevision).toBeNull();
        expect(testScope.nextRevision).toBeNull();

        testScope.$digest();

        expect(testScope.previousRevision).toBeNull();
        expect(testScope.nextRevision).toBeNull();
    }));


    it("should have only next reference when pointer points to first commit", inject(function($controller) {

        $controller(CommitsNavigatorCtrl, {$scope: testScope});

        testScope.slideshow.pointer = 'first-commit-hash';
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

});