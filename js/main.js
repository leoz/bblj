/*!
 * Main BBLJ functions
 */

$(document).on('pagecreate', '#start_page', function(){

	console.log("pagecreate - start_page");

	var user_login = JSON.parse(localStorage.getItem("lj_user_login"));

	if(!user_login || !user_login.username || user_login.username == '') {
		$.mobile.changePage("login.html");
	}
	else {
		$.mobile.changePage("main.html");
	}
});

$(document).on('pagebeforeshow', '#main_page', function(){

	console.log("pagebeforeshow - main_page");

	lj_getevents();
});

$(document).on('pagebeforeshow', '#login_page', function(){

	console.log("pagebeforeshow - login_page");

	lj_ui_reset_login();

	$(".login-input").on("input", function (e) {
		var username = $('#login-username').val();
		var password = $('#login-password').val();
		if(username != '' && password != '') {
			$('#login-button').removeClass('ui-disabled');
		}
		else {
			$('#login-button').addClass('ui-disabled');
		}
	});
});

function lj_ui_reset_login() {
	$('#login-username').val('');
	$('#login-password').val('');
	$('#login-button').addClass('ui-disabled');
}

function lj_ui_add_record(num, record) {

	var event_id = "event-";
	var subject_id = "subject-";

    array_buffer_to_string(record.event, 
        function (string) {
			$('#' + event_id + record.itemid).append(string);
        }
    );

    array_buffer_to_string(record.subject, 
        function (string) {
			$('#' + subject_id + record.itemid).append(string);
        }
    );

	var subject_html = '';
    subject_html += '<h3>';
	subject_html += '<img class="record-icon" src="images/album-bb.jpg"/>';
	subject_html += '<span id=';
	subject_html += subject_id + record.itemid;
	subject_html += ' class="record-title">';
	subject_html += '</span>';
	subject_html += '<span class="record-date">';
	subject_html += $.format.date(record.eventtime, "dd MMMM, HH:mm");
	subject_html += '</span>';
	subject_html += '</h3>';


	var event_html = '<p id=' + event_id + record.itemid + '></p>';

	var content = '';
	content += '<div data-role="collapsible" data-collapsed="false"';
	content += 'data-inset="false" data-collapsed-icon="arrow-d"';
	content += 'data-expanded-icon="arrow-u" data-iconpos="right">';
	content += subject_html;
	content += event_html;
	content += '</div>';
	
	$("#main_page div:jqmData(role=content)").append (content);
	$("#main_page div:jqmData(role=collapsible)").collapsible();
}

function array_buffer_to_string(buf, callback) {

    var bb = new Blob([buf]);
    var f = new FileReader();
    f.onload = function(e) {
        callback(e.target.result)
    }
    f.readAsText(bb);
}

function lj_ui_show_error(error) {

	var title = "Log in Error";
	var message = error.message;

	var template = '';
	template += '<div data-role="popup" id="tooltip" class="ui-content lj_popup" data-theme="e" data-overlay-theme="a" style="max-width:350px;">';
	template += '<h4>';
	template += title;
	template += '</h4>';
	template += '<p>';
	template += message;
	template += '</p>';
	template += '</div>';
	
	$.mobile.activePage.append(template).trigger("create");
	$.mobile.activePage.find(".lj_popup").popup().popup("open");
	window.setTimeout(function() {$('.lj_popup').popup('close')}, 1500);
}

function lj_ui_login(logged_in) {
	if(logged_in) {
		$.mobile.changePage("main.html");
	}
	else {
		lj_ui_reset_login();
		store_login('','');
	}
}

function do_login() {

    console.log("do login");

	var username = $('#login-username').val();
	var password = $('#login-password').val();

    console.log("username: " + username + " password: " + password);

	store_login(username, password);

	lj_getchallenge();
	lj_login();
}

function do_logout() {

    console.log("do logout");

	store_login('','');

	$.mobile.changePage("login.html");
}

function store_login(name, pass) {

	var user_login = {
		"username": name,
		"password": pass
	};
	
	localStorage.setItem('lj_user_login', JSON.stringify(user_login));
}
