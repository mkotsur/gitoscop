describe("Case of navigation thru commits", function() {

    beforeEach(function() {});

    it("should mark last commit as active when repository is just loaded", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        sleep(0.8)
        expect(commitsBrowsingView.firstNotChosenRevision().text()).toEqual("428f2b563663315df4f235ca19cef4bdcf82e2ab");
        expect(commitsBrowsingView.chosenRevision().text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

    it("should display link next commit when first commit is selected", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        expect(commitsBrowsingView.nextButton().attr('disabled')).toBeFalsy();
        expect(commitsBrowsingView.previousButton().attr('disabled')).toBeTruthy();
    });

    it("should display commit id and autor name when switching commits", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        var firstAvailableLink = function() {return element(".commits a:visible")};
        var activeLink = function(){return element(".commits .chosen.commit-sha:visible")};

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

    // Use-case-viewpoints

    var presentationView = new function() {

        var base = function() {return using("#filesList")};

        this.visibleFileTitles = function() {
            return base().element(".accordion-toggle:visible");
        };

        this.firstFileTitle = function() {
            return base().element("a.accordion-toggle:first");
        };

        this.fileTitles = function() {
            return base().element("a.accordion-toggle");
        }

        this.visibleFiles = function() {
            return base().element(".in pre");
        };

        this.collapsedFiles = function() {
            return base().element(".accordion-body.collapse");
        };
    }

    var commitsBrowsingView = new function() {
        var base = function() {return using('.commits', "Commits navigation base")};

        this.nextButton = function() {
            return base().element('.btn:contains("Next")');
        };

        this.previousButton = function() {
            return base().element('.btn:contains("Previous")');
        };

        this.firstNotChosenRevision = function() {
            return base().element(".not-chosen.commit-sha:visible:first");
        };

        this.chosenRevision = function() {
            return base().element(".chosen.commit-sha:visible:first");
        }
    }
})