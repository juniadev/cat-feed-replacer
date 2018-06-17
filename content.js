var replaceImage = img => {
    img.src = 'https://placekitten.com/' + img.width + '/' + img.height;
};

var replaceText = txt => {
    var newText = '';
    var count = 0;
    var words = txt.innerHTML.split(' ');
    words.forEach(word => {
        if (count%4 == 0) {
            newText += 'Purr ';
        } else {
            newText += 'Meow ';
        }
        count++;
    });
    txt.innerHTML = newText;
};

var allIgnoredPages = [];

function isIgnored(currPath) {
    var result = allIgnoredPages.find(page => currPath === ('/'+page+'/'));
    return result != null;
}

var callback = mutations => {
    var currPath = window.location.pathname;
    if (isIgnored(currPath)) {
        return;
    }
        
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (typeof node.getElementsByTagName !== 'function') {
                return;
            }

            var imgs = node.getElementsByTagName('img');
            Array.from(imgs).forEach(img => {
                replaceImage(img);
            });

            var texts = node.getElementsByTagName('p');
            Array.from(texts).forEach(txt => {
                replaceText(txt);
            });
        });
    });
};

var targetNode = document;
var config = { childList: true, subtree: true };

chrome.storage.sync.get('ignorePages', result => {
    allIgnoredPages = result.ignorePages.split(';');

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});