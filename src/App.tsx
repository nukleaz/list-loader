import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PostList } from './components/PostList/PostList';
import postsStore from './stores/PostsStore';

export const App = observer(() => {
	const { posts, fetchPosts } = postsStore;

	useEffect(() => {
		fetchPosts();
	}, []);

	console.log(posts);

	return <PostList />;
});
