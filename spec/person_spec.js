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

        it("sets tries=0", function() {
            expect(person.tries).toEqual(0);
        });
    });

    describe("#get", function() {
        describe("when executed", function() {
            beforeEach(function() {
                spyOn(person, "_beforeHooks");
                spyOn(person, "_afterHooks");
                spyOn(person, "_append");
                spyOn(XMLHttpRequest.prototype, "send");
                person.get();
            });

            it("calls #_beforeHooks", function() {
                expect(person._beforeHooks).toHaveBeenCalled();
            });

            it("sends xhr request with page number", function() {
                expect(jasmine.Ajax.requests.mostRecent().url).toBe('persons/?page=1');
            })

            describe("when xhr call completed", function() {
                describe("when response is success", function() {
                    beforeEach(function() {
                        jasmine.Ajax.requests.mostRecent().response(testResponse.success);
                    });

                    it("calls #_append", function() {
                        expect(person._append).toHaveBeenCalledWith([{id: 1, name: "John"}]);
                    });

                    it("increments current page number", function() {
                        expect(person.currentPage).toEqual(2);
                    });

                    it("calls #_afterHooks", function() {
                        expect(person._afterHooks).toHaveBeenCalled();
                    });
                });

                describe("when response code is not success", function() {
                    beforeEach(function() {
                        spyOn(person, "_handleErrors").and.callThrough();
                        for(var i=0;i<3;i++) {
                            jasmine.Ajax.requests.mostRecent().response(testResponse.notFound);
                        }
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
                spyOn(person, "_beforeHooks").and.callThrough();
                person.busy = true;
                person.get();
            });

            it("does nothing", function(){
                expect(person._beforeHooks).not.toHaveBeenCalled();
            });
        });
    });

    describe("#_handleErrors", function() {
        var xhr;

        beforeEach(function() {
            xhr = { send: function() {} };
        });

        describe("when called for the first time", function() {
            beforeEach(function() {
                spyOn(xhr, "send");
                person._handleErrors(xhr);
            });

            it("calls xhr.send", function() {
                expect(xhr.send).toHaveBeenCalled();
            });

            it("increments the counter", function() {
                expect(person.tries).toEqual(1);
            });
        });

        describe("when called for the third time", function(){
            beforeEach(function() {
                person.tries = 2;
                spyOn(person, "_promptErrors");
                spyOn(person, "_afterHooks").and.callThrough();
                spyOn(xhr, "send");
                person._handleErrors();
            });

            it("does not call xhr.send", function() {
                expect(xhr.send).not.toHaveBeenCalled();
            });

            it("prompts error message", function() {
                expect(person._promptErrors).toHaveBeenCalledWith("Cannot retreive data.");;
            });

            it("resets counter", function() {
                expect(person.tries).toEqual(0);
            });

            it("calls #_afterHooks", function() {
                expect(person._afterHooks).toHaveBeenCalled();
            });
        });
    });

    describe("#_beforeHooks", function() {
        beforeEach(function(){
            person._beforeHooks();
        });

        it("sets busy=true", function(){
            expect(person.busy).toEqual(true);
        });
    });

    describe("#_afterHooks", function() {
        beforeEach(function() {
            person.busy = true;
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
