function DiffCtrl($scope, $element, $sanitize, repoResource, patchProcessor) {


    $scope.$watch('slideshow.pointer', function() {
        if ($scope.slideshow.pointer) {
            $scope.slideshow.commit = repoResource.commitByUrl(
                $scope.repo.apiUrl + "/commits/" + $scope.slideshow.pointer
            ).get();
        }
    });

    $scope.escape = function(name) {
      return name.replace(/[\/\.\s]/g, "_")
    }
}