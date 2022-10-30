async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function transforStringToLuceneFormat(str) {
    res = '';
    const lucene_chars = '+-&|!(){}[]^"~*?:\\ /'
    for (let i in str) {
        let c = str[i];
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
    for (let i in str) {
        let c = str[i];
        if (regular_chars.indexOf(c) != -1) {
            res += '\\';
        }
        res += c;
    }
    return res;
}

function transforStringToAntiCensorShipFormat(str) {
    res = '';
    const spcical_char = '\u00A0';
    for (let i in str) {
        let c = str[i] + spcical_char;
        res += c;
    }
    return res;
}

function transforStringToRecoverAntiCensorShipFormat(str) {
    res = '';
    const spcical_char = '\u00A0';
    for (let i in str) {
        let c = str[i];
        if (c == spcical_char) {
            continue;
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
        document.getElementById('anti-censorship').innerText = transforStringToAntiCensorShipFormat(res);
        document.getElementById('recover-anti-censorship').innerText = transforStringToRecoverAntiCensorShipFormat(res);
    });
}

popup();