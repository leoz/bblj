/*!
 * LiveJournal JavaScript API
 */

function lj_getchallenge() {
	$.xmlrpc({
	    url: 'http://www.livejournal.com/interface/xmlrpc',
	    methodName: 'LJ.XMLRPC.getchallenge',
	    params: [],
	    success: function(response, status, jqXHR) {
	    	console.log(response);
	    	console.log(status);
	    	console.log("LJ.XMLRPC.getchallenge - success");
		},
	    error: function(jqXHR, status, error) {
	    	console.log(status);
	    	console.log(error);
	    	console.log("LJ.XMLRPC.getchallenge - error");
		}
	});
}

function lj_login() {

	var user_login = JSON.parse(localStorage.getItem("lj_user_login"));

	var username = user_login.username;
	var password = user_login.password;

	$.xmlrpc({
	    url: 'http://www.livejournal.com/interface/xmlrpc',
	    methodName: 'LJ.XMLRPC.login',
	    params: [ {
			'username' : username,
			'password' : password
		} ],
	    success: function(response, status, jqXHR) {
	    	console.log(response);
	    	console.log(status);
	    	console.log("LJ.XMLRPC.login - success");
			lj_ui_login(true);
		},
	    error: function(jqXHR, status, error) {
	    	console.log(status);
	    	console.log(error);
	    	console.log("LJ.XMLRPC.login - error");
			lj_ui_login(false);
			lj_ui_show_error(error);
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
