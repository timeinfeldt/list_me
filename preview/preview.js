document.addEventListener('DOMContentLoaded', function() {
    var domTag = "#persons";
    var personList = new LongList("www.example.com/persons/", domTag);
    var bottomReached;

    dom = document.querySelector(domTag);
    bottomReached = function() {
        return dom.scrollTop == dom.scrollHeight - dom.clientHeight;
    };
    dom.onscroll = function() {
        if(bottomReached()) {
            personList.get();
            jasmine.Ajax.requests.mostRecent().response(testResponse.preview);
        }
    };
    personList.get();
    jasmine.Ajax.requests.mostRecent().response(testResponse.preview);
});
