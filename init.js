var registerAction = function(action) {
  actions.push(action);
};

var toArray = function(nl) {
  return Array.prototype.slice.call(nl);
};

var getFbName = function(href) {
  var fbName = href.match(/https:\/\/www\.facebook\.com\/([\w\.]+)(\/|\?|\&|$)/)[1];
  if (fbName === 'profile.php') {
    fbName = href.match(/\/profile.php\?id\=([\d]+)(\?|\&|$)/)[1];
  }
  return fbName;
};

var documentLoaded = new Promise(function(resolve) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(resolve, 0);
  } else {
    document.addEventListener("DOMContentLoaded", resolve);
  }
});

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length === 0) {
      return;
    }
    toArray(mutation.addedNodes).forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        actions.forEach(function(action) {
          action(node);
        });
      }
    });
  });
});

var frfNames = {},
    canStoreNames = true,
    actions = [];

chrome.storage.local.get('names', function(items) {
  frfNames = items['names'] || {};

  documentLoaded.then(function() {
    actions.forEach(function(action) {
      action();
    });
    observer.observe(document.body, {childList: true, subtree: true});
  });
});
