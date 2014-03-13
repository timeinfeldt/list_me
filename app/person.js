var xhr

Person = function(dom){
    this.cont = true;
    this.busy = false;
    this.tries = 0;
    this.currentPage = 1;
    this.dom = document.querySelector(dom);
};

Person.prototype = {
    get: function() {
        var self = this;
        xhr =  new XMLHttpRequest();

        if(this.busy || !this.cont) { return; }
        this._beforeHooks();
        xhr.onreadystatechange = function() {
            if(this.readyState==4) {

                if(this.status==200) {
                    self._handleSuccess(this);
                } else {
                    self._handleErrors();
                }
            }
        };

        xhr.open("GET","persons/?page=" + this.currentPage ,true);
        xhr.send();
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
