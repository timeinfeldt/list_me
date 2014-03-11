describe("person", function() {
    var person;
    var domTag;

    beforeEach(function() {
        domTag = '#persons';
        person = new Person(domTag);
    });

    describe("constructor", function() {
        it("sets cont=true", function() {
            expect(person.cont).toEqual(true);
        });

        it("sets busy=false", function() {
            expect(person.busy).toEqual(false);
        })

        it("sets dom", function() {
            expect(person.dom).toEqual(document.querySelector(domTag));
        });

        it("sets currentPage=0", function() {
            expect(person.currentPage).toEqual(1);
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

            it("sends xhr request with page number", function() {
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/?page=1');
            })

            describe("when xhr call completed", function() {
                describe("when response is success", function() {
                    beforeEach(function() {
                        jasmine.Ajax.requests.mostRecent().response(testResponse.success);
                    });

                    it("calls #append", function() {
                        expect(person.append).toHaveBeenCalledWith([{id: 1, name: "John"}]);
                    });

                    it("increments current page number", function() {
                        expect(person.currentPage).toEqual(2);
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
        beforeEach(function() {
            persons = [{id: 1, name: "John"}, {id: 2, name: "Thomas"}];
            person.append(persons);
        });
        afterEach(function() {
            document.querySelector(domTag).innerHTML = null;
        });

        it("appends persons to DOM", function() {
            expect(document.querySelectorAll(".person").length).toEqual(2);
        });
    });
});
