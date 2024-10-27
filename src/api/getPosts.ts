import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts';

export interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export const getPosts = async () => (await axios.get<IPost[]>(`${URL}`)).data;
