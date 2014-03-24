"use strict";

(function() {
    // Usage (new LongList(url, dom)).get();
    function LongList(url, domSelector) {
        this.url = url;
        this.cont = true;
        this.busy = false;
        this.currentPage = 1;
        this.dom = document.querySelector(domSelector);
    }

    window.LongList = LongList;
})();
