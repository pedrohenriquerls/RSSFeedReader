Package.describe({
  name: 'pedrohenriquerls:rssfeedparser',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use('underscore','server');
  api.addFiles('server/lib/rssfeed.js','server');

  api.export('rssFeed','server');
});

Npm.depends({
  "feedparser": "0.19.2",
  "request": "2.40.0",
  "iconv-lite": "0.4.5"
})

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('pedrohenriquerls:rssfeedparser-tests.js');
});
