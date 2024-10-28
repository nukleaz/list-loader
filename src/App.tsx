import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PostList } from './components/PostList/PostList';
import postsStore from './stores/PostsStore';

export const App: React.FC = observer(() => {
	const { posts, fetching, fetchPosts, setFetching, totalCount } = postsStore;

	useEffect(() => {
		if (fetching) {
			fetchPosts();
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);

		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, [totalCount, posts]);

	const scrollHandler = (e: Event) => {
		const target = e.target as Document;
		if (
			target.documentElement.scrollHeight -
				(target.documentElement.scrollTop + window.innerHeight) <
				100 &&
			posts.length < totalCount
		) {
			setFetching(true);
		}
	};

	return <PostList />;
});
