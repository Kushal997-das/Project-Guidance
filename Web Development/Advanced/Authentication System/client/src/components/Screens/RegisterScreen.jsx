import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterScreen.module.css';

const RegisterScreen = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [msg, setMsg] = useState('');

	const registerHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(
				'http://localhost:8080/api/auth/register',
				{
					firstName,
					lastName,
					userName,
					email,
					password,
				},
				config,
			);
			setMsg(data.message);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<>
			<div className={styles.signup_container}>
				<div className={styles.signup_form_container}>
					<div className={styles.left}>
						<h1>Welcome Back</h1>
						<Link to='/login'>
							<button type='button' className={styles.white_btn}>
								Login
							</button>
						</Link>
					</div>
					<div className={styles.right}>
						<form
							onSubmit={registerHandler}
							className={styles.form_container}
						>
							<h1>Create Account</h1>
							<input
								type='text'
								placeholder='First Name'
								name='firstName'
								required
								className={styles.input}
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Last Name'
								name='lastName'
								required
								className={styles.input}
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								type='text'
								placeholder='User Name'
								name='userName'
								required
								className={styles.input}
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
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
							{msg && (
								<div className={styles.success_msg}>{msg}</div>
							)}
							<button type='submit' className={styles.red_btn}>
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterScreen;
