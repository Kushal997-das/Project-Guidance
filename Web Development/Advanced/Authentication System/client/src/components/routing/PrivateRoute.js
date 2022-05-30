import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
	const auth = localStorage.getItem('authToken');
	return auth ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
