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
        beforeEach(function() {
            spyOn(Async, 'get');
            buddyList.get();
        });

        it("sets busy status to true", function() {
            expect(buddyList.busy).toBeTruthy;;
        });

        it("calls Async with url and callbacks", function() {
            expect(Async.get).toHaveBeenCalledWith(
                "www.example.com/persons/?page=1", buddyList._successFn, buddyList._errorFn);
        });
    });
});
