import React from "react";
import {
	Route,
	Redirect
} from 'react-router-dom'
import Auth from './Auth';
import PublicLayout from './PublicLayout.js'


export const PublicRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props =>
			<PublicLayout>
				<Component {...props} />
			</PublicLayout>
		}
	/>
);

export const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() && Auth.getUserType() === "admin" ? (
        	<Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export const CustomerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated() && Auth.getUserType() === "customer" ? (
        	<Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
