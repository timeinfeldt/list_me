describe("person", function() {
    var person;

    beforeEach(function() {
        person = new Person();
    });

    describe("#get", function(){
        describe("when executed", function(){
            beforeEach(function() {
                person.get();
            });

            it("sends xhr request", function() {
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/');
            });
        });

        describe("when busy", function(){
            beforeEach(function(){
                spyOn(person, "before").and.callThrough();
                person.busy = true;
                person.get();
            });

            it("does nothing", function(){
                expect(person.before).not.toHaveBeenCalled();
            });
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
