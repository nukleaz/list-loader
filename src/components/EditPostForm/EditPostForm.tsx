import { Button, Form, Input } from 'antd';
import { FC, useState } from 'react';
import postStore from '../../stores/PostsStore';
import style from './EditForm.module.css';

interface EditPostFormProps {
	onCancel: () => void;
}

export const EditPostForm: FC<EditPostFormProps> = ({ onCancel }) => {
	const { selectedPost, editPost } = postStore;
	const [title, setTitle] = useState(selectedPost?.title ?? '');

	if (!selectedPost) {
		return null;
	}

	const handleSubmit = () => {
		const updatedPost = { ...selectedPost, title: title };
		editPost(selectedPost.id, updatedPost);
		onCancel();
	};

	return (
		<Form className={style.form} size='large' onFinish={handleSubmit}>
			<Form.Item label={'Заголовок'} name='title' initialValue={title}>
				<Input
					onChange={e => setTitle(e.target.value)}
					placeholder='Введите текст'
				/>
			</Form.Item>
			<Form.Item>
				<Button className={style.btnPrim} htmlType='submit' type='primary'>
					Сохранить
				</Button>
				<Button htmlType='button' onClick={onCancel}>
					Отмена
				</Button>
			</Form.Item>
		</Form>
	);
};
