var CommitFactory = function($resource) {
    return $resource('https://api.github.com/repos/:user/:project/commits/:commit');
};

var CommitsFactory = function($resource) {
    return $resource('https://api.github.com/repos/:user/:project/commits');
};

var RepoFactory = function ($resource) {
    return $resource('https://api.github.com/repos/:user/:project');
}