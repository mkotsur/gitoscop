function DiffController($scope, $element, $sanitize, repoResource, patchProcessor) {
    $scope.$watch('slideshow.pointer', function() {
        if ($scope.slideshow.pointer) {
            $scope.slideshow.commit = repoResource.commitByUrl(
                "https://api.github.com/repos/mkotsur/angular.js/commits/" + $scope.slideshow.pointer
            ).get();
        }
    });
}