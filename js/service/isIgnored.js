var isIgnoredFactory = function() {
    return function(msg) {
        if (!msg) {
            return false;
        }

        var tags = ['gcignore', 'gc.ignore', 'gsignore', 'gs.ignore'];
        for (var i = 0; i < tags.length; i++) {
            if (msg.indexOf('#' + tags[i]) != -1) {
                return true;
            }
        }

        return false;
    }
}