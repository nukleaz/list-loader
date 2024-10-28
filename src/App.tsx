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
		rejected: () => <div>Ошибка</div>,
		fulfilled: () => <PostList />,
	});
});
