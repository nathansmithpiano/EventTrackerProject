// ----------------------------------
// ---------- INITIALIZERS ----------
// ----------------------------------

window.addEventListener('load', function(e) {
	init();
});

function init() {
	console.log('in init');
	addTemplateScripts();
	beginBody();
	beginNav();
	addContentContainers();
	addMainRow();
	addOverview();
	setOverview();
}

var templateScriptsAdded = false;

function addTemplateScripts() {
	addBodyScript('template/plugins/jquery/jquery.min.js');
	
	setTimeout(function(){
		addBodyScript('template/plugins/bootstrap/js/bootstrap.bundle.min.js');
		addBodyScript('template/plugins/datatables/jquery.dataTables.min.js');
		addBodyScript('template/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js');
		addBodyScript('template/plugins/datatables-responsive/js/dataTables.responsive.min.js');
		addBodyScript('template/plugins/datatables-responsive/js/responsive.bootstrap4.min.js');
		addBodyScript('template/plugins/datatables-buttons/js/dataTables.buttons.min.js');
		addBodyScript('template/plugins/datatables-buttons/js/buttons.bootstrap4.min.js');
		addBodyScript('template/plugins/jszip/jszip.min.js');
		addBodyScript('template/plugins/pdfmake/pdfmake.min.js');
		addBodyScript('template/plugins/pdfmake/vfs_fonts.js');
		addBodyScript('template/plugins/datatables-buttons/js/buttons.html5.min.js');
		addBodyScript('template/plugins/datatables-buttons/js/buttons.print.min.js');
		addBodyScript('template/plugins/datatables-buttons/js/buttons.colVis.min.js');
		addBodyScript('template/dist/js/adminlte.min.js');
		templateScriptsAdded = true;
	}, 500);
	
	
}

// ----------------------------------
// ------------ HANDLERS ------------
// ----------------------------------

function addBodyScript(filepath) {
	// verify filepath is a string
	if ( typeof filepath != 'string') {
		console.error('addBodyScript() error: filepath not a string (' + filepath + ')');
	} else {
		let numSripts = document.scripts.length;
		let script = document.createElement('script');
		script.setAttribute('src', filepath);
		document.body.appendChild(script);
		
		// verify script added
		if (numSripts >= document.scripts.length) {
			console.error('addBodyScript() error: script not added (' + filepath + ')');
		}
	}
}

// append child element to parent and verify
function appendChildToElementWithId(element, id) {
	// verify element before attempting to append
	if (!element) { 
		console.error('appendChildToElementWithId(): invalid element');
		console.error('element', element);
	} else {
		// attempt to append
		let parent = document.getElementById(id);
		// verify bodyWrapperDiv;
		if (!parent) {
			console.error('appendChildToElementWithId() error - not found: parent with id=' + id);
		} else {
			let numChildren = parent.children.length;
			parent.appendChild(element);
			
			// verify appended
			if (numChildren >= parent.children.length) {
				console.error('element not added to parent (parent id=' + id + ')');
				console.error('element', element);
			}
		}
	}
}

// ----------------------------------
// ------------- NAVBAR -------------
// ----------------------------------

function beginNav() {
	let bodyWrapperDiv = document.getElementById('bodyWrapperDiv');

	if (!bodyWrapperDiv) {
		console.error('beginNav() error: bodyWrapperDiv not found');
	} else {
		createNav(bodyWrapperDiv);
	}
}

// add nav bar to main body wrapper div
function createNav() {
	// main nav element
	let navNav = document.createElement('nav');
	navNav.setAttribute('id', 'navNav');
	navNav.setAttribute('class', 'main-header navbar navbar-expand-md navbar-light navbar-white');
	appendChildToElementWithId(navNav, 'bodyWrapperDiv');
	// bodyWrapperDiv.navNav
	
	// top nav 
	let navContainerDiv = document.createElement('div');
	navContainerDiv.setAttribute('id', 'navContainerDiv');
	navContainerDiv.setAttribute('class', 'container');
	appendChildToElementWithId(navContainerDiv, 'navNav');
	// bodyWrapperDiv.navNav.navContainerDiv
	
	// logo link (parent of actual logo)
	let navLogoLink = document.createElement('a');
	navLogoLink.setAttribute('id', 'navLogoLink');
	navLogoLink.setAttribute('class', 'navbar-brand');
	navLogoLink.setAttribute('href', '');
	appendChildToElementWithId(navLogoLink, 'navContainerDiv');
	// bodyWrapperDiv.navNav.navContainerDiv.navLogoLink
	
	// logo
	let navLogoImg = document.createElement('img');
	navLogoImg.setAttribute('id', 'navLogoImg');
	navLogoImg.setAttribute('class', 'brand-image img-circle elevation-3');
	navLogoImg.setAttribute('src', 'media/garmin_icon.png');
	appendChildToElementWithId(navLogoImg, 'navLogoLink');
	// bodyWrapperDiv.navNav.navContainerDiv.navLogoLink.navLogoImg
	
	// logo text
	let navLogoSpan = document.createElement('span');
	navLogoSpan.setAttribute('id', 'navLogoSpan');
	navLogoSpan.setAttribute('class', 'brand-text font-weight-light');
	navLogoSpan.textContent = document.title;
	appendChildToElementWithId(navLogoSpan, 'navLogoLink');
	// bodyWrapperDiv.navNav.navContainerDiv.navLogoLink.navLogoImg.navLogoSpan
	
	// collapsible hamburger icon
	let navButton = document.createElement('button');
	navButton.setAttribute('id', 'navButton');
	navButton.setAttribute('class', 'navbar-toggler order-1');
	navButton.setAttribute('type', 'button');
	navButton.setAttribute('data-toggle', 'collapse');
	navButton.setAttribute('data-target', '#navbarCollapse');
	navButton.setAttribute('aria-controls', 'navbarCollapse');
	navButton.setAttribute('aria-expanded', 'false');
	navButton.setAttribute('aria-label', 'Toggle navigation');
	appendChildToElementWithId(navButton, 'navContainerDiv');
	// bodyWrapperDiv.navNav.navContainerDiv.navButton
	
	// nav button span
	let navButtonSpan = document.createElement('span');
	navButtonSpan.setAttribute('class', 'navbar-toggler-icon');
	appendChildToElementWithId(navButtonSpan, 'navButton');
	// bodyWrapperDiv.navNav.navContainerDiv.navButton.navButtonSpan
	
	// links div
	let navbarCollapse = document.createElement('div');
	navbarCollapse.setAttribute('id', 'navbarCollapse');
	navbarCollapse.setAttribute('class', 'collapse navbar-collapse order-3');
	appendChildToElementWithId(navbarCollapse, 'navContainerDiv');
	// bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse
	
	// links ul
	let navbarUl = document.createElement('ul');
	navbarUl.setAttribute('id', 'navbarUl');
	navbarUl.setAttribute('class', 'navbar-nav');
	appendChildToElementWithId(navbarUl, 'navbarCollapse');
	// bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl
	
	addNavLink('Add Event', buildForm);
	addNavLink('Manage Events', getEvents);
	
	
	
	// bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl.nav_link_li_#
	// bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl.nav_link_#
}

// add link with displayed string
function addNavLink(string, fn) {
	let navUl = document.getElementById('navbarUl');
	// verify
	if (!navUl) {
		console.error('addNavLink(): navbarUl could not be found');
	} else {
		if (typeof string != 'string') {
			console.error('addNavLink(): link is not a string')
		} else {
			let num = navUl.children.length;
			// add to navbarUl
			// containing list item
			let navLi = document.createElement('li');
			let navbarUlChildrenCount = navbarUl.children.length;
			navLi.setAttribute('id', 'nav_link_li_' + (navbarUlChildrenCount + 1));
			navLi.setAttribute('class', 'nav-item');
			appendChildToElementWithId(navLi, 'navbarUl');
			
			// link
			let link = document.createElement('a');
			link.setAttribute('id', 'nav_link_' + (navbarUlChildrenCount + 1));
			link.setAttribute('class', 'nav-link');
			link.innerHTML = string;
			
			if (fn != null) {
				link.addEventListener('click', function(e) {
					e.preventDefault();
					fn();
				});
			}
			
			appendChildToElementWithId(link, 'nav_link_li_' + (navbarUlChildrenCount + 1));
			
			// verify
			if (navbarUlChildrenCount >= navUl.children.length) {
				console.error('addNavLink(): not added');
			}
		}
	}
}

// remove link by number
function removeNavLink(num) {
	let navUl = document.getElementById('navbarUl');
	
	if (!navUl) {
		console.error('removeNavLink(): navbarUl could not be found');
	} else {
		let numNavUlChildren = navUl.children.length;
		// if sent a non-number
		if (!isNaN(numChildren)) {
			console.error('removeNavLink(): numNavUlChildren is not a number');
		} else if ((numNavUlChildren - 1) > navUl.children.length) {
			// if link number is beyond the number of ul's 'children
			console.error('removeNavLink(): numNavUlChildren > ul.children');
		} else {
			navUl.removeChild(navUl.children[numNavUlChildren - 1]);
		}
		// verify
		if (numNavUlChildren >= navUl.children.length) {
			console.error('removeNavLink(): not removed');
		}
	}
}

// ----------------------------------
// ---------- BODY CONTENT ----------
// ----------------------------------

function beginBody() {
	// template
	document.body.setAttribute('class', 'hold-transition layout-top-nav');
	
	// main wrapper must exist before adding anything else
	let bodyWrapperDiv = document.createElement('div');
	bodyWrapperDiv.setAttribute('id', 'bodyWrapperDiv');
	bodyWrapperDiv.setAttribute('class', 'wrapper');
	document.body.appendChild(bodyWrapperDiv);
	
}

function addContentContainers() {
	// main content wrapper, contains page content
	let contentWrapperDiv = document.createElement('div');
	contentWrapperDiv.setAttribute('id', 'contentWrapperDiv');
	contentWrapperDiv.setAttribute('class', 'content-wrapper');
	appendChildToElementWithId(contentWrapperDiv, 'bodyWrapperDiv');
	// bodyWrapperDiv.contentWrapperDiv
	
	// main section
	let contentSection = document.createElement('section');
	contentSection.setAttribute('id', 'contentSection');
	contentSection.setAttribute('class', 'content');
	appendChildToElementWithId(contentSection, 'contentWrapperDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection
	
	// main container-fluid div
	let contentContainerFluidDiv = document.createElement('div');
	contentContainerFluidDiv.setAttribute('id', 'contentContainerFluidDiv');
	contentContainerFluidDiv.setAttribute('class', 'container-fluid');
	appendChildToElementWithId(contentContainerFluidDiv, 'contentSection');
    // bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv
}

function addMainRow() {
	let mainRowDiv = document.createElement('div');
	mainRowDiv.setAttribute('id', 'mainRowDiv');
	mainRowDiv.setAttribute('class', 'row');
	appendChildToElementWithId(mainRowDiv, 'contentContainerFluidDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv
}

function addOverview() {
	// containers
	let overviewColMd3Div = document.createElement('div');
	overviewColMd3Div.setAttribute('id', 'overviewColMd3Div');
	overviewColMd3Div.setAttribute('class', 'col-md-3');
	appendChildToElementWithId(overviewColMd3Div, 'mainRowDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div
	
	let overviewCardDiv = document.createElement('div');
	overviewCardDiv.setAttribute('id', 'overviewCardDiv');
	overviewCardDiv.setAttribute('class', 'card card-primary card-outline');
	appendChildToElementWithId(overviewCardDiv, 'overviewColMd3Div');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv
	
	// Overview card body
	let overviewCardBodyDiv = document.createElement('div');
	overviewCardBodyDiv.setAttribute('id', 'overviewCardBodyDiv');
	overviewCardBodyDiv.setAttribute('class', 'card-body box-profile');
	appendChildToElementWithId(overviewCardBodyDiv, 'overviewCardDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv
	
	// Overview user image
	let overviewImageDiv = document.createElement('div');
	overviewImageDiv.setAttribute('id', 'overviewImageDiv');
	overviewImageDiv.setAttribute('class', 'text-center');
	appendChildToElementWithId(overviewImageDiv, 'overviewCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewImageDiv
	
	let overviewImage = document.createElement('img');
	overviewImage.setAttribute('id', 'overviewImage');
	overviewImage.setAttribute('class', 'profile-user-img img-fluid img-circle');
	overviewImage.setAttribute('src', 'media/user-128x128.png');
	appendChildToElementWithId(overviewImage, 'overviewImageDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewImageDiv.overviewImage
	
	// Overview header
	let overviewHeader = document.createElement('h3');
	overviewHeader.setAttribute('id', 'overviewHeader');
	overviewHeader.setAttribute('class', 'profile-username text-center');
	overviewHeader.textContent = 'Nathan Smith';
	appendChildToElementWithId(overviewHeader, 'overviewCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewHeader
	
	let overviewSubtitleP = document.createElement('p');
	overviewSubtitleP.setAttribute('id', 'overviewSubtitleP');
	overviewSubtitleP.setAttribute('class', 'text-muted text-center');
	overviewSubtitleP.textContent = 'Guy with Garmin data';
	appendChildToElementWithId(overviewSubtitleP, 'overviewCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewSubtitleP
	
	// Overview ul
	let overviewUl = document.createElement('ul');
	overviewUl.setAttribute('id', 'overviewUl');
	overviewUl.setAttribute('class', 'list-group list-group-unbordered mb-3');
	appendChildToElementWithId(overviewUl, 'overviewCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewUl
}

function addOverviewListItem(label, value) {
	let overviewUl = document.getElementById('overviewUl');
	
	// verify
	if (!overviewUl) {
		console.error('addOverviewListItem(): overviewUl could not be found');
	} else if (!label) {
		console.error('addOverviewListItem(): label is empty]');
	} else if (!value) {
		console.error('addOverviewListItem(): value is empty');
	} else {
		let overviewUlChildrenCount = overviewUl.children.length;
		let li = document.createElement('li');
		li.setAttribute('id', 'overview_li_' + (overviewUlChildrenCount + 1));
		li.setAttribute('class', 'list-group-item');
		li.innerHTML = '<b>' + label + '</b>' + '<a class="float-right">' + value + '</a>';
		appendChildToElementWithId(li, 'overviewUl');
		
		// verify
		if (overviewUlChildrenCount >= overviewUl.children.length) {
			console.error('addOverviewListItem(): not added');
		}
	}
}

function removeOverviewListItem(listNum) {
	let liToRemove = document.getElementById('overview_li_' + listNum);
	
	if (!liToRemove) {
		console.error('removeOverviewListItem(): overview_li_' + listNum + ' could not be found');
	} else {
		let numChildren = document.getElementById('overviewUl').children.length;
		document.getElementById('overviewUl').removeChild(liToRemove);
		
		//verify
		if (numChildren - 1 != document.getElementById('overviewUl').children.length) {
			console.error('removeNavLink(): not removed');
		}
	}
}

function removeAllOverviewListItems() {
	let overviewUl = document.getElementById('overviewUl');
	
	for (let child of overviewUl.children) {
		overviewUl.removeChild(overviewUl.firstChild);
	}
}

function updateOverviewListItem(listNum, label, value) {
	let toToUpdate = document.getElementById('overview_li_' + listNum);
	
	if (!toToUpdate) {
		console.error('updateOverviewListItem(): overview_li_' + listNum + ' could not be found');
	} else if (!label) {
		console.error('updateOverviewListItem(): label is empty]');
	} else if (!value) {
		console.error('updateOverviewListItem(): value is empty');
	}
	else {
		let oldInnerHTML = toToUpdate.innerHTML;
		toToUpdate.innerHTML = '<b>' + label + '</b>' + '<a class="float-right">' + value + '</a>';
		
		//verify
		if (toToUpdate.innerHTML == oldInnerHTML) {
			console.error('updateOverviewListItem(): not updated');
		}
	}
}

function removeCol9Divs() {
	// if form card already exists, remove
	if (document.getElementById('formCol9Div')) {
		document.getElementById('formCol9Div').parentElement.removeChild(document.getElementById('formCol9Div'));
	}
	
	// if table card already exists, remove
	if (document.getElementById('tableCol9Div')) {
		document.getElementById('tableCol9Div').parentElement.removeChild(document.getElementById('tableCol9Div'));
	}
}

// ----------------------------------
// -------------- FORM --------------
// ----------------------------------

function updateForm(event) {
	removeCol9Divs();
	buildForm();
	
	// modify form for update
	let form = document.getElementById('eventForm');
	
	if (!form) {
		console.error('updateForm(): form could not be found');
	} else {
		if (!event) {
			console.error('updateForm(): event with id ' + event.id + ' could not be found');
		} else {
			changeFormToUpdate(event);
			
			
			let idInput = document.createElement('input');
			idInput.setAttribute('name', 'id');
			idInput.setAttribute('type', 'hidden');
			idInput.setAttribute('value', event.id);
			form.appendChild(idInput);
			
			if (event.date) {
				form.date.value = event.date.split('T')[0];
			}
			if (event.type) {
				form.type.value = event.type;
			}
			if (event.title) {
				form.title.value = event.title;
			}
			if (event.distance) {
				form.distance.value = event.distance;
			}
			if (event.calories) {
				form.calories.value = event.calories;
			}
			if (event.time) {
				form.time.value = event.time;
			}
			if (event.timeMoving) {
				form.timeMoving.value = event.timeMoving;
			}
			if (event.timeElapsed) {
				form.timeElapsed.value = event.timeElapsed;
			}
			if (event.paceAvg) {
				form.paceAvg.value = event.paceAvg;
			}
			if (event.ascent) {
				form.ascent.value = event.ascent;
			}
			if (event.descent) {
				form.descent.value = event.descent;
			}
			if (event.elevationMin) {
				form.elevationMin.value = event.elevationMin;
			}
			if (event.elevationMax) {
				form.elevationMax.value = event.elevationMax;
			}
			if (event.runCadenceAvg) {
				form.runCadenceAvg.value = event.runCadenceAvg;
			}
			if (event.runCadenceMax) {
				form.runCadenceMax.value = event.runCadenceMax;
			}
			if (event.hrAvg) {
				form.hrAvg.value = event.hrAvg;
			}
			if (event.hrMax) {
				form.hrMax.value = event.hrMax;
			}
			if (event.aerobicTe) {
				form.aerobicTe.value = event.aerobicTe;
			}
			
		}
	}
}

function changeFormToUpdate(event) {
	// change header
	document.getElementById('formCardH3').textContent = "Event id " + event.id;
	
	// remove submit button
	document.getElementById('submitButton').parentNode.removeChild(document.getElementById('submitButton'));

	// add new buttons
	let updateButton = document.createElement('button');
	updateButton.setAttribute('id', 'updateButton');
	updateButton.setAttribute('type', 'submit');
	updateButton.setAttribute('class', 'btn btn-primary float-right');
	updateButton.textContent = 'Update';
	appendChildToElementWithId(updateButton, 'formCardFooterDiv');
	
	let deleteButton = document.createElement('button');
	deleteButton.setAttribute('id', 'deleteButton');
	deleteButton.setAttribute('type', 'submit');
	deleteButton.setAttribute('class', 'btn btn-danger float-right');
	deleteButton.textContent = 'Delete';
	appendChildToElementWithId(deleteButton, 'formCardFooterDiv');
	
	// add Update Button eventListener
	updateButton.addEventListener('click', function(e) {
		e.preventDefault();
		validateForm('update', eventForm);
	});
	
	// add Delete Button eventListener
	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		deleteEvent(event);
	});
}

function afterDelete() {
	removeCol9Divs();
	setOverview();
}

let buildForm = function buildForm() {
	removeCol9Divs();
	
	// containers
	let formCol9Div = document.createElement('div');
	formCol9Div.setAttribute('id', 'formCol9Div');
	formCol9Div.setAttribute('class', 'col-9');
	appendChildToElementWithId(formCol9Div, 'mainRowDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div
	
	let formCardDiv = document.createElement('div');
	formCardDiv.setAttribute('id', 'formCardDiv');
	formCardDiv.setAttribute('class', 'card card-primary');
	appendChildToElementWithId(formCardDiv, 'formCol9Div');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv
	
	let formCardHeaderDiv = document.createElement('div');
	formCardHeaderDiv.setAttribute('id', 'formCardHeaderDiv');
	formCardHeaderDiv.setAttribute('class', 'card-header');
	appendChildToElementWithId(formCardHeaderDiv, 'formCardDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.formCardHeaderDiv
	
	let formCardH3 = document.createElement('h3');
	formCardH3.setAttribute('id', 'formCardH3');
	formCardH3.setAttribute('class', 'card-title');
	formCardH3.textContent = 'Add Event';
	appendChildToElementWithId(formCardH3, 'formCardHeaderDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.formCardHeaderDiv.formCardH3
	
	let formCardBodyDiv = document.createElement('div');
	formCardBodyDiv.setAttribute('id', 'formCardBodyDiv');
	formCardBodyDiv.setAttribute('class', 'card-body');
	appendChildToElementWithId(formCardBodyDiv, 'formCardDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv
	
	// form
	let eventForm = document.createElement('form');
	eventForm.setAttribute('id', 'eventForm');
	appendChildToElementWithId(eventForm, 'formCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm
	
	// first form row
	let formRow1Div = document.createElement('div');
	formRow1Div.setAttribute('id', 'formRow1Div');
	formRow1Div.setAttribute('class', 'row');
	appendChildToElementWithId(formRow1Div, 'eventForm');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow1Div

	addDateInputToFormRow(formRow1Div, 'col-2', 'Date:', 'date');
	addTextInputToFormRow(formRow1Div, 'col-2', 'Type:', 'type');
	addTextInputToFormRow(formRow1Div, 'col-2', 'Title:', 'title');
	addNumberInputToFormRow(formRow1Div, 'col-1', 'Dist. (mi):', 'distance', .01);
	addNumberInputToFormRow(formRow1Div, 'col-1', 'Calories:', 'calories', 1);
	addTextInputToFormRow(formRow1Div, 'col-1', 'Time:', 'time');
	addTextInputToFormRow(formRow1Div, 'col-1', 'Time Moving:', 'timeMoving');
	addTextInputToFormRow(formRow1Div, 'col-1', 'Time Elapsed:', 'timeElapsed');
	addTextInputToFormRow(formRow1Div, 'col-1', 'Average Pace:', 'paceAvg');
	
	// second form row
	let formRow2Div = document.createElement('div');
	formRow2Div.setAttribute('id', 'formRow2Div');
	formRow2Div.setAttribute('class', 'row');
	appendChildToElementWithId(formRow2Div, 'eventForm');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow2Div
	addNumberInputToFormRow(formRow2Div, 'col-1', 'Ascent:', 'ascent', 1);
	addNumberInputToFormRow(formRow2Div, 'col-1', 'Descent:', 'descent', 1);
	addNumberInputToFormRow(formRow2Div, 'col-1', 'Elev. (min):', 'elevationMin', 1);
	addNumberInputToFormRow(formRow2Div, 'col-1', 'Elev. (max):', 'elevationMax', 1);
	addNumberInputToFormRow(formRow2Div, 'col-2', 'Cadence (avg):', 'runCadenceAvg', 1);
	addNumberInputToFormRow(formRow2Div, 'col-2', 'Cadence (max):', 'runCadenceMax', 1);
	addNumberInputToFormRow(formRow2Div, 'col-1', 'HR (avg):', 'hrAvg', 1);
	addNumberInputToFormRow(formRow2Div, 'col-1', 'HR (max):', 'hrMax', 1);
	addNumberInputToFormRow(formRow2Div, 'col-2', 'Aerobic TE:', 'aerobicTe', 1);
	
	// form footer
	let formCardFooterDiv = document.createElement('div');
	formCardFooterDiv.setAttribute('id', 'formCardFooterDiv');
	formCardFooterDiv.setAttribute('class', 'card-footer');
	appendChildToElementWithId(formCardFooterDiv, 'formCardDiv');
	
	// form footer buttons
	let submitButton = document.createElement('button');
	submitButton.setAttribute('id', 'submitButton');
	submitButton.setAttribute('type', 'submit');
	submitButton.setAttribute('class', 'btn btn-primary float-right');
	submitButton.textContent = 'Create Event';
	appendChildToElementWithId(submitButton, 'formCardFooterDiv');
	
	// add Submit Button eventListener
	submitButton.addEventListener('click', function(e) {
		e.preventDefault();
		validateForm('create', eventForm);
	});
}

// add input into form row (name and id will be property)
function addTextInputToFormRow(row, colClass, labelString, property) {
	// verify
	if (!row || !colClass || !labelString || !property) {
		console.error('addTextInputToFormRow() error: argument missing or invalid');
	} else {
		let inputDiv = document.createElement('div');
		inputDiv.setAttribute('class', colClass);
		row.appendChild(inputDiv);
		
		let formGroupDiv = document.createElement('div');
		formGroupDiv.setAttribute('class', 'form-group');
		inputDiv.appendChild(formGroupDiv);
		
		let label = document.createElement('label');
		label.innerHTML = labelString;
		formGroupDiv.appendChild(label);
		
		let input = document.createElement('input');
		input.setAttribute('id', 'input_' + property);
		input.setAttribute('name', property);
		input.setAttribute('type', 'text');
		input.setAttribute('class', 'form-control');
		formGroupDiv.appendChild(input);
		
		appendMessage(property, formGroupDiv);
	}
}

function addNumberInputToFormRow(row, colClass, labelString, property, step) {
	// verify
	if (!row || !colClass || !labelString || !property || !step) {
		console.error('addNumberInputToFormRow() error: argument missing');
	} else {
		let inputDiv = document.createElement('div');
		inputDiv.setAttribute('class', colClass);
		row.appendChild(inputDiv);
		
		let formGroupDiv = document.createElement('div');
		formGroupDiv.setAttribute('class', 'form-group');
		inputDiv.appendChild(formGroupDiv);
		
		let label = document.createElement('label');
		label.innerHTML = labelString;
		formGroupDiv.appendChild(label);
		
		let input = document.createElement('input');
		input.setAttribute('id', 'input_' + property);
		input.setAttribute('name', property);
		input.setAttribute('type', 'number');
		input.setAttribute('step', step);
		input.setAttribute('class', 'form-control');
		formGroupDiv.appendChild(input);
		
		appendMessage(property, formGroupDiv);
	}
}

function addDateInputToFormRow(row, colClass, labelString, property) {
	// verify
	if (!row || !colClass || !labelString || !property) {
		console.error('addDateInputToFormRow() error: argument missing');
	} else {
		let inputDiv = document.createElement('div');
		inputDiv.setAttribute('class', colClass);
		row.appendChild(inputDiv);
		
		let formGroupDiv = document.createElement('div');
		formGroupDiv.setAttribute('class', 'form-group');
		inputDiv.appendChild(formGroupDiv);
		
		let label = document.createElement('label');
		label.innerHTML = labelString;
		formGroupDiv.appendChild(label);
		
		let input = document.createElement('input');
		input.setAttribute('id', 'input_date');
		input.setAttribute('name', 'date');
		input.setAttribute('type', 'date');
		input.setAttribute('class', 'form-control');
		formGroupDiv.appendChild(input);
		
		// set today's date as default
		let today = new Date();
		let todayValue = '';
		todayValue += today.getFullYear() + '-';
		todayValue += (today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1));
		todayValue += '-';
		todayValue += (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
		input.setAttribute('value', todayValue);
		
		appendMessage(property, formGroupDiv);
	}
}

function appendMessage(property, formGroupDiv) {
	let messageDiv = document.createElement('div');
	messageDiv.setAttribute('class', 'text-center');
	formGroupDiv.appendChild(messageDiv);
	
	let colorPallete = document.createElement('div');
	colorPallete.setAttribute('class', 'color-palette-set');
	messageDiv.appendChild(colorPallete);
	
	let innerDiv = document.createElement('div');
	innerDiv.setAttribute('class', 'bg-danger color-palette');
	messageDiv.appendChild(innerDiv);
	
	let message = document.createElement('span');
	message.setAttribute('id', '' + property + '_message');
	innerDiv.appendChild(message);
}

function toggleMessage(property, string, enable) {
	let message = document.getElementById('' + property + '_message');
	if (!message) {
		console.error('addMessage(): id input_' + property + 'could not be found');
	} else {
		if (enable) {
			message.textContent = string;
		} else {
			message.textContent = '';
		}
		
	}
}

function validateForm(action, eventForm) {
	let obj = {};
	let valid = true;
	
	if (!action || !eventForm) {
		console.error('validateForm() error: argument missing');
		valid = false;
	} else {
		// Type
		if (!eventForm.type.value || eventForm.type.value == '') {
			toggleMessage('type', 'REQUIRED', true);
			valid = false;
		} else {
			toggleMessage('type', '', false);
			obj.type = eventForm.type.value;
		}
		// Title
		if (eventForm.title.value) {
			obj.title = eventForm.title.value;
		}
		// Date
		if (eventForm.date.value) {
			obj.date = stringToDate(eventForm.date.value);
		}
		// Time
		if (eventForm.time.value) {
			let time = stringToTime(eventForm.time.value, eventForm.time);
			if (time != null) {
				obj.time = time;
			} else {
				valid = false;
			}
		}
		// Time Moving
		if (eventForm.timeMoving.value) {
			let time = stringToTime(eventForm.timeMoving.value, eventForm.timeMoving);
			if (time != null) {
				obj.timeMoving = time;
			} else {
				valid = false;
			}
		}
		// Time Elapsed
		if (eventForm.timeElapsed.value) {
			let time = stringToTime(eventForm.timeElapsed.value, eventForm.timeElapsed);
			if (time != null) {
				obj.timeElapsed = time;
			} else {
				valid = false;
			}
		}
		// Average Pace
		if (eventForm.paceAvg.value) {
			let time = stringToTime(eventForm.paceAvg.value, eventForm.paceAvg);
			if (time != null) {
				obj.paceAvg = time;
			} else {
				valid = false;
			}
		}
		// Distance
		if (eventForm.distance.value) {
			obj.distance = eventForm.distance.value;
			let num = validatePositiveNumber(eventForm.distance.value, eventForm.distance, false);
			if (num != null) {
				obj.distance = num;
			} else {
				valid = false;
			}
		}
		// Aerobic TE
		if (eventForm.aerobicTe.value) {
			obj.aerobicTe = eventForm.aerobicTe.value;
			let num = validatePositiveNumber(eventForm.aerobicTe.value, eventForm.aerobicTe, false);
			if (num != null) {
				obj.aerobicTe = num;
			} else {
				valid = false;
			}
		}
		// Calories
		if (eventForm.calories.value) {
			obj.calories = eventForm.calories.value;
			let num = validatePositiveNumber(eventForm.calories.value, eventForm.calories, true);
			if (num != null) {
				obj.calories = num;
			} else {
				valid = false;
			}
		}
		// Average Heartrate
		if (eventForm.hrAvg.value) {
			obj.hrAvg = eventForm.hrAvg.value;
			let num = validatePositiveNumber(eventForm.hrAvg.value, eventForm.hrAvg, true);
			if (num != null) {
				obj.hrAvg = num;
			} else {
				valid = false;
			}
		}
		// Maximum Heartrate
		if (eventForm.hrMax.value) {
			obj.hrMax = eventForm.hrMax.value;
			let num = validatePositiveNumber(eventForm.hrMax.value, eventForm.hrMax, true);
			if (num != null) {
				obj.hrMax = num;
			} else {
				valid = false;
			}
		}
		// Average Run Cadence
		if (eventForm.runCadenceAvg.value) {
			obj.runCadenceAvg = eventForm.runCadenceAvg.value;
			let num = validatePositiveNumber(eventForm.runCadenceAvg.value, eventForm.runCadenceAvg, true);
			if (num != null) {
				obj.runCadenceAvg = num;
			} else {
				valid = false;
			}
		}
		// Maximum Run Cadence
		if (eventForm.runCadenceMax.value) {
			let num = validatePositiveNumber(eventForm.runCadenceMax.value, eventForm.runCadenceMax, true);
			if (num != null) {
				obj.runCadenceMax = num;
			} else {
				valid = false;
			}
		}
		// Ascent
		if (eventForm.ascent.value) {
			let num = validatePositiveNumber(eventForm.ascent.value, eventForm.ascent, true);
			if (num != null) {
				obj.ascent = num;
			} else {
				valid = false;
			}
		}
		// Descent
		if (eventForm.descent.value) {
			let num = validatePositiveNumber(eventForm.descent.value, eventForm.descent, true);
			if (num != null) {
				obj.descent = num;
			} else {
				valid = false;
			}
		}
		// Minimum Elevation
		if (eventForm.elevationMin.value) {
			let num = validatePositiveNumber(eventForm.elevationMin.value, eventForm.elevationMin, true);
			if (num != null) {
				obj.elevationMin = num;
			} else {
				valid = false;
			}
		}
		// Maximum Elevation
		if (eventForm.elevationMax.value) {
			let num = validatePositiveNumber(eventForm.elevationMax.value, eventForm.elevationMax, true);
			if (num != null) {
				obj.elevationMax = num;
			} else {
				valid = false;
			}
		}
		
		// ID (no validation needed, not user set);
		if (eventForm.id.value) {
			obj.id = eventForm.id.value;
		}
		
		if (valid) {
			if (action == 'create') {
				createEvent(obj);
			}
			if (action == 'update') {
				updateEvent(obj);
			}
			if (action == 'delete') {
				deleteEvent(obj);
			}
		}
	}
}

function validatePositiveNumber(number, element, isInt) {
	// disable any current message
	toggleMessage(element.name, '', false);
	
	//validate
	if (isNaN(number)) {
		toggleMessage(element.name, 'MUST BE A NUMBER', true);
		return null;
	}
	if (number < 0) {
		toggleMessage(element.name, 'MUST BE > 0', true);
		return null;
	}
	if (!isInt && number.split('.').length > 2) {
		toggleMessage(element.name, 'MAX OF 1 DECIMAL ALLOWED', true);
		return null;
	}
	if (isInt && number.split('.').length != 1) {
		toggleMessage(element.name, 'MUST BE A WHOLE NUMBER', true);
		return null;
	}
	return number;
}

function stringToTime(string, element) {
	// disable any current message
	toggleMessage(element.name, '', false);
	
	//validate
	let arr = element.value.split(':')
	if (arr.length != 3) {
		toggleMessage(element.name, 'MUST BE HRS:MIN:SEC FORMAT', true);
		return null;
	} else {
		for (let part of arr) {
			if (isNaN(part)) {
				toggleMessage(element.name, 'ONLY WHOLE NUMBERS ALLOWED', true);
				return null;
			}
			if (part.length < 1 || part.length > 2) {
				toggleMessage(element.name, 'EACH PART MUST BE 1-2 DIGITS', true);
				return null;
			}
			if (part.split('.').length > 1) {
				toggleMessage(element.name, 'NO DECIMALS PERMITTED', true);
				return null;
			}
			if (part < 0) {
				error.textContent = '';
				toggleMessage(element.name, 'CANNOT BE < 0', true);
				return null;
			}
		}
		if (arr[1] > 59 || arr[2] > 59) {
			toggleMessage(element.name, 'MIN AND SEC MUST BE < 59', true);
			return null;
		}
	}
	
	//finally, add 0 before values
	let redo = false;
	string = '';
	for (let part of arr) {
		if (part < 10) {
			string += '0' + part;
		} else {
			string += part;
		}
		if (part != arr[2]) {
			string += ':';
		}
	}
	
	return string;
}

function stringToDate(string) {
	// Desired format: 2022-04-03T15:12:06
	return string + 'T00:00:00';
}

// ----------------------------------
// ------------- TABLE --------------
// ----------------------------------

function buildTable() {
	removeCol9Divs();
	
	// containers
	let tableCol9Div = document.createElement('div');
	tableCol9Div.setAttribute('id', 'tableCol9Div');
	tableCol9Div.setAttribute('class', 'col-9');
	appendChildToElementWithId(tableCol9Div, 'mainRowDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div
	
	let tableCardDiv = document.createElement('div');
	tableCardDiv.setAttribute('id', 'tableCardDiv');
	tableCardDiv.setAttribute('class', 'card');
	appendChildToElementWithId(tableCardDiv, 'tableCol9Div');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv
	
	let tableCardBodyDiv = document.createElement('div');
	tableCardBodyDiv.setAttribute('id', 'tableCardBodyDiv');
	tableCardBodyDiv.setAttribute('class', 'card-body');
	appendChildToElementWithId(tableCardBodyDiv, 'tableCardDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv
	
	// eventsTable
	let eventsTable = document.createElement('table');
	eventsTable.setAttribute('id', 'eventsTable');
	eventsTable.setAttribute('class', 'table table-bordered table-hover');
	appendChildToElementWithId(eventsTable, 'tableCardBodyDiv');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable
	
	let eventsTableHead = document.createElement('thead');
	eventsTableHead.setAttribute('id', 'eventsTableHead');
	appendChildToElementWithId(eventsTableHead, 'eventsTable');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead
	
	let eventsTableHeadTr = document.createElement('tr');
	eventsTableHeadTr.setAttribute('id', 'eventsTableHeadTr');
	appendChildToElementWithId(eventsTableHeadTr, 'eventsTableHead');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead.eventsTableHeadTr
	
	addTableRowHeader('Date');
	addTableRowHeader('Distance');
	addTableRowHeader('Average Pace');
	addTableRowHeader('Time');
	addTableRowHeader('Time Moving');
	addTableRowHeader('Time Elapsed');
	addTableRowHeader('Ascent');
	addTableRowHeader('Descent');
	addTableRowHeader('Calories');
	
	let eventsTableBody = document.createElement('tbody');
	eventsTableBody.setAttribute('id', 'eventsTableBody');
	appendChildToElementWithId(eventsTableBody, 'eventsTable');
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableBody
	// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableBody.#
}

function addTableRowHeader(string) {
	//verify
	if (!document.getElementById('eventsTable')) {
		console.error('addTableRowHeader(): eventsTable could not be found');
	} else if (!string) {
		console.error('addTableRowHeader(): string is missing');
	} else if (typeof string != 'string') {
		console.error('addTableRowHeader(): string is not of type "string"');
	} else {
		let numTableRowHeaders = document.getElementById('eventsTableHeadTr').children.length;
		let th = document.createElement('th');
		th.setAttribute('id', numTableRowHeaders + 1);
		th.textContent = string;
		appendChildToElementWithId(th, 'eventsTableHeadTr');
		// bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead.eventsTableHeadTr.th
	}
}

function populateTable(events) {
	if (!events || events.length == 0) {
		console.error('populateTable(): events is empty');
	} else {
		for (let event of events) {
			// create row for each event with id = event.id
			let tr = document.createElement('tr');
			tr.id = event.id;
			tr.name = 'event_id_' + event.id;
			appendChildToElementWithId(tr, 'eventsTableBody');
			
			let data = [];
			let date = new Date(event.date);
			let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			
			data.push(date.getFullYear() + '-' + months[date.getMonth()] + '-' + date.getDate());
			data.push(event.distance);
			data.push(event.paceAvg);
			data.push(event.time);
			data.push(event.timeMoving);
			data.push(event.timeElapsed);
			data.push(event.ascent);
			data.push(event.descent);
			data.push(event.calories);
			
			for (let item of data) {
				let td = document.createElement('td');
				td.textContent = item;
				td.style.textAlign = 'center';
				tr.appendChild(td);
			}
			
			tr.addEventListener('click', function(e) {
				getEventById(e.target.parentElement.id);
			});
		}
	}
	addBodyScript('js/table.js');
}

// ----------------------------------
// ------------ LOADING ------------
// ----------------------------------

function isLoading(status) {
	if (!status) {
		let outerDiv = document.getElementById('loadingDiv');
		document.body.removeChild(outerDiv);
	} else {
		let outerDiv = document.createElement('div');
		outerDiv.id = 'loadingDiv';
		outerDiv.style.width = '100%';
		outerDiv.style.height = '100%';
		outerDiv.style.backgroundColor = 'FFFFFF;'
		outerDiv.style.opacity = .5;
		outerDiv.style.left = 0;
		outerDiv.style.top = 0;
		outerDiv.style.position = 'absolute';
		document.body.insertBefore(outerDiv, document.getElementById('topDiv'));
		
		let innerDiv = document.createElement('div');
		innerDiv.style.height = 0;
		//innerDiv.style.paddingBottom = '66.66666666666666%';
		innerDiv.style.position = 'relative';
		innerDiv.style.left = '35%';
		innerDiv.style.top = '10%';
		outerDiv.style.opacity = 1;
		innerDiv.style.width = '30%';
		innerDiv.style.height = '30%';
		outerDiv.appendChild(innerDiv);
		
		let loadingGif = document.createElement('img');
		loadingGif.setAttribute('src', 'https://c.tenor.com/6BEPKJHz8-cAAAAd/lag-is-real-lag.gif');
		loadingGif.style.height = '100%';
		loadingGif.style.width = '100%';
		innerDiv.appendChild(loadingGif);
	}
}

// ----------------------------------
// ------------ OVERVIEW ------------
// ----------------------------------

function setOverview() {
	removeAllOverviewListItems();
	
	getCount();
	getTotalDistance();
	getTotalCalories();
	getYearCounts(2012, 2025);
}


// ----------------------------------
// -------------- DATA --------------
// ----------------------------------

var getEvents = function getEvents() {
	isLoading(true);
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/index', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let events = JSON.parse(xhr.responseText);
				
				buildTable();
				/*if (!templateScriptsAdded) {
					addTemplateScripts();
				}*/
				populateTable(events);
				isLoading(false);
				
			} else {
				isLoading(false);
				console.error('getEvents(): Events not found');
			}
		} 
	}
	xhr.send();
}

function createEvent(eventToCreate) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/create', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 201) {
				let newEvent = JSON.parse(xhr.responseText);
				setOverview();
				getEventById(newEvent.id);
			} else {
				console.error('createEvent(): Event not created');
			}
		} 
	}
	xhr.send(JSON.stringify(eventToCreate));
}

function getEventById(id) {
	isLoading(true);
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/' + id, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let event = JSON.parse(xhr.responseText);
				isLoading(false);
				updateForm(event);
			} else {
				isLoading(false);
			}
		} 
	}
	xhr.send();
}

function deleteEvent(event) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/delete/' + event.id, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				afterDelete();
			} else {
				console.error('Event not deleted');
			}
		} 
	}
	xhr.send();
}

function getCount() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/count' );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			addOverviewListItem('Total Events:', xhr.responseText);
		}
	}
	xhr.send();
}

function getYearCounts(low, high) {
	isLoading(true);
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/search/yearcounts/' + low + '/' + high);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let map = new Map();
				map = JSON.parse(xhr.responseText);
				isLoading(false);
				for (year in map) {
					if (map[year]) {
						if (map[year] > 0) {
							addOverviewListItem('Events in ' + year, map[year]);
						}
					}
				}
			} else {
				console.error('getDates() error');
			}
		}
	}
	xhr.send();
}

function getTotalDistance() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/total/distance' );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			addOverviewListItem('Total Distance:', xhr.responseText);
		}
	}
	xhr.send();
}

function getTotalCalories() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/total/calories' );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			addOverviewListItem('Total Calories:', xhr.responseText);
		}
	}
	xhr.send();
}

function getTotalTime() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/total/time' );
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			addOverviewListItem('Total Time:', xhr.responseText);
		}
	}
	xhr.send();
}





/* BODY elements (ids)
bodyWrapperDiv

// nav
bodyWrapperDiv.navNav
bodyWrapperDiv.navNav.navContainerDiv
bodyWrapperDiv.navNav.navContainerDiv.navLogoLink
bodyWrapperDiv.navNav.navContainerDiv.navLogoLink.navLogoImg
bodyWrapperDiv.navNav.navContainerDiv.navLogoLink.navLogoImg.navLogoSpan
bodyWrapperDiv.navNav.navContainerDiv.navButton
bodyWrapperDiv.navNav.navContainerDiv.navButton.navButtonSpan
bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse
bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl
bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl.nav_link_li_#
bodyWrapperDiv.navNav.navContainerDiv.navbarCollapse.navbarUl.nav_link_#

// main row content
bodyWrapperDiv.contentWrapperDiv
bodyWrapperDiv.contentWrapperDiv.contentSection
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv

// main row overview (left card)
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewImageDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewImageDiv.overviewImage
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewHeader
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewSubtitleP
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewUl
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.overviewColMd3Div.overviewCardDiv.overviewCardBodyDiv.overviewUl.overview_li_#

// main row table (right card)
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead.eventsTableHeadTr
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableHead.eventsTableHeadTr.#
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.tableCol9Div.tableCardDiv.tableCardBodyDiv.eventsTable.eventsTableBody

// main row form (right card)
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.formCardHeaderDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.formCardHeaderDiv.formCardH3
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow1Div
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow1Div.formRow1Input1Div
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow1Div.children
bodyWrapperDiv.contentWrapperDiv.contentSection.contentContainerFluidDiv.mainRowDiv.formCol9Div.formCardDiv.eventForm.formCardBodyDiv.formRow2Div.children




*/





