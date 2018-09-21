import React from "react";
import {AdminRoute, CustomerRoute, PublicRoute} from "./Component/Common/Routes"
import Login  from "./Component/Common/Login";
import {NotFound} from "./Component/Common/NotFound";
import {CustomerPanel} from "./Component/Customer/CustomerPanel";
import {AdminPanel} from "./Component/Admin/AdminPanel.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
	BrowserRouter,
	Switch
} from 'react-router-dom'

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<PublicRoute exact path="/" key="root" component={Login}/>
					<PublicRoute exact path="/login" key="login" component={Login}/>
					<AdminRoute  path="/admin" key="admin" component={AdminPanel}/>
					<CustomerRoute  path="/customer" key="customer" component={CustomerPanel}/>
					<PublicRoute component={NotFound}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
