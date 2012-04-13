describe("Case of front page repo input", function() {

    var button;

    beforeEach(function() {
        button = element('input[type="button"]');
    });

    it("should take repo URL from hash", function() {
        browser().navigateTo("/");

        expect(button.attr('disabled')).toBeTruthy();

        input("repo.url").enter("https://github.com/e2e/test");
        expect(button.attr('disabled')).toBeFalsy();

        button.click();

        expect(browser().location().url()).toContain(encodeURIComponent("github.com/e2e/test"))
    });
});