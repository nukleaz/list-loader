import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/photos';

export interface IPost {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export const getPosts = async (pageNumber: number) =>
	await axios.get<IPost[]>(`${URL}?_limit=10&_page=${pageNumber}`);
