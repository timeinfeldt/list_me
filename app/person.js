"use strict";

// Usage (new Person(dom)).get();
var xhr

function Person(dom) {
    this.cont = true;
    this.busy = false;
    this.currentPage = 1;
    this.dom = document.querySelector(dom);
};

Person.prototype = {
    get:
        if(this.busy || !this.cont) { return; }
        this._beforeHooks();
        xhr.open("GET","persons/?page=" + this.currentPage ,true);
   },

    _handleSuccess: function() {
        var data = JSON.parse(xhr.responseText);

        this._append(data.persons);
        this.currentPage += 1;

        if(data.cont==false) {
            this.cont = false;
        }
        this._afterHooks();
    },

    _handleErrors: function() {
        if (this.tries < 2) {
            xhr.send();
            this.tries++;
        } else {
            this._promptErrors("Cannot retreive data.");
            this._afterHooks();
        }
    },

    _append: function(persons) {
        var div;

        for(var i=0; i<persons.length; i++) {
            div = document.createElement("div");
            div.className = "person";
            div.setAttribute('data-id', persons[i].id);
            div.innerHTML = persons[i].name;
            this.dom.appendChild(div);
        }
    },

    _promptErrors: function() {},

    _handleTimeout: function() {
        xhr.abort();
        this._afterHooks();
    },

    _beforeHooks: function() {
        this.busy = true;
        this.timer = setTimeout(this._handleTimeout, 3000);
    },

    _afterHooks: function() {
        this.busy = false;
        this.tries = 0;
        clearTimeout(this.timer);
    }

};
