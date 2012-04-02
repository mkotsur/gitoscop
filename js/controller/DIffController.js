function DiffController($scope, $element, $sanitize, repoResource, patchProcessor) {
    $scope.$watch('slideshow.pointer', function() {
        if ($scope.slideshow.pointer) {
            $scope.slideshow.commit = repoResource.commitByUrl($scope.slideshow.pointer).get();
        }
    });
}