describe("Repository linking case of app", function() {

    var button;

    beforeEach(function() {
        button = element('input[value="Use repository"]', "Repo linkage controler");
    });


    it("should open the page, enter repo url and download repo information", function() {
        browser().navigateTo("/#!/slideshow?url=https://github.com/e2e/test");
        expect(button.attr('disabled')).toBeFalsy();

        expect(binding('repo.id')).toEqual('e2e/test');

        expect(repeater(".commits li", "List of commits").count()).toEqual(2);

        expect(using('.commits', "List of commits").element(".commit-sha:first").text()).toContain("15c1fe3929");
    });

    it("should be able to recognize /index.html url", function() {
        browser().navigateTo("/index.html#!/slideshow?url=https://github.com/e2e/test");

        expect(button.attr('disabled')).toBeFalsy();
        expect(binding('repo.id')).toEqual('e2e/test');
    })

});