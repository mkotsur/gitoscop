describe("Repo URL transformer test", function() {

    var repoUrlTransformer;
    var repoUrlInApiForm = "https://api.github.com/repos/mkotsur/angular.js";
    var repoUrlInHttpsForm = "https://github.com/mkotsur/angular.js";
    var repoUrlInGitForm = "https://github.com/mkotsur/angular.js.git";

    beforeEach(function() {
        module("MainModule");

        inject(function($injector) {
            repoUrlTransformer = $injector.get("repoUrlTransformer");
        })
    });

    it ("should run the test", function() {
        expect(true).toBeTruthy();
    });

    it("should inject repo url transformer", function() {
        expect(repoUrlTransformer).toBeDefined();
    });

    it("should leave api URL unchanged", function() {
        expect(repoUrlTransformer.toRepoApiResource(repoUrlInApiForm))
            .toEqual(repoUrlInApiForm);
    });

    it("should transform https URL to API url", function() {
        expect(repoUrlTransformer.toRepoApiResource(repoUrlInHttpsForm))
            .toEqual(repoUrlInApiForm);
    });

    it("should transform https URL to API url", function() {
        expect(repoUrlTransformer.toRepoApiResource(repoUrlInGitForm))
            .toEqual(repoUrlInApiForm);
    });

    it("should work if URL is undefinde", function() {
        expect(repoUrlTransformer.toRepoApiResource())
                    .toBeUndefined();
    })


})