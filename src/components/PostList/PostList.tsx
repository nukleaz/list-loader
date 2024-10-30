import { List } from 'antd';
import { FC } from 'react';
import { IPost } from '../../api/getPosts';
import { PostItem } from '../PostItem/PostItem';

interface PostListProps {
	posts: IPost[];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
	return (
		<List
			bordered
			dataSource={posts}
			renderItem={(post: IPost) => <PostItem post={post} />}
		/>
	);
};
