var RepoUrlTransformerFactory = function() {
    return new function() {
        this.toRepoApiResource = function(url) {

            if (!url) {
                return;
            }

            if (url.substr(-4) === '.git') {
                url = url.slice(0, url.length - 4);
            }
            if (url.indexOf("https://github.com/") == 0) {
                return  url.replace("https://github.com/", "https://api.github.com/repos/");
            }

            return url;
        }
    }
}