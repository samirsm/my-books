import React, { useState, useEffect } from "react";
import { pathApi } from "../../shared/constants";
import styled from "styled-components";
import CategoryList from "../../components/category-list/category-list.component";

const categories = [
	"love",
	"Animals",
	"Hunger",
	"fiction",
	"Foxes",
	"Fiction",
	"Zorros",
	"Tunnels",
	"Interviews",
	"Farmers",
	"Rats",
	"Thieves",
	"Tricksters",
	"Badgers",
];
const Homepage = () => {
	const [category, setCategory] = useState("love");
	const [books, setBooks] = useState([]);
	useEffect(() => {
		console.log("entrou");
		async function fetchBooks() {
			const response = await fetch(
				`${pathApi}/subjects/${category.toLowerCase()}.json`,
			);
			await response.json().then(d => setBooks(d.works));
		}
		fetchBooks();
	}, [category]);
	return (
		<ContainerHome>
			<WrapLinks>
				{categories.map((cat, index) => (
					<Link
						active={cat === category}
						key={index}
						onClick={() => setCategory(cat)}>
						{cat.toUpperCase()}
					</Link>
				))}
			</WrapLinks>
			<CategoryList category={category} books={books}></CategoryList>
		</ContainerHome>
	);
};

export default Homepage;

const ContainerHome = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const WrapLinks = styled.div`
	margin-top: 30px;
	width: 80%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const Link = styled.a`
	font-size: 18px;
	margin: 5px;
	color: var(--color-primary);
	cursor: pointer;
	border-bottom: ${({ active }) =>
		active ? "1px solid var(--color-primary)" : "none"};

	&:hover {
		border-bottom: 1px solid var(--color-primary);
	}
`;
