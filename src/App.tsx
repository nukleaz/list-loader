import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PostList } from './components/PostList/PostList';
import postsStore from './stores/PostsStore';

export const App: React.FC = observer(() => {
	const { posts, fetchPosts } = postsStore;

	useEffect(() => {
		if (!posts) {
			fetchPosts();
		}
	}, []);

	return posts?.case({
		pending: () => <div>Загрузка...</div>,
		rejected: (err: unknown) => {
			const errorMessage =
				err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
			return <div>Ошибка: {errorMessage}</div>;
		},
		fulfilled: () => <PostList />,
	});
});
