import React from 'react';
import styles from './App.module.scss';
import Posts from '../components/Posts/Posts';
import FilterMenu from '../components/FilterMenu/FilterMenu';

async function getData(url) {
  try {
    const response = await fetch(url);
    return await response.json(); 
  } catch (error) {
      console.log(error);
  }
}

async function getUsersInfo() {
  try {
    const usersArray = await getData('https://jsonplaceholder.typicode.com/users');
    const formattedUsers = usersArray.map(user => {
      return ({
        id: user.id,
        display: user.username,
        selected: false
      })
    })
    return formattedUsers;
  } catch (error) {
    console.log(error);
  }
}

async function getPostsInfo(usersArray) {
  try {
    const postsArray = await getData('https://jsonplaceholder.typicode.com/posts');

    const formattedPosts = postsArray.map(post => {
        const author = usersArray.filter(user => {
          return user.id === post.userId;
        })
        return ({
          userId: post.userId,
          userDisplay: author[0].display,
          postId: post.id,
          title: post.title,
          body: post.body,
        })
    })

    return formattedPosts;

  } catch (error) {
    console.log(error);
  }
}

class ElenasReactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      users: null,
      filteredPosts: null,
    };
  }

  componentDidMount() {
    getUsersInfo()
    .then(response => {
      this.setState({users: response})})
    .then( () => {
      return getPostsInfo(this.state.users);
    }
    )
    .then(posts => {
      this.setState({posts: posts, filteredPosts: posts});
    })
  };


  filterPosts = (filters) => {
    let filteredPosts;
    if (!Array.isArray(filters) || filters.length < 1) {
      filteredPosts = this.state.posts;
    } else {
     filteredPosts = this.state.posts.filter(post => {
     return filters.includes(post.userId);
    })
  }
    this.setState({filteredPosts: filteredPosts});
}

  setOneSelected = (userId) => {
    let users = this.state.users;
    for (let i = 0; i < users.length; i++) {
      if (userId === users[i].id) {
        users[i].selected = !users[i].selected
      }
    }
    this.setState({users: users});
  }

  setAllSelected = (selected) => {
    let users = this.state.users;
    for (let i = 0; i < users.length; i++) {
      users[i].selected = selected;
    }
    this.setState({users: users});
  }

  render() {
      return (
        <div className="page-body">
          <div className={styles.topNav}>
            <h1 className={styles.title}>Elena's React App</h1>
            {this.state.filteredPosts &&
              <FilterMenu 
                users={this.state.users} 
                filterPosts={this.filterPosts} 
                setOneSelected={this.setOneSelected} 
                setAllSelected={this.setAllSelected}
              />
            }
          </div>
          {this.state.filteredPosts ? 
            <Posts posts={this.state.filteredPosts}/>
          :
            <div className={styles.loaderWrapper}>
              <div class={styles.loader}></div>
            </div>
          }
        </div>
      )
  }
}

export default ElenasReactApp;

