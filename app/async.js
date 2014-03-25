"use strict";

(function() {
    // Usage Async.get(url,successFn,errorFn,contex)
    function Async(successFn, errorFn, context) {
        this.xhr = new XMLHttpRequest;
        this.successFn = successFn;
        this.errorFn = errorFn;
        this.context = context;
    }

    Async.get = function(url, successFn, errorFn, context) {
        (new Async(successFn, errorFn, context)).get(url);
    };

    Async.prototype.get = function(url) {
        var async = this;

        this.timer = setTimeout(async._ontimeout, 3000);
        this.xhr.onreadystatechange = function() {
            var xhr = this;

            if (this.readyState == 4) {
                this.status == 200 ? async.successFn.call(async.context, xhr) :
                    async.errorFn.call(async.context, xhr)
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
        this.errorFn(async.xhr);
    };

    window.Async = Async;
})();
