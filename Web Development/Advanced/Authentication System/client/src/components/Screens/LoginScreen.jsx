import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			window.location.href = '/';
		}
	}, []);

	const loginHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				'http://localhost:8080/api/auth/login',

				{
					email,
					password,
				},
			);
			console.log(data);
			localStorage.setItem('authToken', data.token);
			localStorage.setItem('userData', JSON.stringify(data.user));
			window.location.href = '/';
		} catch (err) {
			setError(err);
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form
						onSubmit={loginHandler}
						className={styles.form_container}
					>
						<h1>Login to Your Account</h1>
						<input
							type='email'
							placeholder='Email'
							name='email'
							required
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							required
							className={styles.input}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && (
							<div className={styles.error_msg}>{error}</div>
						)}
						<button type='submit' className={styles.red_btn}>
							Login
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to='/register'>
						<button type='button' className={styles.white_btn}>
							Register
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginScreen;
