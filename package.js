Package.describe({
  name: 'pedrohenriquerls:rssfeedparser',
  summary: 'Simple way to take RSS Feed',
  version: '0.2',
  git: 'git@github.com:pedrohenriquerls/RSSFeedReader.git'
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
