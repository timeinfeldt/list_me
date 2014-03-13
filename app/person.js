Person = function(dom){
    this.cont = true;
    this.busy = false;
    this.tries = 0;
    this.currentPage = 1;
    this.dom = document.querySelector(dom);
};

Person.prototype = {
    get: function() {
        if(this.busy || !this.cont) { return; }
        this._beforeHooks();

        var xhr = new XMLHttpRequest();
        var self = this;

        xhr.onreadystatechange = function() {
            if(this.readyState==4) {

                if(this.status==200) {
                    var data = JSON.parse(this.responseText);

                    self._append(data.persons);
                    self.currentPage += 1;

                    if(data.cont==false) {
                        self.cont = false;
                    }
                    self._afterHooks();
                } else {
                    self._handleErrors(this);
                }
            }
        };

        xhr.open("GET","persons/?page=" + this.currentPage ,true);
        xhr.send();
    },

    _handleErrors: function(xhr) {
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

    _beforeHooks: function() {
        this.busy = true;
    },

    _afterHooks: function() {
        this.busy = false;
        this.tries = 0;
    }

};
