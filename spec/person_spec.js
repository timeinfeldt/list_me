describe("person", function() {
    var person;
    var dom;

    beforeEach(function() {
        dom = '#persons';
        person = new Person(dom);
    });

    describe("constructor", function() {
        it("sets cont=true", function() {
            expect(person.cont).toEqual(true);
        });

        it("sets busy=false", function() {
            expect(person.busy).toEqual(false);
        })

        it("sets dom", function() {
            expect(person.dom).toEqual(document.querySelector(dom));
        });
    });

    describe("#get", function() {
        describe("when executed", function() {
            beforeEach(function() {
                spyOn(person, "before").and.callThrough();
                spyOn(person, "after").and.callThrough();
                spyOn(person, "append");
                person.get();
            });

            it("calls #before", function() {
                expect(person.before).toHaveBeenCalled();
            });

            it("sends xhr request", function() {
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/');
            });

            describe("when xhr call completed", function() {
                describe("when response is success", function() {
                    beforeEach(function() {
                        jasmine.Ajax.requests.mostRecent().response(testResponse.success);
                    });

                    it("calls #append", function() {
                        expect(person.append).toHaveBeenCalledWith([{id: 1, name: "John"}]);
                    });

                    it("calls #after", function() {
                        expect(person.after).toHaveBeenCalled();
                    });
                });

                describe("when response code is not success", function() {
                    it("calls #after", function() {
                        jasmine.Ajax.requests.mostRecent().response(testResponse.notFound);
                        expect(person.after).toHaveBeenCalled();
                    });
                });

                describe("when there are no more pages", function() {
                    it("sets cont=false", function() {
                        jasmine.Ajax.requests.mostRecent().response(testResponse.end);
                        expect(person.cont).toEqual(false);
                    });
                });
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

    describe("#after", function() {
        beforeEach(function() {
            person.busy = true;
            person.after();
        });

        it("sets busy=false", function() {
            expect(person.busy).toEqual(false);
        });
    });

    describe("#append", function() {
        it("appends persons to DOM", function() {
        });
    });
});
