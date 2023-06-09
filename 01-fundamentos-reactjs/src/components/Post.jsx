import { Comment } from './Comment';
import { Avatar } from './Avatar';
import styles from './Post.module.css';
import { useState } from 'react';

export function Post(props) {

    const [comments, setComments] = useState([
        'Post Bacana, hein?!'
    ]);

    // serve apenas para passar o que o usuário
    // digitou no campo para o state 'comments'    
    const [newCommentText, setNewCommentText] = useState('');



    function handleCreateNewComment(e) {
        e.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handleUpdateComment(e) {
        e.target.setCustomValidity('')
        setNewCommentText(e.target.value)

    }
    
    // Utilizando o filter() ele irá pegar o state antigo 'comments'
    // para filtrar o comentário que queremos retirar.
    // Se ele retprmar true vai manter na lista. False vai retirar da lista.
    // Vai manter todos comentários que são diferentes do passado para a função, no caso o valor do 'commentToDelete'
    function deleteComment(commentToDelete) {
        const newComments = comments.filter(comment => {
            return comment !== commentToDelete; 
        })

        setComments(newComments);
    }

    function handleNewCommentInvalid(e) {
        e.target.setCustomValidity('Error')
    };

    const isNewCommentEmpty = newCommentText.length === 0;

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

                <time title='13 de Março de 2023 às 15:41'
                    dateTime='2023-03-13 15:41:00'>Publicado há 1h</time>

            </header>


            <div className={styles.content}>
                {props.content.map(c => {
                    if (c.type === 'paragraph') {
                        return <p key={c.content}>{c.content}</p>
                    } else if (c.type === 'link') {
                        return <p key={c.content}><a href='#' >{c.content}</a></p>
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