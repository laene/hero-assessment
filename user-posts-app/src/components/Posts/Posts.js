import React from 'react';
import styles from './Posts.module.scss';
import Post from '../Post/Post';
import PropTypes, { shape } from 'prop-types';

export default function Posts({posts = []}) {
        let count = 0;
        const postList = posts.map(post => {
            count = count + 1;
            return (
                <Post 
                    key={post.postId}
                    userDisplay={post.userDisplay}
                    title={post.title}
                    text={post.body}
                    count={count}
                />
            )
        }
        );
        return (
            <div className={styles.wrapper}>
                <ul className={styles.list}>{postList}</ul>
            </div>
        )
};

Posts.propTypes = {
    posts: PropTypes.arrayOf(shape({
        postId: PropTypes.number,
        userDisplay: PropTypes.string,
        title: PropTypes.string,
        body: PropTypes.string
    }))
}