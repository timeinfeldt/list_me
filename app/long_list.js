"use strict";

(function() {
    // Usage (new LongList(url, dom)).get();
    function LongList(url, domSelector) {
        this.url = url;
        this.cont = true;
        this.busy = false;
        this.currentPage = 1;
        this.dom = document.querySelector(domSelector);
    }

    LongList.prototype.get = function() {
        var list = this;
        if (!this.busy && this.cont) {
            this.busy = true;
            Async.get(list.url + '?page=' + list.currentPage, list._successFn, list._errorFn);
        }
    };

    LongList.prototype._successFn = function(xhr) {
        var data = JSON.parse(this.xhr.responseText);

        this._append(data.persons);
        this.currentPage += 1;
        if (data.cont === false) this.cont = false;
        this.busy = false;
    };

    LongList.prototype._append = function() {};

    LongList.prototype._errorFn = function() {};

    window.LongList = LongList;
})();
