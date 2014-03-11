document.addEventListener('DOMContentLoaded', function() {
    var domTag = "#persons";
    var person = new Person(domTag);
    var bottomReached;

    dom = document.querySelector(domTag);
    bottomReached = function() {
        return dom.scrollTop == dom.scrollHeight - dom.clientHeight;
    };
    dom.onscroll = function() {
        if(bottomReached()) {
            person.get();
            jasmine.Ajax.requests.mostRecent().response(testResponse.preview);
        }
    };
    person.get();
    jasmine.Ajax.requests.mostRecent().response(testResponse.preview);
});
