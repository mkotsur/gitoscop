describe("Slideshow controller test", function() {

    var testScope;
    var repoResourceMock, elementMock;

    beforeEach(function() {
        module("MainModule", function($provide) {
            repoResourceMock = {};
            $provide.value('repoResource', repoResourceMock);
            $provide.value('$element', elementMock);
        });

        inject(function($rootScope) {
            $rootScope.repo = {};
            testScope = $rootScope.$new();
        });


        elementMock = {'append': jasmine.createSpy('innerHTML stub')};
    });

});