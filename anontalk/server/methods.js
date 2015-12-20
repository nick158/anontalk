function clean(input){
	input = input.replace(/[^a-z\s\d]+/ig,"");
	return input;
};
Meteor.methods({
	addThread: function(threadName,description){
		threadName = clean(threadName);
		var exist = Thread.findOne({name: threadName});
  		if(!exist){
  			Thread.insert({name:threadName, description:description, createdAt: new Date(), views: 0,comments:[]});
			return true;
  		}
		else{
			return false;
		}
	}
})