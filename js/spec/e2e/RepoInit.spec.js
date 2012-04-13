describe("Repository linking case of app", function() {

    var button;

    beforeEach(function() {
        button = using(
            'div[ng-controller="RepoInitCtrl"]',
            "Repo linkage controler"
        ).element('input[type="button"]');

    });


    it("should open the page, enter repo url and download repo information", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        expect(button.attr('disabled')).toBeFalsy();
        expect(binding('repo.url')).toEqual('https://github.com/e2e/test');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');

        expect(button.attr('disabled')).toBeFalsy();

        expect(repeater(".commits ul", "List of commits").count()).toEqual(2);

        expect(using('.commits ul', "List of commits").element("a:first").text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

    it("should be able to recognize /index.html url", function() {
        browser().navigateTo("/index.html#!/slideshow?url=https://github.com/e2e/test");

        expect(button.attr('disabled')).toBeFalsy();
        expect(binding('repo.url')).toEqual('https://github.com/e2e/test');
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');
    })

});