var PatchProcessorFactory = function() {
    return new function() {
        this.toHtml = function(patchCode) {

            var code = "";

            angular.forEach(
                patchCode.split("\n"),
                function(v, k){
                    code += "<code";
                    if (v.indexOf("+") == 0) code += " class=\"add\"";
                    if (v.indexOf("-") == 0) code += " class=\"rm\"";
                    code += ">" + v + "</code>\n";

                });
            return '<pre>\n' + code + '</pre>';
        }
    }
}