import { Button, List } from 'antd';
import { FC } from 'react';
import { IPost } from '../../api/getPosts';

interface PostItemProps {
	post: IPost;
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
	return (
		<List.Item>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<Button type='primary'>Редактировать</Button>
			<Button danger>Удалить</Button>
		</List.Item>
	);
};
