function CommitsNavigatorCtrl($scope) {

    $scope.nextRevision = null;
    $scope.previousRevision = null;

    $scope.$watch('slideshow.pointer', function() {
        if (!$scope.slideshow.pointer || !$scope.repo.commits) {
            return;
        }

        var commitIndex = getCurrentCommitIndex();
        if(commitIndex != 0) {
            $scope.previousRevision = $scope.repo.commits[commitIndex - 1].sha;
        } else {
            $scope.previousRevision = null;
        }

        if (commitIndex < $scope.repo.commits.length - 1) {
            $scope.nextRevision = $scope.repo.commits[commitIndex + 1].sha;
        } else {
            $scope.nextRevision = null;
        }


    });

    $scope.goNext = function() {
        $scope.slideshow.pointer = $scope.repo.commits[getCurrentCommitIndex() + 1].sha;
        return $scope;
    };

    $scope.goPrevious = function() {
        $scope.slideshow.pointer = $scope.repo.commits[getCurrentCommitIndex() - 1].sha;
        return $scope;
    };

    var getCurrentCommitIndex = function() {
        var commitIndex;
        angular.forEach($scope.repo.commits, function(commit, i){
            if(commit.sha == $scope.slideshow.pointer) {
                commitIndex = i;
            }
        });
        return commitIndex;
    }
}