import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { host } from './DataReciver';


console.log('start kirill')
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

let popup = window.open(`${host}proxy.html`)
popup.blur()
// window.focus()
