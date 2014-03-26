document.addEventListener('DOMContentLoaded', function() {
    var domTag = "#persons";
    var personList = new LongList("www.example.com/persons/", domTag);
    var bottomReached;

    dom = document.querySelector(domTag);
    bottomReached = function() {
        return dom.scrollTop == dom.scrollHeight - dom.clientHeight;
    };
    getItems = function(){
        // demo only - timeout to simulate response delay
        window.setTimeout(function () {
            personList.get();
            jasmine.Ajax.requests.mostRecent().response(testResponse.preview);
        }, 500);
    };
    dom.onscroll = function() {
        if(bottomReached()) {
            getItems();
        }
    };
    getItems();
});
