(function($){

    angular.module('cockpit.fields').run(['Contentfields', function(Contentfields) {

        Contentfields.register('multivalue', {
            label: 'Multi Value',
            template: function(model, options) {
                return '<multivalue options=\''+JSON.stringify(options.options || false)+'\' ng-model="'+model+'"></multivalue>';
            }
        });

    }]);
    
    angular.module('cockpit.fields').directive("multivalue", ['$timeout', function($timeout) {
        return {
            require: 'ngModel',
            restrict: 'E',
            replace: true,
            templateUrl: App.base('/modules/addons/multivalue/assets/tpl/multivalue.html'),
            link: function (scope, elm, attrs, ngModel) {
                var options;
                
                scope.values = [];
                
                $timeout(function(){
                    if (attrs.options){
                        try {
                            options = JSON.parse(attrs.options);
                        } catch(e) {}
                    }
                    var values = ngModel.$viewValue;
                    if (typeof values == "object") {
                        
                        var vals = {};
                        for (val in values) {
                            if (typeof values[val] != "undefined" && typeof values[val] != "undefined") {
                                vals[values[val].name] = values[val].value;
                            }
                        }
                        
                        for (opt in options) {
                            var val = {
                                name: options[opt],
                                value: ""
                            };
                            if (typeof vals[options[opt]] != "undefined") val.value = vals[options[opt]];
                            scope.values.push(val);
                        }
                        
                        ngModel.$setViewValue(scope.values);
                    } else {
                        for (opt in options) {
                            var val = {
                                name: options[opt],
                                value: ""
                            };
                            scope.values.push(val);
                        }
                        ngModel.$setViewValue(scope.values);
                    }
                });
                
                scope.getOptions = function() {
                    return options;
                };
            }
        }        
    }]);

})(jQuery);