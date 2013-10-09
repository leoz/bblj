
$(document).on('dialogcreate', '#about_page', function(){

	console.log("dialogcreate - about_page");
	
	var name = "..."; // blackberry.app.name
	var ver = "..."; // blackberry.app.version

	if(typeof blackberry !== 'undefined') {
		name = blackberry.app.name;
		ver = blackberry.app.version;
	}

	$('#about-app-name').text(name);
	$('#about-app-ver').text(ver);
});
