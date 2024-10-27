import { useEffect, useState } from 'react';
import { IPosts, getPosts } from './api/getPosts';
import { PostList } from './components/List/PostList';

export const App: React.FC = () => {
	const [list, setList] = useState<IPosts[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getPosts();
				if (data) {
					setList(data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	console.log(list);

	return <PostList />;
};
