import React from 'react';
import ReactDOM from 'react-dom';

import Application from 'application.jsx';

import 'style.css';

function start() {
	ReactDOM.render(
		<Application/>,
		document.getElementById('application')
	);
}

start();
