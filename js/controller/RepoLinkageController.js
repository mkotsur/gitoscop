function RepoLinkageController($scope, $location, repoUrlTransformer, repoResource) {

    $scope.repo.url = $location.search().url;

    $scope.$watch('repo.url', function() {
        $scope.repo.apiUrl = repoUrlTransformer.toRepoApiResource($scope.repo.url);
        if ($scope.repo.apiUrl && $scope.repo.apiUrl != "") {
                $scope.getRepoData();
        }
    })

    $scope.getRepoData = function() {
        $scope.repo.data = repoResource.byUrl($scope.repo.apiUrl).get();
    }

    $scope.redirectToMainPage = function () {
       window.location = "/main.html?url=" + $scope.repo.apiUrl;
    }
}

