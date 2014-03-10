describe("person", function() {
    var person;

    var persons = [
      {id: 1, name: "John"},
      {id: 2, name: "Thomas"},
    ];

    beforeEach(function() {
        person = new Person();
    });

    describe("#get", function(){
        beforeEach(function() {
            person.json = function(){
                return '[{"id":1,"name":"John"},{"id":2,"name":"Thomas"}]';
            };
        });

        it("fetches persons", function() {
            expect(person.get()).toEqual(persons);
        });
    });
});
