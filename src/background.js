chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: 'figma.com', pathPrefix: '/file/' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

var url = "";

chrome.webNavigation.onCommited.addListener(function(info) {
  url = info.url;
}, {url: [{urlMatches : 'https://www.figma.com/file/'}]});
chrome.webNavigation.onHistoryStateUpdated.addListener(function(info) {
  url = info.url;
}, {url: [{urlMatches : 'https://www.figma.com/file/'}]});
