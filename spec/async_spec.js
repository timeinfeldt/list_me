describe("Async", function() {
    beforeEach(function() {
        window.tmp = {};
        tmp.fn1 = tmp.fn2 = function() {};
        async = new Async(tmp.fn1, tmp.fn2, "object");
    });

    afterEach(function() {
        window.tmp = null;
    });

    describe("constructor", function() {
        it("has a xhr object.", function() {
            expect(async.xhr instanceof XMLHttpRequest).toBeTruthy;
        });

        it("has error-handling function.", function() {
            expect(async.errorFn).toEqual(tmp.fn2);
        });

        it("has success-handling function.", function() {
            expect(async.errorFn).toEqual(tmp.fn1);
        });

        it("has context object.", function() {
            expect(async.context).toEqual("object");
        });
    });

    describe(".get", function() {
        beforeEach(function() {
            spyOn(async.xhr, 'open').and.callThrough();
            spyOn(async.xhr, 'send');
            spyOn(window, 'setTimeout');
            async.get("www.example.com", tmp.fn1, tmp.fn2);
        });

        it("sets timtout", function() {
            expect(setTimeout).toHaveBeenCalledWith(async._ontimeout, 3000);
        });

        it("opens url.", function() {
            expect(async.xhr.open).toHaveBeenCalledWith("GET", "www.example.com", true);
        })

        it("sends xhr request.", function() {
            expect(async.xhr.send).toHaveBeenCalled();
        });

        describe("when success,", function() {
            beforeEach(function() {
                spyOn(window, 'clearTimeout');
                spyOn(async, 'successFn');
                jasmine.Ajax.requests.mostRecent().response(testResponse.success);
            });

            it("calls success function.", function() {
                expect(async.successFn).toHaveBeenCalled();
            });

            it("clears timeout", function() {
                expect(clearTimeout).toHaveBeenCalledWith(async.timer);
            });
        });

        describe("when error,", function() {
            beforeEach(function() {
                spyOn(async, 'errorFn');
                spyOn(window, 'clearTimeout');
                jasmine.Ajax.requests.mostRecent().response(testResponse.notFound);
            });

            it("calls error function.", function() {
                expect(async.errorFn).toHaveBeenCalledWith(async.xhr);
            });

            it("clears timeout.", function() {
                expect(clearTimeout).toHaveBeenCalledWith(async.timer);
            });
        });
    });

    describe("#_ontimeout", function() {
        beforeEach(function() {
            spyOn(window, "clearTimeout");
            spyOn(async.xhr, "abort");
            spyOn(async, 'errorFn');
            async._ontimeout();
        });

        it("clears timeout.", function() {
            expect(window.clearTimeout).toHaveBeenCalledWith(async.timer);
        });

        it("aborts xhr request.", function() {
            expect(async.xhr.abort).toHaveBeenCalled();
        });

        it("executes error-handling function.", function() {
            expect(async.errorFn).toHaveBeenCalledWith(async.xhr);
        });
    });
});
