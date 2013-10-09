
var unknown = "***";

// Sys Info
var model = unknown;
var hardware_id = unknown;
var software_version = unknown;

// App Info
var author = unknown;
var author_email = unknown;
var author_url = unknown;
var copyright = unknown;
var description = unknown;
var id = unknown;
var license = unknown;
var license_url = unknown;
var name = unknown;
var version = unknown;
var orientation = unknown;
var window_state = unknown;

$(document).on('dialogcreate', '#about_page', function(){

	console.log("dialogcreate - about_page");

	load_info();
});

function get_info() {

	if(typeof blackberry !== 'undefined') {
		model = blackberry.system.model;
		hardware_id = blackberry.system.hardwareId;
		software_version = blackberry.system.softwareVersion;

		author = blackberry.app.author;
		author_email = blackberry.app.authorEmail;
		author_url = blackberry.app.authorURL;
		copyright = blackberry.app.copyright;
		description = blackberry.app.description;
		id = blackberry.app.id;
		license = blackberry.app.license;
		license_url = blackberry.app.licenseURL;
		name = blackberry.app.name;
		version = blackberry.app.version;
		orientation = blackberry.app.orientation;
		window_state = blackberry.app.windowState;
	}
}

function load_info() {

	$('#about-sys-model').text(model);
	$('#about-sys-hardware-id').text(hardware_id);
	$('#about-sys-software-version').text(software_version);

	$('#about-app-author').text(author);
	$('#about-app-author-email').text(author_email);
	$('#about-app-author-url').text(author_url);
	$('#about-app-copyright').text(copyright);
	$('#about-app-description').text(description);
	$('#about-app-id').text(id);
	$('#about-app-license').text(license);
	$('#about-app-license-url').text(license_url);
	$('#about-app-name').text(name);
	$('#about-app-version').text(version);
	$('#about-app-orientation').text(orientation);
	$('#about-app-window-state').text(window_state);
}
