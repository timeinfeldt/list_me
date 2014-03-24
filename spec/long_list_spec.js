describe("LongList", function() {
    var buddyList;

    beforeEach(function() {
        buddyList = new LongList("www.example.com/persons/", "#persons");
    });

    describe("constructor", function() {
        it("sets url", function() {
            expect(buddyList.url).toEqual("www.example.com/persons/");
        });

        it("sets cont=true", function() {
            expect(buddyList.cont).toEqual(true);
        });

        it("sets busy=false", function() {
            expect(buddyList.busy).toEqual(false);
        })

        it("sets dom", function() {
            expect(buddyList.dom).toEqual(document.querySelector("#persons"));
        });

        it("sets currentPage=0", function() {
            expect(buddyList.currentPage).toEqual(1);
        });
    });

    describe("#get", function() {
        describe("when still data continues and not busy,", function() {
            beforeEach(function() {
                spyOn(Async, 'get');
                buddyList.get();
            });

            it("sets busy status to true.", function() {
                expect(buddyList.busy).toBeTruthy;
            });

            it("calls Async with url and callbacks.", function() {
                expect(Async.get).toHaveBeenCalledWith(
                    "www.example.com/persons/?page=1", buddyList._successFn, buddyList._errorFn);
            });
        });

        describe("when busy,", function() {
            it("does not try to get data.", function() {
                spyOn(Async, 'get');
                buddyList.busy = true;
                buddyList.get();
                expect(Async.get).not.toHaveBeenCalled();
            });
        });

        describe("when end of data reached,", function() {
            it("does not try to get data.", function() {
                spyOn(Async, 'get');
                buddyList.cont = false;
                buddyList.get();
                expect(Async.get).not.toHaveBeenCalled();
            });
        });
    });

    describe("#_successFn", function() {
        beforeEach(function() {
            buddyList.busy = true;
            buddyList.xhr = {};
            spyOn(buddyList, '_append');
        });

        describe("when the data still continues,", function() {
            beforeEach(function() {
                buddyList.xhr.responseText = testResponse.success.responseText;
                buddyList._successFn();
            });

            it("appends data to dom.", function() {
                expect(buddyList._append).toHaveBeenCalledWith(
                    JSON.parse(buddyList.xhr.responseText).persons);
            });

            it("increments current page number.", function() {
                expect(buddyList.currentPage).toEqual(2);
            });

            it("set busy state to false.", function() {
                expect(buddyList.busy).toEqual(false);
            });

            it("does not modify cont state, so that it remains true.", function() {
                expect(buddyList.cont).toBeTruthy;
            });
        });

        describe("when data reached to the end,", function() {
            it("remembers that there is no more data.", function() {
                buddyList.xhr.responseText = testResponse.end.responseText;
                buddyList._successFn();
                expect(buddyList.cont).toEqual(false);
            });
        });
    });
});
