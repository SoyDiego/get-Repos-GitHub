import React, { useState } from "react";
import Error from "./Error";
import styled from "@emotion/styled";

const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	width: 50%;
	padding: 1.5rem 0;
`;

const Input = styled.input`
	width: 100%;
	margin-right: 2rem;
	text-align: center;
	padding: 1rem;
	border: none;
	color: #ffffff;
	border-bottom: 2px solid #ffffff;
	background-color: transparent;
`;

const Button = styled.button`
	background-color: #ffffff;
	border: none;
	text-transform: uppercase;
	font-weight: bold;
	padding: 0.5rem 1.5rem;
`;

const Form = ({ setDataApi, setDataApiRepos, dataApiRepos }) => {
	const [info, setInfo] = useState({
		user: "",
	});

	const [error, setError] = useState({
		active: false,
		message: "",
	});

	const inputUser = (e) => {
		setInfo({
			[e.target.name]: e.target.value,
		});
	};

	const { user } = info;
	const { active, message } = error;

	const handleForm = (e) => {
		e.preventDefault();

		//Validamos
		if (user === "") {
			//Mostramos error
			setError({
				active: true,
				message: "User is required.",
			});
			return;
		}
		setError({
			active: false,
			message: "",
		});

		//Llamamos a la API
		(async () => {
			const json = await fetch("https://api.github.com/users/" + user);
			const data = await json.json();

			if (data.message === "Not Found") {
				setError({
					active: true,
					message: user + " does not exist.",
				});
				return;
			}

			setError({
				active: false,
				message: "",
			});

			setDataApi({
				avatar: data.avatar_url,
				bio: data.bio,
				name: data.name,
				username: data.login,
			});

			(async () => {
				const json = await fetch(
					"https://api.github.com/users/" + user + "/repos?sort=created"
				);
                const data = await json.json();
                
				setDataApiRepos(data)
			})();
		})();
	};
	return (
		<>
			<FormContainer onSubmit={handleForm}>
				<Input
					type="text"
					name="user"
					placeholder="Search GitHub user..."
					onChange={inputUser}
				/>

				<Button type="submit">Search</Button>
			</FormContainer>

			{active ? <Error message={message}></Error> : null}
		</>
	);
};
export default Form;
