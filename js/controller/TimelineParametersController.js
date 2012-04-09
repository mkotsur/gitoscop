function TimelineParametersController($scope, repoUrlTransformer, repoResource) {

    $scope.$watch('repo.data.url', function() {
        if ($scope.repo.data && $scope.repo.data.url) {
            $scope.repo.commits = repoResource.commitsByUrl($scope.repo.data.url).query();
        }
    })

    $scope.$watch('repo.commits.length > 1', function() {
        if ($scope.repo.commits && $scope.repo.commits.length > 0) {
            $scope.slideshow.pointer = $scope.repo.commits[0].url;
        }
    })

}
