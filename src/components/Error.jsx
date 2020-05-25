import React from 'react'
import styled from "@emotion/styled";

const ContainerError = styled.div`
	width: 50%;
	background-color: #ff6961;
	color: #fff;
	margin-bottom: 1rem;
	padding: 1rem 0;
`;

const Error = ({message}) => {
    return (
        <ContainerError>
            {message}
        </ContainerError>
    )
}

export default Error
