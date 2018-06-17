var saveOptions = () => {
    var ignorePages = document.getElementById('ignorePages').value;
    chrome.storage.sync.set({
        ignorePages: ignorePages
    }, () => {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
};

var restoreOptions = () => {
    chrome.storage.sync.get({
        ignorePages: ''
    }, items => {
        document.getElementById('ignorePages').value = items.ignorePages;
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);