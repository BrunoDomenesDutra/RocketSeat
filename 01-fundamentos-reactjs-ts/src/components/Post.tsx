import { Comment } from './Comment';
import { Avatar } from './Avatar';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface IAuthor {
    name: string;
    role: string;
    avatarUrl: string;
}

interface IContent {
    type: 'paragraph' | 'link';
    content: string;
}

export interface IPost {
    id: number;
    author: IAuthor;
    content: IContent[];
    publishedAt: Date;
}

interface IPostProps {
    post: IPost;
}

export function Post({ post }: IPostProps) {

    const [comments, setComments] = useState([
        'Post Bacana, hein?!'
    ]);

    // serve apenas para passar o que o usuário
    // digitou no campo para o state 'comments'    
    const [newCommentText, setNewCommentText] = useState('');



    function handleCreateNewComment(e: FormEvent) {
        e.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handleUpdateComment(e: ChangeEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('')
        setNewCommentText(e.target.value)

    }

    function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('Error')
    };

    // Utilizando o filter() ele irá pegar o state antigo 'comments'
    // para filtrar o comentário que queremos retirar.
    // Se ele retprmar true vai manter na lista. False vai retirar da lista.
    // Vai manter todos comentários que são diferentes do passado para a função, no caso o valor do 'commentToDelete'
    function deleteComment(commentToDelete: string) {
        const newComments = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(newComments);
    }


    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title='13 de Março de 2023 às 15:41'
                    dateTime='2023-03-13 15:41:00'>Publicado há 1h</time>

            </header>


            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#' >{line.content}</a></p>
                    }

                })}
            </div>


            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleUpdateComment}
                    onInvalid={handleNewCommentInvalid}
                    required={true}
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>


            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    );

};