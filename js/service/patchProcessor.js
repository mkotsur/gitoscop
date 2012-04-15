var PatchProcessorFactory = function() { return function(diff) {

    if (!diff) {
      return;
    }
    var code = "";

    angular.forEach(
        diff.split("\n"),
        function(v, k){
            code += "<code";
            if (v.indexOf("+") == 0) code += " class=\"add\"";
            if (v.indexOf("-") == 0) code += " class=\"rm\"";
            code += ">" + angular.element("<div/>").text(v).html() + "</code>\n";

        });
    return '<pre>\n' + code + '</pre>';
}};

PatchProcessorFactory.$inject = [];
