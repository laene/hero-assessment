import React, {useState} from 'react';
import './App.scss';
import Posts from '../components/Posts/Posts';
import TopNav from '../components/TopNav/TopNav';


async function getData(url = '', data = {}) {
  try {
    const response = await fetch(url);
    return await response.json(); 
  } catch (error) {
      throw error;
  }
}

async function getPostsInfo() {
  const postsArray = await getData('https://jsonplaceholder.typicode.com/posts');

  const usersArray = await getData('https://jsonplaceholder.typicode.com/users');

  const formattedPosts = postsArray.map(post => {
      const author = usersArray.filter(user => {
          if (user.id === post.userId) {
              return user;
          }
      })
      return ({
          userId: post.userId,
          userDisplay: author[0].username,
          postId: post.id,
          title: post.title,
          body: post.body,
      })
  })

  return formattedPosts;
}

function ElenasReactApp() {
  const [posts, setPosts] = useState(null);

  getPostsInfo().then(response => setPosts(response));

  if (posts) {
    return (
      <div className="page-body">
        <TopNav/>
        <Posts posts={posts}/>
      </div>
    );
  } else {
    return (
      <p>Not ready :(</p>
    )
  }
}

export default ElenasReactApp;
