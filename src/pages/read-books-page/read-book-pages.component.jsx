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
			<Chart></Chart>
			<ContainerBooks>
				{books.map((book, index) => (
					<BookCard key={index} {...book}></BookCard>
				))}
			</ContainerBooks>
		</ContainerPage>
	);
};

export default ReadBooksPage;

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
