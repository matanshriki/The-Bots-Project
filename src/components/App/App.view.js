import React from 'react';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';

import TopBar from '../TopBar'; 
import Welcome from '../Welcome'; 
import Browse from '../Browse/Browse.view'; 
import Create from '../Create/Create.view'; 

import Links from '../Links';

const App = ()=> (
        <BrowserRouter>   
            <div className="main-app">
                <TopBar><Links /></TopBar>
                <Route exact path="/" render={ ()=>  <Welcome />  }/>
                <Route path="/browse" component={Browse}></Route>
		        <Route path="/create" component={Create}></Route>
            </div>
        </BrowserRouter>
)
export default App