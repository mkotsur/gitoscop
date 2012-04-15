describe("Repository linking case of app", function() {

    var button;

    beforeEach(function() {
        button = element('input[value="Use repository"]', "Repo linkage controler");
    });


    it("should open the page, enter repo url and download repo information", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");

        expect(button.attr('disabled')).toBeFalsy();
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');

        expect(button.attr('disabled')).toBeFalsy();

        expect(repeater(".commits li", "List of commits").count()).toEqual(2);

        expect(using('.commits', "List of commits").element("b.commit-sha:first").text()).toEqual("15c1fe392942b70e456f10afbdfd9c3329249a43");
    });

    it("should be able to recognize /index.html url", function() {
        browser().navigateTo("/index.html#!/slideshow?url=https://github.com/e2e/test");

        expect(button.attr('disabled')).toBeFalsy();
        expect(binding('repo.apiUrl')).toEqual('https://api.github.com/repos/e2e/test');
    })

});