describe("Case of navigation thru commits", function() {

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
    });

    it("should mark last commit as active when repository is just loaded", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        sleep(0.8)
        expect(usingCommitsList().element("a:visible:first").text()).toEqual("428f2b563663315df4f235ca19cef4bdcf82e2ab");
        expect(usingCommitsList().element("span:visible:first").text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

    it("should display link next commit when first commit is selected", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        expect(visibleNextLink().count()).toBe(1);
        expect(visiblePrevLink().count()).toBe(0);
    });

    it("should display commit id and autor name when switching commits", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        var firstAvailableLink = function() {return element(".commits a:visible")};
        var activeLink = function(){return element(".commits .active:visible")};

        activeBeforeClick = activeLink().text();
        activeAfterClick =  firstAvailableLink().text()

        expect(element('#NavList').text()).toContain(activeLink().text());
        expect(element('#NavList').text()).toContain("Author 1");
        firstAvailableLink().click();

        expect(activeLink().text()).toContain(activeAfterClick);
        expect(activeBeforeClick).not().toContain(activeAfterClick);

        expect(firstAvailableLink().text()).toContain(activeBeforeClick);
        expect(element('#NavList').text()).toContain(activeLink().text());
        expect(element('#NavList').text()).toContain("Author 2");
    });

    it ("should display all files when displaying a slide", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        expect(presentationView.visibleFileTitles().count()).toEqual(2);
        expect(presentationView.visibleFileTitles().text()).toContain("F 1.1");
        expect(presentationView.firstFileTitle().text()).toContain("modified");
    });

    it("should collapse and expand files when clicked on file title", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        expect(presentationView.visibleFiles().count()).toEqual(2);

        presentationView.firstFileTitle().click();
        expect(presentationView.collapsedFiles().count()).toEqual(1);

        presentationView.firstFileTitle().click();
        expect(presentationView.collapsedFiles().count()).toEqual(0);

        presentationView.fileTitles().click();
        expect(presentationView.collapsedFiles().count()).toEqual(2);
    });

    it("should display expanded diff content", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        expect(presentationView.visibleFiles().text()).toContain("bla bla bla");

        presentationView.firstFileTitle().click();
        expect(presentationView.visibleFiles().text()).not().toContain("bla bla bla");
    });


    var presentationView = new function() {

        var filesList = function() {return using("#filesList")};

        this.visibleFileTitles = function() {
            return filesList().element(".accordion-toggle:visible");
        };

        this.firstFileTitle = function() {
            return filesList().element("a.accordion-toggle:first");
        };

        this.fileTitles = function() {
            return filesList().element("a.accordion-toggle");
        }

        this.visibleFiles = function() {
            return filesList().element(".in pre");
        };

        this.collapsedFiles = function() {
            return filesList().element(".accordion-body.collapse");
        };

    }
})