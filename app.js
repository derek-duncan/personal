var path = require('path');
var koa = require('koa');
var views = require('koa-views');
var serve = require('koa-static-cache');
var app = koa();
var router = require('koa-router')();

app.use(views('views', {
  default: 'jade'
}));

router.get('/', function *(next) {
  yield this.render('index');
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// Serve static files
let publicDirectory = path.join(__dirname, 'public');
let cacheOptions = {
  maxAge: 60 * 60 * 24,
  gzip: true
};
app.use(serve(publicDirectory, cacheOptions));

app.listen(3000);
