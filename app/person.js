Person = function(){
    this.cont = true;
    this.busy = false;
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
        //for(person in persons) {
        //    dom.append(person);
        //}
    },

    before: function() {
        this.busy = true;
    },

    after: function() {
        this.busy = false;
    }

};
