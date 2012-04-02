describe("Repository linking case of app", function() {

    var repoLinkageButton;

    beforeEach(function() {
        repoLinkageButton = using(
            'div[ng-controller="RepoLinkageController"]',
            "Repo linkage controler"
        ).element('input[type="button"]');
    });

    it("should open the page", function() {
        browser().navigateTo("/index.html");

        expect(repoLinkageButton.attr('disabled')).toBeTruthy();

        input("repo.url").enter("https://github.com/angular/angular.js");
        expect(binding('repo.url')).toEqual('https://github.com/angular/angular.js');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/angular/angular.js');

        expect(repoLinkageButton.attr('disabled')).toBeFalsy();
    })

    it("should take repo URL from hash", function() {
        browser().navigateTo("#https://api.github.com/repos/mkotsur/angular.js");
        expect(binding('repo.url')).toEqual('https://github.com/angular/angular.js');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/angular/angular.js');

        expect(repoLinkageButton.attr('disabled')).toBeFalsy();
    });
});