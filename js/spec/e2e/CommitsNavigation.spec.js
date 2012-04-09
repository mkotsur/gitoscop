describe("Case of navigation thru commits", function() {

    var repoLinkageButton;
    var usingCommitsList = function() {
        return using('.commits ul', "List of commits");
    }

    var usingCommitsNavigator = function() {
        return using('*[ng-controller=CommitsNavigatorCtrl]');
    }

    var visibleNextLink = function() {
        return usingCommitsNavigator().element('*[ng-show="nextRevision"]:visible');
    };

    var visiblePrevLink = function() {
        return usingCommitsNavigator().element('*[ng-show="previousRevision"]:visible');
    };

    beforeEach(function() {
        repoLinkageButton = using(
            'div[ng-controller="RepoInitCtrl"]',
            "Repo linkage controler"
        ).element('input[type="button"]');
    })

    it("should mark last commit as active when repository is just loaded", function() {
        browser().navigateTo("/index.html#https://api.github.com/repos/e2e/test");
        repoLinkageButton.click();
        expect(usingCommitsList().element("a:visible:first").text()).toEqual("428f2b563663315df4f235ca19cef4bdcf82e2ab");
        expect(usingCommitsList().element("span:visible:first").text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

    it("should display link next commit when first commit is selected", function() {
        browser().navigateTo("/index.html#https://api.github.com/repos/e2e/test");
        repoLinkageButton.click();
        expect(visibleNextLink().count()).toBe(1);
        expect(visiblePrevLink().count()).toBe(0);
    })
})