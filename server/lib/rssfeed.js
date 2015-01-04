var request = Npm.require("request");
var FeedParser = Npm.require("feedparser");
var iconv = Npm.require('iconv-lite');

var getParams = function(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

rssFeed = function(){}

_.extend(rssFeed, {
  read: function(feedUrl, callback){
    var posts = []
    var feedParser = new FeedParser()
    feedParser.on('readable', function() {
      var post
      while (post = this.read()) {
        posts[posts.length] = {
          title: iconv.decode(new Buffer(post.title), "utf-8"),
          description: post.description,
          pubDate: post.pubdate,
          image: post.image,
          author: post.author,
          categories: post.categories,
          link: post.link
        }
      }
    })
    .on('end', function(error) {
      callback(error, posts)
    });


    var req = request({
      url: feedUrl,
      timeout: 10000,
      pool: false,
      encoding: null
    });
    req.setMaxListeners(50);

    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
    .setHeader('accept', 'text/html,application/xhtml+xml');

    req.on('error', function(error){
      console.log(error)
    });
    req.on('response', function(res) {
      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      console.log(res.headers)

      res.pipe(feedParser);
    });
  }
})
