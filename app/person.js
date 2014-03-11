Person = function(){
    this.cont = true;
    this.busy = false;
};

Person.prototype = {
    get: function() {
        if(this.busy) { return; }

        this.before();

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {

            if(xhr.readyState==4 && xhr.status==200) {
                var data = JSON.parse(xhr.responseText);

                this.append(data.persons);

                if(persons.cont==false) {
                    this.cont = false;
                }
            }
        };

        xhr.open("GET","persons/",true);
        xhr.send();
    },

    append: function(persons) {
        for(person in persons) {
            dom.append(person);
        }
    },

    before: function() {
        this.busy = true;
    }

};
