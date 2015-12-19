var Thread = new Mongo.Collection("threads");
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
  		var exist = Thread.findOne({name: threadName});
  		if(!exist){
        console.log(exist);
        console.log("test");
  			Thread.insert({name:threadName, description:description, createdAt: new Date(), views: 0,comments:[]});
        Router.go("/threads/"+threadName);
  		}
      
  		else{
        console.log("nope");
  			$("#name-message").css("display","inline");
        setTimeout(function(){
          $("#name-message").css("display", "none");
        },3000);
  		}
  	}
  });
	
	Template.thread.helpers({
		makeUrl: function(){
			return "/threads/" + this.name;
		}
	})

}