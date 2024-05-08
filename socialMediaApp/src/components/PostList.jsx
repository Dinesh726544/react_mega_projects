import React, { useContext, useEffect, useState } from 'react'
import { Post } from './Post'
import {PostList as PostListData} from '../store/PostListStore'
import {Loading , Message } from './index'
export function PostList() {

    const { postList, fetching } = useContext(PostListData);
    
    return (
        <>
            {fetching && <Loading />}
            {!fetching && postList.length === 0 && <Message /*onGetPost = {handlePostClick}*/ />}
            {!fetching && postList.map((post) => <Post key={post.id} post = {post} />)}  
            
        </>
    )
}
