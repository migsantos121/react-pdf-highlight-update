function getTextNodesIn(node) {
    var textNodes = [];
    if (node.nodeType == 3) {
        textNodes.push(node);
    } else {
        var children = node.childNodes;
        for (var i = 0, len = children.length; i < len; ++i) {
            textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
        }
    }
    return textNodes;
}

function highlightText(el, toHighlightWord, style) {
    var textNodes = getTextNodesIn(el);
    var regex = new RegExp(toHighlightWord, "g");

    for (var i = 0; i < textNodes.length ; i++) {
        var textNode = textNodes[i];
        var originalText = textNode.textContent;
        var changedText = originalText.replace(regex, ("<span style='"+style+"'>" + toHighlightWord + "</span>"));
        if (originalText.length != changedText.length) {
            textNode.parentElement.innerHTML = changedText;  
        }
    }
}

export function highLight2styles(htmlNode, bkHighlightNocallback, ulHighlightNocallback) {
    var i;
    for (i = 0; i < bkHighlightNocallback.length; i ++) {
        highlightText(htmlNode, bkHighlightNocallback[i], "background-color: rgb(153,153,0)");
    }
    for (i = 0; i < ulHighlightNocallback.length; i ++) {
        highlightText(htmlNode, ulHighlightNocallback[i], "border-bottom: solid rgb(153,153,0) 2px");
    }
}
