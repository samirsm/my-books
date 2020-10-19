import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookCard from "../../components/book-card/book-card.component";
import { getBooksFromStorage } from "../../services/storage.service";
import Chart from "../../components/chart/chart.component";

const ReadBooksPage = () => {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		setBooks(getBooksFromStorage());
	}, []);
	return (
		<ContainerPage>
			<Title>{`Anual report chart for ${new Date(
				Date.now(),
			).getFullYear()}`}</Title>
			<Chart></Chart>
			<Title>Read books</Title>

			<ContainerBooks>
				{books
					.sort((a, b) => new Date(a.read_date) - new Date(b.read_date))
					.map((book, index) => (
						<BookCard key={index} {...book}></BookCard>
					))}
			</ContainerBooks>
		</ContainerPage>
	);
};

export default ReadBooksPage;

const Title = styled.h1`
	color: var(--color-primary);
`;

const ContainerPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const ContainerBooks = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;
