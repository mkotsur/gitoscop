function CommitsNavigatorCtrl($scope, shortcutBinder, isIgnored) {

    $scope.nextRevision = null;
    $scope.previousRevision = null;

    $scope.$watch('repo.commits.length > 1', function() {
        if (!$scope.repo.commits || $scope.repo.commits.length == 0) {
            return
        }

        for (i = 0; i < $scope.repo.commits.length; i++) {
            v = $scope.repo.commits[i];
            if (!isIgnored(v.commit.message)) {
                $scope.slideshow.pointer = v.sha;
                break;
            }
        }
    });

    var prevPressedAction = function() {
        $scope.$apply(function() {
            $scope.goNext();
        });
    };

    var nextPressedAction = function() {
        $scope.$apply(function() {
            $scope.goPrevious();
        });
    };

    shortcutBinder.add("Alt+Right", nextPressedAction);
    shortcutBinder.add("Alt+Up", nextPressedAction);
    shortcutBinder.add("Alt+Left", prevPressedAction);
    shortcutBinder.add("Alt+Down", prevPressedAction);


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
        for (i = getCurrentCommitIndex() + 1; i < $scope.repo.commits.length; i++) {
            if (!isIgnored($scope.repo.commits[i].commit.message)) {
                $scope.slideshow.pointer = $scope.repo.commits[i].sha;
                break;
            }
        }

        return $scope;
    };

    $scope.goPrevious = function() {
        for (i = getCurrentCommitIndex() - 1; i >= 0; i--) {
            if (!isIgnored($scope.repo.commits[i].commit.message)) {
                $scope.slideshow.pointer = $scope.repo.commits[i].sha;
                break;
            }
        }

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
    };

}