describe("person", function() {
    var person;

    beforeEach(function() {
        person = new Person();
    });

    describe("#get", function(){
        beforeEach(function() {
            person.get();
        });

        it("sends xhr request", function() {
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/');
        });
    });

    describe("#before", function() {
        beforeEach(function(){
            person.before();
        });

        it("sets busy=true", function(){
            expect(person.busy).toEqual(true);
        });
    });
});
