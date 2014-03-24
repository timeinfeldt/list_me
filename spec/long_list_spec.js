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
    });
});
