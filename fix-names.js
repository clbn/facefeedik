registerAction(function (node) {
  node = node || document.body;

  var users = {
    'alex.olsh': 'clbn'
  };

  var userLinks = $(node).find('h5, h6, .UFICommentContent').find('a[href^="https://www.facebook.com/"]');

  userLinks.map(function () {
    var linkElement = $(this);
    var href = linkElement.attr('href');
    var username = href.match(/https:\/\/www\.facebook\.com\/([\w\.]+)(\/|\?|$)/)[1];
    if (users[username]) {
      if (linkElement.find('.facefeedik-name').length == 0) {
        linkElement.append(' <span class="facefeedik-name">(' + users[username] + ')</span>');
      } else {
        linkElement.find('.facefeedik-name').html('(' + users[username] + ')');
      }
    }
  });
});
