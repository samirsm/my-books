import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { pathApi } from "../../shared/constants";
import styled from "styled-components";

const BookDetailsPage = match => {
	const [book, setBook] = useState({
		title: "",
		subjects: [],
		covers: [],
		description: { value: "" },
	});
	const [author, setAuthor] = useState("");
	useEffect(() => {
		async function fetchBook() {
			const { id, numberID } = match.match.params;
			const response = await fetch(`${pathApi}/${id}/${numberID}.json`);
			await response.json().then(async d => {
				setBook(d);
				const res = await fetch(`${pathApi}${d.authors[0].author.key}.json`);
				await res.json().then(d => setAuthor(d));
			});
		}
		fetchBook();
	}, []);

	return (
		<ContainerPage>
			<ContentHeader>
				<Image coverId={book.covers ? book.covers[0] : null}></Image>
				<ContentInfo>
					<Title>{book.title}</Title>
					<AuthorName>
						<b>Author: </b>
						{author.name}
					</AuthorName>
					<Subject>
						<b>Subjects: </b>
						{book.subjects.join(", ")}
					</Subject>
				</ContentInfo>
			</ContentHeader>
			<Description>
				{typeof book.description === "string"
					? book.description
					: book.description.value}
			</Description>
		</ContainerPage>
	);
};

export default withRouter(BookDetailsPage);

const ContainerPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding: 30px;
`;

const ContentHeader = styled.div`
	width: 80%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const ContentInfo = styled.div`
	width: 80%;
	min-height: 30vh;
	padding: 0 15px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;

const Image = styled.img`
	width: 20%;
	height: 35vh;
	background-image: ${({ coverId }) =>
		coverId
			? `url(https://covers.openlibrary.org/b/id/${coverId}-L.jpg)`
			: null};
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	border: none;
`;

const Title = styled.h1`
	text-transform: uppercase;
	margin: 0;
`;
const AuthorName = styled.p`
	font-size: 20px;
	margin: 0;
`;

const Subject = styled.p`
	font-size: 12px;
`;

const Description = styled.p`
	font-size: 18px;
	width: 80%;
`;
