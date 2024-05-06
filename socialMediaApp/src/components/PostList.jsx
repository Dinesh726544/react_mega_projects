import React, { useContext } from 'react'
import { Post } from './Post'
import {PostList as PostListData} from '../store/PostListStore'
import { Message } from './index'
export function PostList() {

    const {postList,addPosts} = useContext(PostListData)

    const handlePostClick = () => {

        fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        // .then(console.log);
        .then(data => addPosts(data.posts));
    }

    return (
        <>
            <div>
                
                {postList.length === 0 && <Message onGetPost = {handlePostClick}/>}
                {postList.map((post) => <Post key={post.id} post = {post} />)}  
                
            </div>
            
        </>
    )
}
