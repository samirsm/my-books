import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ReadBooksPage from "./pages/read-books-page/read-book-pages.component";
import BookDetails from "./pages/book-details-page/book-details-page.component";
import Navbar from "./components/navbar/navbar.component";
function App() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/my-books' component={ReadBooksPage} />
				<Route path='/books/:id/:numberID' component={BookDetails} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
