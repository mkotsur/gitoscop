var RepoResourceFactory = function($resource) {
    return {
        'byUrl': function(url) {
            return $resource(url);
        },
        'commitsByUrl': function(url) {
            return $resource(url + "/commits/");
        }
    }

}