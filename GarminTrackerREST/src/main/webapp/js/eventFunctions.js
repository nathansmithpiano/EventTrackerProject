window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
})

function init() {
	console.log('in init');
	document.title = 'Garmin Events';
	createBody();
}

/*TODO
Update and delete

Once the table is built, if a row is clicked on, a detail view for just that one entity should be displayed. 
You will accomplish this by adding a click event listener to each row of your table.
In the detail view you should have a form giving you the option to edit the entity, and a delete button that 
would delete the current entity and reload the view all view.
Add data aggregation

Once your presentation for CRUD is working, add a function that uses the response data to present the data in 
some other form (For instance, total all of the hours you worked and calculate the amount of money you are owed. 
This would involve retrieving all of the "PunchCard" records, totaling their values, and displaying the total 
multiplied times your hourly rate somewhere on the page.)
*/
function createBody() {
	let topDiv = document.createElement('div');
	topDiv.id = 'topDiv';
	topDiv.style.width = '100%';
	document.body.appendChild(topDiv);
	
	let topLeftDiv = document.createElement('div');
	topLeftDiv.id = 'topLeftDiv';
	topLeftDiv.style.float = 'left';
	topLeftDiv.style.width = '25%';
	topDiv.appendChild(topLeftDiv);
	
	let topRightDiv = document.createElement('div');
	topRightDiv.id = 'topRightDiv';
	topRightDiv.style.float = 'left';
	topRightDiv.style.width = '75%';
	topDiv.appendChild(topRightDiv);
	
	// Top Left Elements
	let h1 = document.createElement('h1');
	h1.id = 'header_h1';
	h1.textContent = "Nathan's Garmin Events";
	topLeftDiv.appendChild(h1);
	
	let newEventButton = document.createElement('button');
	newEventButton.id = 'newEventButton';
	newEventButton.textContent = 'Create New Event';
	topLeftDiv.appendChild(newEventButton);
	
	let allEventsButton = document.createElement('button');
	allEventsButton.id = 'allEventsButton';
	allEventsButton.textContent = 'Show All Events';
	topLeftDiv.appendChild(allEventsButton);
	
	let createEventDiv = document.createElement('div');
	createEventDiv.id = 'createEventDiv';
	topRightDiv.appendChild(createEventDiv);
	
	// All Events div
	let eventsDiv = document.createElement('div');
	eventsDiv.id = 'eventsDiv';
	eventsDiv.style.width = '100%';
	document.body.appendChild(eventsDiv);
	
	createButtonEvents(newEventButton, allEventsButton);
}

function createButtonEvents(newEventButton, allEventsButton) {
	newEventButton.addEventListener('click', function(e) {
		removeEventsTable();
		createEventForm();
	});
	
	allEventsButton.addEventListener('click', function(e) {
		getEvents();
		removeEventForm();
	});
}

function createEventForm() {
	removeEventForm();
	removeFormButtons();
	
	// Outer div
	let createEventDiv = document.getElementById('createEventDiv');
	
	// Inner div
	let createEventInnerDiv = document.createElement('div');
	createEventInnerDiv.id = 'createEventInnerDiv';
	createEventDiv.appendChild(createEventInnerDiv);
	
	// Form header
	let formHeaderDiv = document.createElement('div');
	formHeaderDiv.style.width = '100%';
	formHeaderDiv.style.textAlign = 'center';
	createEventInnerDiv.appendChild(formHeaderDiv);
	
	let formHeader = document.createElement('h2');
	formHeader.id = 'eventFormHeader';
	formHeader.textContent = 'Create New Event';
	formHeaderDiv.appendChild(formHeader);
	
	// Form
	let eventForm = document.createElement('form');
	eventForm.id = 'eventForm';
	createEventInnerDiv.appendChild(eventForm);
	
	// Table Layout
	let formTable = document.createElement('table');
	formTable.width = '100%';
	eventForm.appendChild(formTable);
	
	// Settings 
	let numRows = 9;
	let numCols = 4;
	let labelWidth = '15%';
	let textWidth = '85%';
	
	for (let i = 1; i <= numRows; i++) {
		let tr = document.createElement('tr');
		tr.className = 'formRow';
		tr.id = 'row' + i;
		
		for (let j = 1; j <= numCols; j++) {
			let td = document.createElement('td');
			td.id = 'col' + j;
			td.className = 'formCol';
			if (j % 2 != 0) {
				// Odd
				td.style.width = labelWidth;
			}
			tr.appendChild(td);
		}
		formTable.appendChild(tr);
	}
	
	// Array to hold all inputs
	let data = [];
	
	// Type
	let type = document.createElement('input');
	type.type = 'text';
	type.name = 'type';
	type.style.width = textWidth;
	let typeDiv = document.createElement('div');
	typeDiv.id = 'typeDiv';
	typeDiv.textContent = 'Type:';
	typeDiv.style.float = 'right';
	data.push(typeDiv);
	data.push(type);
	
	// Reused today's date format
	let today = new Date();
	let todayValue = '';
	todayValue += today.getFullYear() + '-';
	todayValue += (today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1));
	todayValue += '-';
	todayValue += (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
	
	// Date
	let date = document.createElement('input');
	date.type = 'date';
	date.name = 'date';
	date.value = todayValue;
	date.min = '1988-02-19';
	date.max = '2022-12-31';
	type.style.width = textWidth;
	let dateDiv = document.createElement('div');
	dateDiv.id = 'dateDiv';
	dateDiv.textContent = 'Date:';
	dateDiv.style.float = 'right';
	data.push(dateDiv);
	data.push(date);
	
	// Title
	let title = document.createElement('input');
	title.type = 'text';
	title.name = 'title';
	title.style.width = textWidth;
	let titleDiv = document.createElement('div');
	titleDiv.id = 'titleDiv';
	titleDiv.textContent = 'Title:';
	titleDiv.style.float = 'right';
	data.push(titleDiv);
	data.push(title);
	
	// Time
	let time = document.createElement('input');
	time.type = 'text';
	time.name = 'time';
	time.style.width = textWidth;
	let timeDiv = document.createElement('div');
	timeDiv.id = 'timeDiv';
	timeDiv.textContent = 'Time:';
	timeDiv.style.float = 'right';
	data.push(timeDiv);
	data.push(time);
	
	// Distance
	let distance = document.createElement('input');
	distance.type = 'number';
	distance.step = '.01';
	distance.min = 0;
	distance.name = 'distance';
	distance.style.width = textWidth;
	let distanceDiv = document.createElement('div');
	distanceDiv.id = 'distanceDiv';
	distanceDiv.textContent = 'Dist (mi):';
	distanceDiv.style.float = 'right';
	data.push(distanceDiv);
	data.push(distance);
	
	// Time Moving
	let timeMoving = document.createElement('input');
	timeMoving.type = 'text';
	timeMoving.name = 'timeMoving';
	timeMoving.style.width = textWidth;
	let timeMovingDiv = document.createElement('div');
	timeMovingDiv.id = 'timeMovingDiv';
	timeMovingDiv.textContent = 'Time Moving:';
	timeMovingDiv.style.float = 'right';
	data.push(timeMovingDiv);
	data.push(timeMoving);
	
	// Calories
	let calories = document.createElement('input');
	calories.type = 'number';
	calories.step = '1';
	calories.min = 0;
	calories.name = 'calories';
	calories.style.width = textWidth;
	let caloriesDiv = document.createElement('div');
	caloriesDiv.id = 'caloriesDiv';
	caloriesDiv.textContent = 'Calories:';
	caloriesDiv.style.float = 'right';
	data.push(caloriesDiv);
	data.push(calories);
	
	// Time Elapsed
	let timeElapsed = document.createElement('input');
	timeElapsed.type = 'text';
	timeElapsed.name = 'timeElapsed';
	timeElapsed.style.width = textWidth;
	let timeElapsedDiv = document.createElement('div');
	timeElapsedDiv.id = 'timeElapsedDiv';
	timeElapsedDiv.textContent = 'Time Elapsed:';
	timeElapsedDiv.style.float = 'right';
	data.push(timeElapsedDiv);
	data.push(timeElapsed);
	
	// Ascent
	let ascent = document.createElement('input');
	ascent.type = 'number';
	ascent.step = '1';
	ascent.min = 0;
	ascent.name = 'ascent';
	ascent.style.width = textWidth;
	let ascentDiv = document.createElement('div');
	ascentDiv.id = 'ascentDiv';
	ascentDiv.textContent = 'Ascent:';
	ascentDiv.style.float = 'right';
	data.push(ascentDiv);
	data.push(ascent);
	
	// Average Pace
	let paceAvg = document.createElement('input');
	paceAvg.type = 'text';
	paceAvg.name = 'paceAvg';
	paceAvg.style.width = textWidth;
	let paceAvgDiv = document.createElement('div');
	paceAvgDiv.id = 'paceAvgDiv';
	paceAvgDiv.textContent = 'Average Pace:';
	paceAvgDiv.style.float = 'right';
	data.push(paceAvgDiv);
	data.push(paceAvg);
	
	// Descent
	let descent = document.createElement('input');
	descent.type = 'number';
	descent.step = '1';
	descent.min = 0;
	descent.name = 'descent';
	descent.style.width = textWidth;
	let descentDiv = document.createElement('div');
	descentDiv.id = 'descentDiv';
	descentDiv.textContent = 'Descent:';
	descentDiv.style.float = 'right';
	data.push(descentDiv);
	data.push(descent);
	
	// Aerobic TE
	let aerobicTe = document.createElement('input');
	aerobicTe.type = 'number';
	aerobicTe.step = '.01';
	aerobicTe.min = 0;
	aerobicTe.name = 'aerobicTe';
	aerobicTe.style.width = textWidth;
	let aerobicTeDiv = document.createElement('div');
	aerobicTeDiv.id = 'aerobicTeDiv';
	aerobicTeDiv.textContent = 'Aerobic TE:';
	aerobicTeDiv.style.float = 'right';
	data.push(aerobicTeDiv);
	data.push(aerobicTe);
	
	// Minimum Elevation
	let elevationMin = document.createElement('input');
	elevationMin.type = 'number';
	elevationMin.step = '1';
	elevationMin.min = 0;
	elevationMin.name = 'elevationMin';
	elevationMin.style.width = textWidth;
	let elevationMinDiv = document.createElement('div');
	elevationMinDiv.id = 'elevationMinDiv';
	elevationMinDiv.textContent = 'Elevation (min):';
	elevationMinDiv.style.float = 'right';
	data.push(elevationMinDiv);
	data.push(elevationMin);
	
	// Average Heart Rate 
	let hrAvg = document.createElement('input');
	hrAvg.type = 'number';
	hrAvg.step = '1';
	hrAvg.min = 0;
	hrAvg.name = 'hrAvg';
	hrAvg.style.width = textWidth;
	let hrAvgDiv = document.createElement('div');
	hrAvgDiv.id = 'hrAvgDiv';
	hrAvgDiv.textContent = 'Heartrate (avg):';
	hrAvgDiv.style.float = 'right';
	data.push(hrAvgDiv);
	data.push(hrAvg);
	
	// Maximum Elevation
	let elevationMax = document.createElement('input');
	elevationMax.type = 'number';
	elevationMax.step = '1';
	elevationMax.min = 0;
	elevationMax.name = 'elevationMax';
	elevationMax.style.width = textWidth;
	let elevationMaxDiv = document.createElement('div');
	elevationMaxDiv.id = 'elevationMaxDiv';
	elevationMaxDiv.textContent = 'Elevation (max):';
	elevationMaxDiv.style.float = 'right';
	data.push(elevationMaxDiv);
	data.push(elevationMax);
	
	// Max Heart Rate 
	let hrMax = document.createElement('input');
	hrMax.type = 'number';
	hrMax.step = '1';
	hrMax.min = 0;
	hrMax.name = 'hrMax';
	hrMax.style.width = textWidth;
	let hrMaxDiv = document.createElement('div');
	hrMaxDiv.id = 'hrMaxDiv';
	hrMaxDiv.textContent = 'Heartrate (max):';
	hrMaxDiv.style.float = 'right';
	data.push(hrMaxDiv);
	data.push(hrMax);
	
	// Average Run Cadence
	let runCadenceAvg = document.createElement('input');
	runCadenceAvg.type = 'number';
	runCadenceAvg.step = '1';
	runCadenceAvg.min = 0;
	runCadenceAvg.name = 'runCadenceAvg';
	runCadenceAvg.style.width = textWidth;
	let runCadenceAvgDiv = document.createElement('div');
	runCadenceAvgDiv.id = 'runCadenceAvgDiv';
	runCadenceAvgDiv.textContent = 'Run Candence (avg):';
	runCadenceAvgDiv.style.float = 'right';
	data.push(runCadenceAvgDiv);
	data.push(runCadenceAvg);
	
	// Maximum Run Cadence
	let runCadenceMax = document.createElement('input');
	runCadenceMax.type = 'number';
	runCadenceMax.step = '1';
	runCadenceMax.min = 0;
	runCadenceMax.name = 'runCadenceMax';
	runCadenceMax.style.width = textWidth;
	let runCadenceMaxDiv = document.createElement('div');
	runCadenceMaxDiv.id = 'runCadenceMaxDiv';
	runCadenceMaxDiv.textContent = 'Run Candence (max):';
	runCadenceMaxDiv.style.float = 'right';
	data.push(runCadenceMaxDiv);
	data.push(runCadenceMax);
	
	// Place data and quasi-labels in table
	let rows = document.getElementsByClassName('formRow');
	for(let row of rows) {
		let cols = row.getElementsByClassName('formCol');
		for (let col of cols) {
			col.appendChild(data.shift());
		}
	}
	
	// Create Submit button
	let formButtonsDiv = document.createElement('div');
	formButtonsDiv.id = 'formButtonsDiv';
	formButtonsDiv.style.width = '100%';
	formButtonsDiv.style.paddingTop = '10px';
	formButtonsDiv.style.textAlignLast = 'center';
	let submitButton = document.createElement('button');
	submitButton.id = 'submitButton';
	submitButton.textContent = 'Add Event';
	submitButton.style.float = 'center';
	formButtonsDiv.appendChild(submitButton);
	createEventDiv.appendChild(formButtonsDiv);
	
	// add Event Listener
	submitButton.addEventListener('click', function(e) { 
		e.preventDefault();
		beginCRUD('create', eventForm);
	});
}

function beginCRUD(option, eventForm) {
	let obj = {};
	let valid = true;
	
	// Type
	if (eventForm.type.value) {
		document.getElementById('typeDiv').style.color = 'black';
		obj.type = eventForm.type.value;
	} else {
		document.getElementById('typeDiv').style.color = 'red';
		eventForm.type.placeholder = 'REQUIRED';
		valid = false;
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
		if (option == 'create') {
			createEvent(obj);
		}
		if (option == 'update') {
			console.log('update, id', obj.id);
			updateEvent(obj);
		}
		if (option == 'delete') {
			deleteEvent(obj);
		}
	}
}

function validatePositiveNumber(number, element, isInt) {
	// remove previous error messages
	if (element.nextSibling) {
		element.parentElement.removeChild(element.nextSibling);
	}
	
	//create new error message
	let value = element.value;
	let error = document.createElement('div');
	error.style.color = 'red';
	element.after(error);
	error.textContent = '';
	
	//validate
	if (isNaN(number)) {
		error.textContent = 'MUST BE A NUMBER';
		return null;
	}
	if (number < 0) {
		error.textContent = 'MUST BE > 0';
		return null;
	}
	if (!isInt && number.split('.').length > 2) {
		error.textContent = 'MAX OF 1 DECIMAL ALLOWED';
		return null;
	}
	if (isInt && number.split('.').length != 1) {
		error.textContent = 'MUST BE A WHOLE NUMBER';
		return null;
	}
	return number;
}

function stringToTime(string, element) {
	// remove previous error messages
	if (element.nextSibling) {
		element.parentElement.removeChild(element.nextSibling);
	}
	
	//create new error message
	let value = element.value;
	let error = document.createElement('div');
	error.style.color = 'red';
	element.after(error);
	error.textContent = '';
	
	//validate
	let arr = value.split(':')
	if (arr.length != 3) {
		error.textContent = 'MUST BE HRS:MIN:SEC FORMAT';
		return null;
	} else {
		for (let part of arr) {
			if (isNaN(part)) {
				error.textContent = 'ONLY WHOLE NUMBERS ALLOWED';
				return null;
			}
			if (part.length < 1 || part.length > 2) {
				error.textContent = 'EACH PART MUST BE 1-2 DIGITS';
				return null;
			}
			if (part.split('.').length > 1) {
				error.textContent = 'NO DECIMALS PERMITTED';
				return null;
			}
			if (part < 0) {
				error.textContent = 'CANNOT BE < 0';
				return null;
			}
		}
		if (arr[1] > 59 || arr[2] > 59) {
			error.textContent = 'MIN AND SEC MUST BE < 59';
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

function removeEventForm() {
	let tempDiv = document.getElementById('createEventDiv');
	if (document.getElementById('createEventInnerDiv')) {
		removeFormButtons();
		tempDiv.removeChild(document.getElementById('createEventInnerDiv'));
	}
}

function removeEventsTable() {
	let tempTable = document.getElementById('eventsTable');
	if (tempTable) {
		tempTable.parentElement.removeChild(tempTable);
	}
}

function createEventsTable() {
	
	let eventsDiv = document.getElementById('eventsDiv');
	
	// Table
	let eventsTable = document.createElement('table');
	eventsTable.id = 'eventsTable';
	eventsTable.style.width = '100%';
	eventsDiv.appendChild(eventsTable);
	
	let thead = document.createElement('thead');
	thead.id = 'thead';
	eventsTable.appendChild(thead);
	
	let tr = document.createElement('tr');
	thead.appendChild(tr);
	
	let headers = [];
	headers.push('Date');
	headers.push('Distance');
	headers.push('Average Pace');
	headers.push('Time');
	headers.push('Time Moving');
	headers.push('Time Elapsed');
	headers.push('Ascent');
	headers.push('Descent');
	headers.push('Calories');
	
	for (let header of headers) {
		let th = document.createElement('th');
		th.textContent = header;
		tr.appendChild(th);
	}
	
	let tbody = document.createElement('tbody');
	tbody.id = 'eventsTableBody';
	eventsTable.appendChild(tbody);
}

function isLoading(status) {
	if (!status) {
		let outerDiv = document.getElementById('loadingDiv');
		document.body.removeChild(outerDiv);
	} else {
		let outerDiv = document.createElement('div');
		outerDiv.id = 'loadingDiv';
		outerDiv.style.width = '100%';
		outerDiv.style.height = '100%';
		outerDiv.style.left = 0;
		outerDiv.style.top = 0;
		outerDiv.style.position = 'absolute';
		document.body.insertBefore(outerDiv, document.getElementById('topDiv'));
		
		let innerDiv = document.createElement('div');
		innerDiv.style.height = 0;
		//innerDiv.style.paddingBottom = '66.66666666666666%';
		innerDiv.style.position = 'relative';
		innerDiv.style.width = '100%';
		innerDiv.style.height = '100%';
		outerDiv.appendChild(innerDiv);
		
		let loadingGif = document.createElement('img');
		loadingGif.setAttribute('src', 'https://c.tenor.com/6BEPKJHz8-cAAAAd/lag-is-real-lag.gif');
		loadingGif.style.height = '100%';
		loadingGif.style.width = '100%';
		innerDiv.appendChild(loadingGif);
	}
}

function createEvent(event) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/create', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 201) {
				let newEvent = JSON.parse(xhr.responseText);
				getEventById(newEvent.id);
			} else {
				console.log('Event not created');
			}
		} 
	}
	xhr.send(JSON.stringify(event));
}

function updateEvent(event) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/update/' + event.id, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let updatedEvent = JSON.parse(xhr.responseText);
				getEventById(updatedEvent.id);
			} else {
				console.log('Event not updated');
			}
		} 
	}
	xhr.send(JSON.stringify(event));
}

function deleteEvent(event) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/delete/' + event.id, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				confirmDeleted(event.id);
			} else {
				confirmDeleted(null);
				console.log('Event not deleted');
			}
		} 
	}
	xhr.send();
}

function confirmDeleted(id) {
	if (id == null) {
		// TODO: update formDiv with removed form and status message
		console.log('not deleted');
	} else {
		// TODO: error message
		console.log('id ' + id + ' deleted');
	}
}

function getEvents() {
	isLoading(true);
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/index', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let events = JSON.parse(xhr.responseText);
				isLoading(false);
				displayEvents(events);
			} else {
				isLoading(false);
				console.log('Events not found');
			}
		} 
	}
	xhr.send();
}

function displayEvents(events) {
	createEventsTable();
	
	let eventsTableBody = document.getElementById('eventsTableBody');
	
	for (let event of events) {
		let tr = document.createElement('tr');
		tr.id = event.id;
		tr.name = 'event_id_' + event.id;
		eventsTableBody.appendChild(tr);
		
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
				setUpdateEventForm(event);
			} else {
				isLoading(false);
				console.log('Events not found');
			}
		} 
	}
	xhr.send();
}

function setUpdateEventForm(event) {
	removeEventsTable();
	
	// show form
	createEventForm();
	
	// change form header
	let formHeader = document.getElementById('eventFormHeader');
	if (formHeader) {
		formHeader.textContent = 'Update Event (id ' + event.id + ')';
	}
	
	let form = document.getElementById('eventForm');
	
	// create hidden input for id (id needed for update or delete)
	let id = document.createElement('input');
	id.name = 'id';
	id.type = 'hidden';
	id.value = event.id
	form.appendChild(id);
	
	// set each property's value into form
	for (let p in event) {
		if (p == 'date') {
			// date is special
			form.date.value = event.date.split('T')[0];
		} else {
			form[p].value = event[p];
		}
	}
	
	// find submitButton
	let submitButton = document.getElementById('submitButton');
	
	// change form buttons
	let formButtonsDiv = document.getElementById('formButtonsDiv');
	// add update button
	let updateButton = document.createElement('button');
	updateButton.id = 'updateButton';
	updateButton.textContent = 'Update';
	updateButton.style.float = 'center';
	submitButton.parentNode.insertBefore(updateButton, submitButton);
	// add delete button
	let deleteButton = document.createElement('button');
	deleteButton.id = 'deleteButton';
	deleteButton.textContent = 'Delete';
	deleteButton.style.float = 'center';
	submitButton.parentNode.insertBefore(deleteButton, submitButton);
	// add reset button
	let resetButton = document.createElement('button');
	resetButton.id = 'resetButton';
	resetButton.textContent = 'Reset';
	resetButton.style.float = 'center';
	submitButton.parentNode.insertBefore(resetButton, submitButton);
	
	// remove submitButton
	submitButton.parentElement.removeChild(submitButton);
	
	// add Event Listeners
	updateButton.addEventListener('click', function(e) { 
		e.preventDefault();
		beginCRUD('update', form);
	});
	deleteButton.addEventListener('click', function(e) { 
		e.preventDefault();
		beginCRUD('delete', form);
	});
	resetButton.addEventListener('click', function(e) { 
		e.preventDefault();
		console.log('reset NOT IMPLEMENTED');
	});
}

function removeFormButtons() {
	let formButtonsDiv = document.getElementById('formButtonsDiv');
	if (formButtonsDiv) {
		let buttonArray = [];
		buttonArray.push(document.getElementById('submitButton'));
		buttonArray.push(document.getElementById('updateButton'));
		buttonArray.push(document.getElementById('deleteButton'));
		buttonArray.push(document.getElementById('resetButton'));
		for (let button of buttonArray) {
			if (button) {
				button.parentElement.removeChild(button);
			}
		}
	}
}



