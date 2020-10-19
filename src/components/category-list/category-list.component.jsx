import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookCard from "../book-card/book-card.component";

const CategoryList = ({ category, books }) => {
	return (
		<CategorySection>
			<Title>{category + " BOOKS"}</Title>
			<ContainerCards>
				{books.map(({ key, cover_id, title }) => (
					<BookCard
						key={key}
						id={key}
						cover_id={cover_id}
						title={title}></BookCard>
				))}
			</ContainerCards>
		</CategorySection>
	);
};

export default CategoryList;

const CategorySection = styled.section`
	width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const ContainerCards = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

const Title = styled.h2`
	color: var(--color-primary);
	text-transform: uppercase;
`;
