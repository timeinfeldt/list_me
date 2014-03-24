describe("person", function() {
    var person;
    var domTag;

    beforeEach(function() {
        domTag = '#persons';
        person = new Person(domTag);
        spyOn(window, "setTimeout");
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
                spyOn(person, "_append");
                person.get();
            });

            it("sends xhr request with page number", function() {
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/?page=1');
            })

            describe("when xhr call completed", function() {
                describe("when response is success", function() {
                    beforeEach(function() {
                        spyOn(person, "_handleSuccess");
                        jasmine.Ajax.requests.mostRecent().response(testResponse.success);
                    });

                    it("calls _handleSuccess", function() {
                        expect(person._handleSuccess).toHaveBeenCalled();
                    });
                });

                describe("when response code is not success", function() {
                    beforeEach(function() {
                        spyOn(person, "_handleErrors");
                    });

                    it("handles error cases", function() {
                        expect(person._handleErrors).toHaveBeenCalled();
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
                person.busy = true;
                person.get();
            });

            it("does nothing", function(){ });
        });
    });

    describe("#_handleSuccess", function() {
        beforeEach(function() {
            spyOn(person, "_append");
            window.xhr.responseText = testResponse.success.responseText;
            person._handleSuccess();
        });

        it("calls #_append", function() {
            expect(person._append).toHaveBeenCalledWith([{id: 1, name: "John"}]);
        });

        it("increments current page number", function() {
            expect(person.currentPage).toEqual(2);
        });
    });

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

    describe("#_afterHooks", function() {
        beforeEach(function() {
            person.busy = true;
            person.tries = 1;
            person._afterHooks();
        });

        it("sets busy=false", function() {
            expect(person.busy).toEqual(false);
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
