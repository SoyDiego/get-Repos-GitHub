import React, { useState } from "react";
import Form from "./components/Form";
import styled from "@emotion/styled";

const Container = styled.div`
	max-width: 50%;
	color: white;
	text-align: center;
	background-color: #555555;
	border: 0.4rem solid #777777;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ContainerProfile = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1rem 0;
`;
const ContainerInfo = styled.div`
	color: white;
	width: 40%;
`;

const ContainerRepos = styled.div`
	width: 90%;
`;

const Repo = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 2rem;
	border-bottom: 1px solid #ffffff;
`;
const Icons = styled.div`
	display: flex;
	align-items: center;
`;

function App() {
	const [dataApi, setDataApi] = useState({});
	const [dataApiRepos, setDataApiRepos] = useState(null);
	const { avatar, bio, name, username } = dataApi;

	return (
		<Container>
			<Form
				setDataApi={setDataApi}
				setDataApiRepos={setDataApiRepos}
			/>

			{Object.keys(dataApi).length !== 0 ? (
				//Si dataAPI no esta vacio, muestra el perfil
				<>
					<ContainerProfile>
						<img src={avatar} alt="Avatar Github" width="150" />
						<ContainerInfo>
							<p>@{username}</p>
							<h2>{name}</h2>
							<p>{bio}</p>
						</ContainerInfo>
					</ContainerProfile>

					<ContainerRepos>
						{dataApiRepos !== null
							? //Si dataApiRepos tiene información, recorre los repositorios y los muestra.
							  dataApiRepos.map((repo, index) => (
										<Repo key={index}>
											<h4>{repo.name}</h4>
											<Icons>
												<span>
													<i className="fas fa-star"> </i> {repo.stargazers_count}
												</span>
												<span>
													<i className="fas fa-code-branch"> </i> {repo.forks}
												</span>
											</Icons>
										</Repo>
							  ))
							: //Sino no hace nada...
							  null}
					</ContainerRepos>
				</>
			) : //Sino no hace nada...
			null}
		</Container>
	);
}

export default App;
