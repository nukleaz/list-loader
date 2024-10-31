import { Button, List } from 'antd';
import { FC, memo, useState } from 'react';
import { IPost } from '../../api/getPosts';
import postsStore from '../../stores/PostsStore';
import { EditPostForm } from '../EditPostForm/EditPostForm';
import style from './PostItem.module.css';

interface PostItemProps {
	post: IPost;
}

export const PostItem: FC<PostItemProps> = memo(({ post }) => {
	const { deletePost, setSelectedPost } = postsStore;
	const [isEditing, setIsEditing] = useState(false);

	const handleDeletePost = () => {
		deletePost(post.id);
	};

	const handleEditPost = () => {
		setSelectedPost(post);
		setIsEditing(true);
	};

	return (
		<List.Item className={style.item}>
			{isEditing ? (
				<EditPostForm onCancel={() => setIsEditing(false)} />
			) : (
				<>
					<div className={style.spansWrap}>
						<span>Альбом: {post.albumId}</span>
						<span>№ {post.id}</span>
					</div>
					<h2 className={style.title}>{post.title}</h2>
					<img src={post.thumbnailUrl} alt='image' />
					<div className={style.btnsWrap}>
						<Button type='primary' onClick={handleEditPost}>
							Редактировать
						</Button>
						<Button danger onClick={handleDeletePost}>
							Удалить
						</Button>
					</div>
				</>
			)}
		</List.Item>
	);
});
