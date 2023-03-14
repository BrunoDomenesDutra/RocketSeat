import { Comment } from './Comment';
import { Avatar } from './Avatar';
import styles from './Post.module.css';
import { useState } from 'react';

export function Post(props) {

    const [comments, setComments] = useState([
        'Post Bacana, hein?!'
    ]);

    const [newCommentText, setNewCommentText] = useState(''); // serve apenas para passar o que o usuário digitou no campo para o state 'comments'



    function handleCreateNewComment(e){
        e.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handleUpdateComment(e){
        setNewCommentText(e.target.value)
        
    }



    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={props.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{props.author.name}</strong>
                        <span>{props.author.role}</span>
                    </div>
                </div>

                <time title='13 de Março de 2023 às 15:41' dateTime='2023-03-13 15:41:00'>Publicado há 1h</time>

            </header>


            <div className={styles.content}>
                {props.content.map(c => {
                    if (c.type === 'paragraph') {
                        return <p>{c.content}</p>
                    } else if (c.type === 'link') {
                        return <p><a href='#' >{c.content}</a></p>
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
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>
            

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment content={comment}/>
                })}
            </div>
        </article>
    );

};