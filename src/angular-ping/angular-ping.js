// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt
// Config
// Modules
angular.module('angular.ping', []).factory('netTesting', ['$window', '$timeout', function($window, $timeout) {
    var connection = {};

    function ping() {
        var params = Array.prototype.slice.apply(arguments), domain = params[0], callback = params[1], that = this, currentItem;

        if(angular.isUndefined(connection[domain])) {
            connection[domain] = {
                "processing": true
            };
        }
        currentItem = connection[domain];
        if(typeof domain == "string") {
            currentItem.callback = callback;
        } else {
            throw new Error('please input a validate ip or domain name;');
        }

        var img = currentItem.img = new Image();

        img.onload = function() {
            currentItem.processing = false;
            callback.call(that, domain, 'connected');
        };
        img.onerror = function() {
            if(currentItem.processing) {
                currentItem.processing = false;
                callback.call(that, domain, 'connected');
            }
        };
        img.src = "http://" + domain + "?" + new Date().getTime();

        $timeout(function() {
            if(currentItem.processing) {
                currentItem.processing = false;
                callback.call(that, domain, "disconnected");
            }
        }, 500);
    }
    return {
        "ping": ping
    };
}]);