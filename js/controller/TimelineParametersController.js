function TimelineParametersController($scope, repoUrlTransformer, repoResource) {

    $scope.$watch('repo.data.url', function() {
        if ($scope.repo.data && $scope.repo.data.url) {
            $scope.repo.commits = repoResource.commitsByUrl($scope.repo.data.url).query();
        }
    })
}