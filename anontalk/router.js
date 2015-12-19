Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'AnonTalk - Home'}});
});
Router.route("makeThread");
Router.route("viewAll");
Router.route("/threads/:threadName", function(){
	var threadName = this.params.threadName;
	if(!Thread.findOne({name:threadName})){
		Router.go("/notFound");
	}
	this.layout("threadPage");
	//render header in the thread page layout
	this.render("threadHeader", {
		data: function () {
			return Thread.findOne({name: threadName});
		},
		to: "header"
	});
	
	this.render("discussion", {
		data: function () {
			return Thread.findOne({name: threadName});
		}
	});
});
Router.route("notFound");