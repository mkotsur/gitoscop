function RepoLinkageController($scope, repoUrlTransformer, repoResource) {
    $scope.repo = {};

    $scope.$watch('repo.url', function() {
        $scope.repo.apiUrl = repoUrlTransformer.toRepoApiResource($scope.repo.url);
    })

    $scope.getRepoData = function() {
        $scope.repo.data = repoResource.byUrl($scope.repo.apiUrl).get();
    }
}