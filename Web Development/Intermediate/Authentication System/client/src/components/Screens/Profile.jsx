import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
	VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
function Profile() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userData'));
		setFirstName(userData.firstName);
		setLastName(userData.lastName);
		setUserName(userData.userName);
		setEmail(userData.email);
		setContact(userData.contactNumber);
	}, []);

	const updateHandler = async (e) => {
		e.preventDefault();
		const userData = JSON.parse(localStorage.getItem('userData'));
		const updatedProfile = {
			_id: userData._id,
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			contactNumber: parseInt(contact),
		};

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data: res } = await axios.post(
				'http://localhost:8080/api/profile/updateprofile',
				{
					updatedProfile,
				},
				config,
			);
			console.log(res.message);
			localStorage.setItem('userData', JSON.stringify(res.user));

			alert('Profile Updated Successfully');
		} catch (error) {
			console.log(error);
		}
	};

	//get user
	return (
		<>
			<Flex>
				<VStack
					w='100%'
					h='100%'
					align='center'
					justify='center'
					p='100px'
				>
					<Text
						fontSize='2xl'
						textAlign='center'
						fontWeight='semibold'
					>
						MY PROFILE
					</Text>

					<FormControl
						width='50%'
						margin='auto'
						marginBottom={3}
						isRequired
					>
						<FormLabel mt={2} htmlFor='name'>
							First Name
						</FormLabel>
						<Input
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							placeholder='First Name'
						/>
						<FormLabel mt={2} htmlFor='name'>
							Last Name
						</FormLabel>
						<Input
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							placeholder='Last Name'
						/>
						<FormLabel mt={2} htmlFor='name'>
							User Name
						</FormLabel>
						<Input
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
							}}
							placeholder='User Name'
						/>
						<FormLabel mt={2} htmlFor='name'>
							Email
						</FormLabel>
						<Input
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder='Email'
						/>
						<FormLabel mt={2} htmlFor='name'>
							Contact no
						</FormLabel>
						<Input
							value={contact}
							onChange={(e) => {
								setContact(e.target.value);
							}}
							placeholder='Contact no'
						/>

						<Button onClick={updateHandler} marginTop={3}>
							Update Profile
						</Button>
					</FormControl>
				</VStack>
			</Flex>
		</>
	);
}

export default Profile;
