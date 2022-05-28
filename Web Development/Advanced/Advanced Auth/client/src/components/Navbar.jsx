import React from 'react';
import './Navbar.css';
export default function Navbar() {
	const handleLogout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userData');
		window.location.href = '/';
	};

	const user = localStorage.getItem('userData');
	const userData = JSON.parse(user);
	console.log(user);
	return (
		<nav className='navbar navbar-expand-lg navbar-dark custom-navbar  '>
			<div className='container-fluid'>
				<a className='navbar-brand' href='/'>
					NAVBAR
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item '>
							<div className='dropdown '>
								<a
									className='btn btn-secondary dropdown-toggle custom-navbar nav-text'
									type='button'
									id='dropdownMenuButton1'
									data-bs-toggle='dropdown'
									style={{
										border: '0',
									}}
									href
								>
									{userData.userName}
								</a>
								<ul
									className='dropdown-menu'
									aria-labelledby='dropdownMenuButton1'
								>
									<li>
										<a
											className='dropdown-item'
											href='/profile'
										>
											My Profile
										</a>
									</li>
									<li>
										<a
											className='dropdown-item'
											href
											onClick={handleLogout}
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
