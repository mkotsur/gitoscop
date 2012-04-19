describe("Repo URL transformer test", function() {

    var repoUrlTransformer;
    var repoId = 'mkotsur/angular.js';
    var repoUrlInApiForm = "https://api.github.com/repos/mkotsur/angular.js";
    var repoUrlInHttpsForm = "https://github.com/mkotsur/angular.js";
    var repoUrlInGitForm = "https://github.com/mkotsur/angular.js.git";

    beforeEach(function() {
        module("MainModule");

        inject(function($injector) {
            repoUrlTransformer = $injector.get("repoUrlTransformer");
        })
    });

    it ('should leave repo id unchanged', function() {
        expect(repoUrlTransformer.parseId(repoId))
                    .toEqual(repoId);
    });

    it("should handle api URL", function() {
        expect(repoUrlTransformer.parseId(repoUrlInApiForm))
            .toEqual(repoId);
    });

    it("should handle https:// URL", function() {
        expect(repoUrlTransformer.parseId(repoUrlInHttpsForm))
            .toEqual(repoId);
    });

    it("should handle git:// URL", function() {
        expect(repoUrlTransformer.parseId(repoUrlInGitForm))
            .toEqual(repoId);
    });

    it("should work if URL is undefined", function() {
        expect(repoUrlTransformer.parseId()).toBeUndefined();
    })


})