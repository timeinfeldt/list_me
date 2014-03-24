describe("person", function() {
    describe("#_handleErrors", function() {
        describe("when called for the third time", function(){
            beforeEach(function() {
                spyOn(person, "_promptErrors");
                person._handleErrors();
            });

            it("prompts error message", function() {
                expect(person._promptErrors).toHaveBeenCalledWith("Cannot retreive data.");
            });
        });

        it("sets busy=true", function(){
            expect(person.busy).toEqual(true);
        });
    });

    describe("#_append", function() {
        beforeEach(function() {
            persons = [{id: 1, name: "John"}, {id: 2, name: "Thomas"}];
            person._append(persons);
        });
        afterEach(function() {
            document.querySelector(domTag).innerHTML = null;
        });

        it("appends persons to DOM", function() {
            expect(document.querySelectorAll(".person").length).toEqual(2);
        });
    });
});
