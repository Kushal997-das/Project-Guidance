import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import PrivateRoute from './components/routing/PrivateRoute';
import EmailVerify from './components/Screens/EmailVerify';
import LoginScreen from './components/Screens/LoginScreen';
import PrivateScreen from './components/Screens/PrivateScreen';
import Profile from './components/Screens/Profile.jsx';
import RegisterScreen from './components/Screens/RegisterScreen';

function App() {
	return (
		<Routes>
			<Route
				exact
				path='/'
				element={
					<PrivateRoute>
						<PrivateScreen />
					</PrivateRoute>
				}
			/>

			<Route exact path='/login' element={<LoginScreen />} />
			<Route exact path='/register' element={<RegisterScreen />} />
			<Route path='users/:id/verify/:token' element={<EmailVerify />} />
			<Route
				exact
				path='/profile'
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}

export default App;
