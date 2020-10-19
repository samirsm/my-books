export const updateReadList = (id, item) => {
	isRead(id) ? localStorage.removeItem(id) : localStorage.setItem(id, item);
};

export const getBooksFromStorage = () => {
	const data = Object.keys(localStorage).map(bookId => {
		const [id, title, cover_id, read_date] = [
			bookId,
			...localStorage.getItem(bookId).split("&&"),
		];
		return { id, title, cover_id, read_date };
	});
	return data;
};

export const getBookByID = bookId => {
	const [id, title, cover_id, read_date] = [
		bookId,
		...localStorage.getItem(bookId).split("&&"),
	];
	return { id, title, cover_id, read_date };
};

export const updateReadDate = (id, new_date) => {
	const [title, cover_id, read_date] = [
		...localStorage.getItem(id).split("&&"),
	];
	localStorage.setItem(id, `${title}&&${cover_id}&&${new_date}`);
};

export const isRead = id => localStorage.getItem(id) !== null;
