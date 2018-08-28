import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Menu from './Components/Navigation/Menu'


ReactDOM.render(
    <div className="app">
        <div className={"menu"}>
            <Menu />
        </div>
    </div>, 
    document.getElementById('root')
);
registerServiceWorker();
