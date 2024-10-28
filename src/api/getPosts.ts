import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts';

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const getPosts = async (pageNumber: number) =>
	await axios.get<IPost[]>(`${URL}?_limit=10&_page=${pageNumber}`);
