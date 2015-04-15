registerAction(function(node) {
  if (document.URL === 'https://www.facebook.com/groups/friendfeedik/permalink/526755010673615/') {
    return;
  }

  if (Object.keys(frfNames).length === 0) {
    return;
  }

  node = node || document.body;

  var userLinks = $(node)
    .find('h5, h6, .UFICommentContent, .UFILikeSentenceText, .uiContextualLayer')
    .find('a[href^="https://www.facebook.com/"]');

  if (userLinks.length === 0) {
    return;
  }

  userLinks.map(function() {
    var linkElement = $(this);
    var href = linkElement.attr('href');
    var linkText = linkElement.text();
    var fbName = getFbName(href);
    if (frfNames[fbName] && linkText.length > 0) {
      if (linkElement.find('.facefeedik-name').length === 0) {
        linkElement.append(' <span class="facefeedik-name">(' + frfNames[fbName] + ')</span>');
      } else {
        linkElement.find('.facefeedik-name').html('(' + frfNames[fbName] + ')');
      }
    }
  });
});
