// initialize header

beginHead();

function beginHead() {
	document.title = 'Garmin Events Tracker';
	
	// create array of each stylesheet innerHTML
	let inserts = [];
	inserts.push('<meta charset="UTF-8">');
	inserts.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
	inserts.push('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">');
	inserts.push('<link rel="stylesheet" href="template/plugins/fontawesome-free/css/all.min.css">');
	inserts.push('<link rel="stylesheet" href="template/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">');
	inserts.push('<link rel="stylesheet" href="template/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">');
	inserts.push('<link rel="stylesheet" href="template/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">');
	inserts.push('<link rel="stylesheet" href="template/dist/css/adminlte.min.css">');
	
	// add to document header
	for (let i = 0; i < inserts.length; i++) {
		document.head.innerHTML += inserts[i];
	}
}