import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPost } from '../../api/getPosts';
import postsStore from '../../stores/PostsStore';
import { PostItem } from '../PostItem/PostItem';

interface PostListProps {
	posts: IPost[];
}

export const PostList: FC<PostListProps> = observer(({ posts }) => {
	const { isLoading } = postsStore;

	return (
		<>
			<List
				loading={isLoading}
				bordered
				dataSource={posts}
				rowKey={post => post.id}
				renderItem={(post: IPost) => <PostItem post={post} />}
			/>
		</>
	);
});
