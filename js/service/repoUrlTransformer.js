var RepoUrlTransformerFactory = function() {
    return new function() {

        var justIdPattern = /^[^\/]+\/[^\/]+$/i;

        this.parseId = function(url) {

            if (!url) {
                return;
            }

            if (url.search(justIdPattern) === 0) {
                return url;
            }

            matches = url.match(/(.*github.com\/(repos\/){0,1}){1}([^\/]+\/[^\/]+)/);

            if (matches != null) {
                id = matches[3];
                return id.substr(-4) === '.git' ? id.slice(0, id.length - 4) : id;
            }

            return null;
        }
    }
}