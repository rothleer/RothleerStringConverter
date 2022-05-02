async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function transforStringToLuceneFormat(str) {
    res = '';
    const lucene_chars = '+-&|!(){}[]^"~*?:\\ /'
    for (let c of str) {
        if (lucene_chars.indexOf(c) != -1) {
            res += '\\';
        }
        res += c;
    }
    return res;
}

function transforStringToRegularFormat(str) {
    res = '';
    const regular_chars = '*.?+$^[](){}|\/\\';
    for (let c of str) {
        if (regular_chars.indexOf(c) != -1) {
            res += '\\';
        }
        res += c;
    }
    return res;
}

async function popup() {
    let tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, 'popup.js', null, res => {
        console.log(res);
        document.getElementById('lucene').innerText = transforStringToLuceneFormat(res);
        document.getElementById('regular').innerText = transforStringToRegularFormat(res);
    });
}

popup();