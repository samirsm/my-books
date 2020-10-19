import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DatePicker from "react-date-picker";

import {
	updateReadList,
	isRead,
	updateReadDate,
	getBookByID,
} from "../../services/storage.service";
import { pathApiImage } from "../../shared/constants";

const BookCard = ({ id, title, cover_id, read_date, history }) => {
	const [read, setRead] = useState(false);
	const [value, setValue] = useState(new Date());

	useEffect(() => {
		if (isRead(id)) {
			setRead(true);
			setValue(new Date(getBookByID(id).read_date));
		}
	}, []);
	const onChange = value => {
		updateReadDate(id, value);
		setValue(value);
	};
	const handleClick = () => {
		updateReadList(id, `${title}&&${cover_id}&&${value || ""}`);
		isRead(id) ? setRead(true) : setRead(false);
	};
	return (
		<CardContainer>
			{read ? <CardReadStamp>READ</CardReadStamp> : null}

			<CardImage coverId={cover_id}></CardImage>
			{read ? (
				<DatePicker onChange={onChange} value={value}></DatePicker>
			) : null}
			<CardContent>
				<CardTitle>
					{title.length > 40 ? title.slice(0, 40) + "..." : title}
				</CardTitle>
			</CardContent>
			<WrapBtn>
				<CardButton onClick={() => handleClick()}>
					{read ? "unmark as read" : "mark as read"}
				</CardButton>
				<CardButton onClick={() => history.push(`books${id}`)}>
					Details
				</CardButton>
			</WrapBtn>
		</CardContainer>
	);
};

export default withRouter(BookCard);

const CardContainer = styled.div.attrs({ className: "card-container" })`
	width: 15vmax;
	height: 25vmax;
	margin: 15px;
	min-height: 285px;
	min-width: 180px;
	max-height: 350px;
	max-width: 210px;
	background-color: white;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 5px 1.5px rgba(0, 0, 0, 0.25);
	position: relative;
	transition: scale 0.6s ease;
`;

const CardImage = styled.img.attrs({ className: "card-image" })`
	width: 100%;
	height: 60%;
	background-image: ${({ coverId }) =>
		coverId ? `url(${pathApiImage}${coverId}-M.jpg)` : null};
	background-size: cover;
	background-repeat: no-repeat;
	border: none;
`;

const CardContent = styled.div.attrs({ className: "card-content" })`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const CardTitle = styled.p.attrs({ className: "card-title" })`
	text-transform: uppercase;
	font-weight: bold;
	width: 90%;
`;

const WrapBtn = styled.div.attrs({ className: "wrap-btn" })`
	position: absolute;
	bottom: 5px;
	right: 5px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
`;

const CardButton = styled.button.attrs({ className: "card-button" })`
	cursor: pointer;
	text-decoration: none;
	text-transform: uppercase;
	background: none;
	border: none;
	color: var(--color-primary);
	outline: none;
`;

const CardReadStamp = styled.div.attrs({ className: "card-read-stamp" })`
	position: absolute;
	top: 60%;
	right: 0;
	width: 50%;
	font-weight: bold;
	transform: translateY(-100%);
	background-color: var(--color-primary);
	color: white;
	z-index: 10;
	opacity: 0.8;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 10px 15px;
	clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
`;
