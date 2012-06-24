describe("Is ignored test", function() {

    var isIgnored;

    beforeEach(function() {
        module("MainModule");

        inject(function($injector) {
            isIgnored = $injector.get("isIgnored");
        });

    });

    it("should handle 4 ignore tags", function() {
        expect(isIgnored('That commit is not to be ignored')).toBeFalsy();
        expect(isIgnored('Uh oh this commit is #gcignore')).toBeTruthy();
        expect(isIgnored('Uh oh this commit is #gc.ignore')).toBeTruthy();
        expect(isIgnored('Uh oh this commit is #gsignore')).toBeTruthy();
        expect(isIgnored('Uh oh this commit is #gs.ignore')).toBeTruthy();
    });

});