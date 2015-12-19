Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'AnonTalk - Home'}});
});
Router.route("makeThread");
Router.route("viewAll");
Router.route("notFound");