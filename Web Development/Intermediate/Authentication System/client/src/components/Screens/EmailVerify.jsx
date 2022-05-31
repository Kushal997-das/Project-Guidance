import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import success from '../../images/success.png';
import styles from './Email.module.css';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const { id, token } = useParams();

	useEffect(() => {
		return async () => {
			if (id && token) {
				const url = `http://localhost:8080/api/auth/${id}/verify/${token}`;
				const { data } = await axios.get(url);
				if (data?.success) {
					alert(data?.message);
					setValidUrl(true);
				} else {
					setValidUrl(false);
				}
			}
		};
	}, [id, token]);

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img
						src={success}
						alt='success_img'
						className={styles.success_img}
					/>
					<h1>Email verified successfully</h1>
					<Link to='/login'>
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;
