import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Loader } from './components/Loader/Loader';
import { PostList } from './components/PostList/PostList';
import postsStore from './stores/PostsStore';

export const App: React.FC = observer(() => {
	const {
		posts,
		fetchPosts,
		fetching,
		setFetching,
		totalCount,
		isLoading,
		error,
	} = postsStore;

	const isInitialLoad = useRef(true);

	useEffect(() => {
		if (isInitialLoad.current || fetching) {
			isInitialLoad.current = false;
			fetchPosts();
		}
	}, [fetching]);

	useEffect(() => {
		document.addEventListener('scroll', handleScroll);

		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, [totalCount]);

	const handleScroll = (e: Event) => {
		const target = e.target as Document;
		if (
			target.documentElement.scrollHeight -
				(target.documentElement.scrollTop + window.innerHeight) <
				300 &&
			posts.length < totalCount
		) {
			setFetching(true);
		}
	};

	return (
		<>
			{error && <div>Ошибка: ${error}</div>}
			{isLoading && <Loader />}
			<PostList posts={posts} />
		</>
	);
});
