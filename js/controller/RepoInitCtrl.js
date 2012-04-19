function RepoInitCtrl($scope, $location, repoUrlTransformer, Commits, Repo) {

    $scope.repo.url = $location.search().url;

    $scope.$watch('repo.url', function() {
        $scope.repo.id = repoUrlTransformer.parseId($scope.repo.url);
        if ($scope.repo.id) {
            var repoArray = $scope.repo.id.split("/");
            $scope.repo.user = repoArray[0];
            $scope.repo.project = repoArray[1];
        }
    });

    $scope.$watch('repo.id', function() {
        if ($scope.repo.user && $scope.repo.project) {
            $scope.getRepoData();
        }
    });

    $scope.$watch('repo.data.url', function() {
        if ($scope.repo.data && $scope.repo.data.url) {
            $scope.repo.commits = Commits.query({
                'user': $scope.repo.user,
                'project': $scope.repo.project
            });
        }
    });

    $scope.getRepoData = function() {
        $scope.repo.data = Repo.get({
            'user': $scope.repo.user,
            'project': $scope.repo.project
        });
    };

    $scope.redirectToMainPage = function () {
        $location.path('/slideshow').search('url', $scope.repo.url).replace();
    };
}