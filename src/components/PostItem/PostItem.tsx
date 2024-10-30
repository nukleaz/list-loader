import { Button, List } from 'antd';
import { FC } from 'react';
import { IPost } from '../../api/getPosts';

interface PostItemProps {
	post: IPost;
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
	return (
		<List.Item>
			<div>
				<span>Альбом: {post.albumId}</span>
				<span>№ {post.id}</span>
			</div>
			<h2>{post.title}</h2>
			<img src={post.thumbnailUrl} alt='image' />
			<Button type='primary'>Редактировать</Button>
			<Button danger>Удалить</Button>
		</List.Item>
	);
};
