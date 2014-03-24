"use strict";

(function() {
    // Usage Async.get(url,successFn,errorFn)
    function Async(successFn, errorFn) {
        this.xhr = new XMLHttpRequest;
        this.successFn = successFn;
        this.errorFn = errorFn;
    }

    Async.get = function(url, successFn, errorFn) {
        (new Async(successFn, errorFn)).get(url);
    };

    Async.prototype.get = function(url) {
        var async = this;

        this.timer = setTimeout(async._ontimeout, 3000);
        this.xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                this.status == 200 ? async.successFn(this.data) : async.errorFn("Cannot retrieve data from server.")
                clearTimeout(async.timer);
            }
        };
        this.xhr.open("GET", url, true);
        this.xhr.send();
    };

    Async.prototype._ontimeout = function() {
        var async = this;
        clearTimeout(async.timer);
        this.xhr.abort();
        this.errorFn("Request timed out.");
    };

    window.Async = Async;
})();
