$(document).on('pagebeforeshow', '#main_page', function(){ 
	console.log("pagebeforeshow - main_page");
	lj_getchallenge();
	lj_getevents();
});

$(document).on('pagebeforeshow', '#login_page', function(){

	console.log("pagebeforeshow - login_page");

	$('#login-username').val('');
	$('#login-password').val('');
	$('#login-button').addClass('ui-disabled');

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

function lj_getchallenge() {
	$.xmlrpc({
	    url: 'http://www.livejournal.com/interface/xmlrpc',
	    methodName: 'LJ.XMLRPC.getchallenge',
	    params: [],
	    success: function(response, status, jqXHR) {
	    	console.log("LJ.XMLRPC.getchallenge - success");
		},
	    error: function(jqXHR, status, error) {
	    	console.log("LJ.XMLRPC.getchallenge - error");
		}
	});
}

function lj_getevents() {

	var user_login = JSON.parse(localStorage.getItem("lj_user_login"));

	var username = user_login.username;
	var password = user_login.password;

	$.xmlrpc({
	    url: 'http://www.livejournal.com/interface/xmlrpc',
	    methodName: 'LJ.XMLRPC.getevents',
	    params: [ {
			'username' : username,
			'password' : password,
			'selecttype' : 'lastn',
			'howmany' : '20',
			'ver' : '1'
		} ],
	    success: function(response, status, jqXHR) {
	    	console.log(response);
	    	console.log(status);
	    	console.log("LJ.XMLRPC.getevents - success");
			
			$.each( response[0].events, function( i, item ) {
				lj_ui_add_record(i, item);
			});
		},
	    error: function(jqXHR, status, error) {
	    	console.log(status);
	    	console.log(error);
	    	console.log("LJ.XMLRPC.getevents - error");
		}
	});
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

function do_login() {

    console.log("do login");

	var username = $('#login-username').val();
	var password = $('#login-password').val();

    console.log("username: " + username + " password: " + password);

	store_login(username, password);

	$.mobile.changePage("main.html");
}

function do_logout() {

    console.log("do logout");

	$.mobile.changePage("index.html");
}

function store_login(name, pass) {

	var user_login = {
		"username": name,
		"password": pass
	};
	
	localStorage.setItem('lj_user_login', JSON.stringify(user_login));
}
