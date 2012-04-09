function RepoInitCtrl($scope, $location, repoUrlTransformer, repoResource) {

    $scope.repo.url = $location.hash();

    $scope.$watch('repo.url', function() {
        $scope.repo.apiUrl = repoUrlTransformer.toRepoApiResource($scope.repo.url);
    });

    $scope.$watch('repo.data.url', function() {
        if ($scope.repo.data && $scope.repo.data.url) {
            $scope.repo.commits = repoResource.commitsByUrl($scope.repo.data.url).query();
        }
    });

    $scope.getRepoData = function() {
        $scope.repo.data = repoResource.byUrl($scope.repo.apiUrl).get();
    };
}