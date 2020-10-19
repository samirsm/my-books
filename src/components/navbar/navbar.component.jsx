import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
	return (
		<NavBar>
			<FlexContainer>
				<NavLinks>
					<OptionLink to='/'>Home</OptionLink>
					<OptionLink to='/my-books'>My books</OptionLink>
				</NavLinks>
			</FlexContainer>
		</NavBar>
	);
};

export default Navbar;

const NavBar = styled.nav`
	width: 100vw;
	background: var(--color-primary);
	z-index: 1;
	font-size: 1.4rem;
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 4.5rem;
`;

const NavLinks = styled.ul`
	justify-self: end;
	list-style-type: none;

	& a {
		color: var(--text-secondary);
		text-transform: uppercase;
		font-weight: 600;
		border-bottom: 1px solid transparent;
		margin: 0 0.5rem;
		transition: all 300ms linear 0s;
		text-decoration: none;
		cursor: pointer;

		&:hover {
			border-bottom: 1px solid var(--text-secondary);
		}
	}
`;
const OptionLink = styled(Link)`
	font-size: 16px;
	color: var(--text-secondary);
	cursor: pointer;
`;
