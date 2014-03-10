Person = function(){};

// Ajax call should be implemented for any useful web applications.
Person.prototype.json = function(){
    var json = '[{"id":1,"name":"Johan"},{"id":2,"name":"Thomas"},{"id":3,"name":"Hanna"},{"id":4,"name":"Johanna"}]'
    return json;
};

Person.prototype.get = function() {
    return JSON.parse(this.json());
};
