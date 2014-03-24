"use strict";

(function() {
    // Usage Async.get(url,successFn,errorFn)
    function Async() {
        this.xhr = new XMLHttpRequest;
    }

    Async.get = function(url, successFn, errorFn) {
        (new Async).get(url, successFn, errorFn);
    };

    Async.prototype.get = function(url, successFn, errorFn) {
        var async = this;

        this.timer = setTimeout(function() {
            clearTimeout(async.timer);
            async.xhr.abort();
            errorFn("Request timed out.");
        }, 3000);
        this.xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                this.status == 200 ? successFn(this.data) : errorFn("Cannot retrieve data from server.")
                clearTimeout(async.timer);
            }
        };
        this.xhr.open("GET", url, true);
        this.xhr.send();
    };

    window.Async = Async;
})();
