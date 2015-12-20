Thread = new Mongo.Collection("threads");
//make a validate function
if (Meteor.isClient) {
  //make thread template for anonymous creating of events
	Template.viewAll.helpers({
    threads: function (){
      return Thread.find({});
    }
  });

  Template.makeThread.events({
  	"click #threadMakeSubmit": function(e,t) {
  		e.preventDefault();
  		var threadName = document.getElementById("threadSubmit").value.trim();
		var description = document.getElementById("description").value;
		Meteor.call("addThread", threadName, description,function(err, data){
			console.log(err);
			console.log(data);
			if(data){
				Route.go("/threads/" + threadName);
			}
			else{
				$("#name-message").css("display","inline");
				setTimeout(function(){
			  $("#name-message").css("display", "none");
			},3000);
			}
			
		});

  	}
  });
	
	Template.thread.helpers({
		makeUrl: function(){
			return "/threads/" + this.name;
		}
	})

}
//route was placed in here due to issues with Thread Collection
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