import React, { useContext, useEffect, useState } from 'react'
import { Post } from './Post'
import {PostList as PostListData} from '../store/PostListStore'
import {Loading , Message } from './index'
export function PostList() {

    const { postList, addPosts } = useContext(PostListData);
    const [fetching, setFetching] = useState(false);
  
    useEffect(() => {
      setFetching(true);
      const controller = new AbortController();
      const signal = controller.signal;
  
      fetch("https://dummyjson.com/posts", { signal })
        .then((res) => res.json())
        .then((data) => {
            addPosts(data.posts);
          setFetching(false);
        });
  
      return () => {
        console.log("Cleaning up UseEffect.");
        controller.abort();
      };
    }, []);

    return (
        <>
            {fetching && <Loading />}
            {!fetching && postList.length === 0 && <Message /*onGetPost = {handlePostClick}*/ />}
            {!fetching && postList.map((post) => <Post key={post.id} post = {post} />)}  
            
        </>
    )
}
