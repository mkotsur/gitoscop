describe("Patch processor test", function() {

    var patchProcessor;

    beforeEach(function() {
        module("MainModule");

        inject(function($injector) {
            patchProcessor = $injector.get("patchProcessor");
        });

        this.addMatchers({
            toStartWith: function(expected) {
                return this.actual.indexOf(expected) == 0;
            },
            toEndWith: function(expected) {
                return this.actual.substr(-1 * expected.length) == expected;
            }
        });

    });

    it("should wrap code into pre tag", function() {
        var html = patchProcessor('somePatch');
        expect(html).toStartWith("<pre>\n")
        expect(html).toEndWith("\n</pre>")
    });

    it("should wrap into code tags each line", function() {
        var html = patchProcessor("@@ -1,4 +1,4 @@\n # AngularJS build config file\n ---\n-version: 1.0.0rc3-snapshot\n+version: 1.0.0rc3\n codename: barefoot-telepathy");
        angular.forEach(html.split("\n"), function(v, k) {
            if (v == '<pre>' || v == "</pre>") {
                return;
            }
            expect(v).toStartWith("<code");
            expect(v).toEndWith("</code>");
        });
    });

    it("should mark + and - lines with different classes", function() {
        expect(patchProcessor("- asfasfdafg")).toContain("class=\"rm\"")
        expect(patchProcessor("+ asfasfdafg")).toContain("class=\"add\"")
    });

    it("should escape html in patch", function() {
        expect(patchProcessor("<h1>asd</h1>")).toContain("&lt;h1&gt;asd&lt;/h1&gt;");
        expect(patchProcessor("<h1>asd</h1>")).not.toContain("<h1>");
        expect(patchProcessor("<h1>asd</h1>")).not.toContain("</h1>");
    })

});