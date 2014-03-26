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
            Async.get(list.url + '?page=' + list.currentPage, list._successFn, list._errorFn, list);
        }
    };

    LongList.prototype._successFn = function(xhr) {
        var data = JSON.parse(xhr.responseText);

        this._append(data.persons);
        this.currentPage += 1;
        if (data.cont === false) this.cont = false;
        this.busy = false;
    };

    LongList.prototype._errorFn = function(xhr) {
        var msg = xhr.status ? "Cannot retrieve data from server." : "Request timed out.";
        this._promptErrors(msg);
        this.busy = false;
    };

    // Below methods can be extracted to an independent module or class.
    LongList.prototype._append = function(persons) {
        var div,
            container = document.createDocumentFragment();

        for(var i=0; i<persons.length; i++) {
            div = document.createElement("div");
            div.className = "person";
            div.setAttribute('data-id', persons[i].id);
            div.innerHTML = persons[i].name;
            container.appendChild(div);
        }

        // perform only one DOM insertion
        this.dom.appendChild(container);
    };

    LongList.prototype._promptErrors = function() {};

    window.LongList = LongList;
})();
