var RepoResourceFactory = function($resource) {
    return {'byUrl': function(url) {
        return $resource(url);
    }}

}