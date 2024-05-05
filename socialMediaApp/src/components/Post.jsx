import React, { useContext } from 'react'
import {PostList as PostListData} from '../store/PostListStore'
import { MdDelete } from "react-icons/md";

export function Post({post}) {
    
    const {deletePost} = useContext(PostListData)

    return (
        <>
            <div className="card max-w-sm m-4">
                <MdDelete size={30} onClick={() => deletePost(post.id)}/>
                <div className="card-body">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {post.reactions}
                    <span class="visually-hidden">unread messages</span>
                </span>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    {post.tags.map(tag => <button className="btn btn-primary rounded-pill px-3 m-2" type="button">{tag}</button>)}
                </div>
            </div>
        </>
    )
}
