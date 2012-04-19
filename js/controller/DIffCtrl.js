function DiffCtrl($scope, $resource, Commit) {

    $scope.$watch('slideshow.pointer', function() {
        if ($scope.slideshow.pointer) {
            $scope.slideshow.commit = Commit.get({
                    'user': $scope.repo.user,
                    'project': $scope.repo.project,
                    'commit': $scope.slideshow.pointer
            });
        }
    });

}