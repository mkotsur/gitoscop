function RepoInitCtrl($scope, $location, repoUrlTransformer, repoResource) {

    $scope.repo.url = $location.search().url;

    $scope.$watch('repo.url', function() {
        $scope.repo.apiUrl = repoUrlTransformer.toRepoApiResource($scope.repo.url);
        if ($scope.repo.apiUrl && $scope.repo.apiUrl != "") {
            $scope.getRepoData();
        }
    });

    $scope.$watch('repo.data.url', function() {
        if ($scope.repo.data && $scope.repo.data.url) {
            $scope.repo.commits = repoResource.commitsByUrl($scope.repo.data.url).query();
        }
    });

    $scope.getRepoData = function() {
        $scope.repo.data = repoResource.byUrl($scope.repo.apiUrl).get();
    };

    $scope.redirectToMainPage = function () {
        $location.path('/slideshow').search('url', $scope.repo.url).replace();
    };
}