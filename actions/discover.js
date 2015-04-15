registerAction(function(node) {
  if (document.URL !== 'https://www.facebook.com/groups/friendfeedik/permalink/526755010673615/') {
    return;
  }

  // Get the post comments
  node = node || document.body;
  var comments = $(node).find('.UFICommentContent');
  if (comments.length === 0) {
    return;
  }

  // Update frfNames list
  comments.map(function() {
    var commentElement = $(this);

    var href = commentElement.find('.UFICommentActorName').attr('href');
    var fbName = getFbName(href);

    var text = commentElement.find('.UFICommentBody').text();
    text = text.trim();

    frfNames[fbName] = text;
  });

  // Save frfNames to storage (but not too often)
  if (canStoreNames) {
    canStoreNames = false;
    setTimeout(function() {
      chrome.storage.local.set({'names': frfNames}, function() {
        canStoreNames = true;
        console.log('frfNames saved:', Object.keys(frfNames).length);
      });
    }, 500);
  }
});
