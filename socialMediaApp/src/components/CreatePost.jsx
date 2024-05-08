import React, { useContext } from 'react'
import { useRef } from 'react';
import { PostList } from '../store/PostListStore';

export function CreatePost() {

    const {addPost} = useContext(PostList)
    
    const userIdElement = useRef();
    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const reactionsElement = useRef();
    const tagsElement = useRef();

    const handleSubmit = (e) => {
    e.preventDefault()
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");   

    // userIdElement.current.value = "";
    // postTitleElement.current.value = "";
    // postBodyElement.current.value = "";
    // reactionsElement.current.value = "";
    // tagsElement.current.value = "";


    
    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: postTitle,
            body: postBody,
            reactions: reactions,
            userId: userId,
            tags: tags,
        })
    })
    .then(res => res.json())
    .then(postData => addPost(postData));

    /* //this will take all the val given by user while filling form
    addPost(userId, postTitle, postBody, reactions, tags); */
  }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="userId" class="form-label">Enter userId</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="userId" 
                        ref={userIdElement}
                        placeholder='enter userId'
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="title" class="form-label">Enter title</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="title" 
                        ref={postTitleElement}
                        placeholder='enter titel'
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="body" class="form-label">Enter body</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="body" 
                        ref={postBodyElement}
                        placeholder='enter body'
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="reactions" class="form-label">no. of reactions</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="reactions" 
                        ref={reactionsElement}
                        placeholder='How many people reacted to this post'
                    />
                </div>
                <div class="mb-3">
                    <label htmlFor="tags" class="form-label">Enter your hashTags here</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="tags" 
                        ref={tagsElement}
                        placeholder='please enter tags using space'
                    />
                </div>

                <button type="submit" class="btn btn-primary">Post</button>
            </form>
        </>
    )
}
