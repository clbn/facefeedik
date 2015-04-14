registerAction(function (node) {
  node = node || document.body;

  var users = {
    'alex.olsh': 'clbn'
  };

  var userLinks = $(node).find('h5, h6, .UFICommentContent').find('a[href^="https://www.facebook.com/"]');

  userLinks.map(function () {
    var href = $(this).attr('href');
    var username = href.match(/https:\/\/www\.facebook\.com\/([\w\.]+)(\/|\?|$)/)[1];
    if (users[username]) {
      $(this).append(' <span class="facefeedik-name">(' + users[username] + ')</span>');
    }
  });
});
