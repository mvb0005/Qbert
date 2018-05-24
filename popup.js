function push() {
    chrome.tabs.query({'active': true}, function (tabs) {
        var url = tabs[0].url;
        var title = tabs[0].title;
        chrome.bookmarks.search("Qbert's Queue", (result) => {
            if (result.length > 0) {
                id = result[0].id
                chrome.bookmarks.create({"parentId": id, 
                    "title": title, 
                    "url": url});
            } else {
                chrome.bookmarks.create({"parentId": "3", "title": "Qbert's Queue"},
                    (result) => {
                        chrome.bookmarks.create({"parentId": result.id, 
                            "title": title, 
                            "url": url})
                    });
            }
        });
    });
};

function shift() {
    chrome.bookmarks.search("Qbert's Queue", (result) => {
        chrome.bookmarks.getChildren(result[0].id, (results) => {
            chrome.tabs.create({'url': results[0].url});
            chrome.bookmarks.remove(results[0].id);
        });
    });
};

function f3() {
    chrome.bookmarks.search("Qbert's Queue", (result) => {
        chrome.tabs.create({'url': "chrome://bookmarks/?id=" + result[0].id});
    });
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('b1').addEventListener('click', push);
    document.getElementById('b2').addEventListener('click', shift);
    document.getElementById('b3').addEventListener('click', f3);		
});
