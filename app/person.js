Person = function(dom){
    this.cont = true;
    this.busy = false;
    this.dom = document.querySelector(dom);
};

Person.prototype = {
    get: function() {
        if(this.busy || !this.cont) { return; }
        this.before();

        var xhr = new XMLHttpRequest();
        var self = this;

        xhr.onreadystatechange = function() {

            if(xhr.readyState==4) {

                if(xhr.status==200) {
                    var data = JSON.parse(xhr.responseText);

                    self.append(data.persons);

                    if(data.cont==false) {
                        self.cont = false;
                    }
                }
                self.after();
            }
        };

        xhr.open("GET","persons/",true);
        xhr.send();
    },

    append: function(persons) {
        for(var i=0; persons.length; i++) {
            var div = document.createElement("div");
            div.setAttribute('data', "")
            div.innerHTML = person[i].name;
            this.dom.attachChild(div);
        }
    },

    before: function() {
        this.busy = true;
    },

    after: function() {
        this.busy = false;
    }

};
