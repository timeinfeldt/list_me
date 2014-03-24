describe("Async", function() {
    beforeEach(function() {
        async = new Async;
    });

    describe("constructor", function() {
        it("has a xhr object.", function() {
            expect(async.xhr instanceof XMLHttpRequest).toBeTruthy;
        });
    });

    describe(".get", function() {
        beforeEach(function() {
            window.tmp = {};
            window.tmp.fn1 = window.tmp.fn2 = function() {};
            spyOn(async.xhr, 'open').and.callThrough();
            spyOn(async.xhr, 'send').and.callThrough();
            spyOn(window.tmp, 'fn1');
            spyOn(window.tmp, 'fn2');
            spyOn(window, 'clearTimeout').and.callThrough();
            spyOn(window, 'setTimeout').and.callThrough();
            async.get("www.example.com", tmp.fn1, tmp.fn2);
        });

        afterEach(function() {
            window.tmp = null;
        });

        it("sets timtout", function() {
            expect(setTimeout).toHaveBeenCalled();
        });

        it("opens url.", function() {
            expect(async.xhr.open).toHaveBeenCalledWith("GET", "www.example.com", true);
        })

        it("sends xhr request.", function() {
            expect(async.xhr.send).toHaveBeenCalled();
        });

        describe("when success,", function() {
            beforeEach(function() {
                jasmine.Ajax.requests.mostRecent().response(testResponse.success);
            });

            it("clears timeout", function() {
                expect(clearTimeout).toHaveBeenCalledWith(async.timer);
            });

            it("calles success function.", function() {
                expect(tmp.fn1).toHaveBeenCalled();
            });
        });

        describe("when error,", function() {
            it("calles error function.", function() {
                jasmine.Ajax.requests.mostRecent().response(testResponse.notFound);
                expect(tmp.fn2).toHaveBeenCalled();
            });
        });
    });
});
