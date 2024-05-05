import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList : [],
    addPost : () => {},
    deletePost : () => {}
});

const PostListReducer = (currPostList,action) => {
    let newPostItem = currPostList
    if(action.type === 'ADD_POST') {
        newPostItem = [action.payload, ...currPostList]
    }else if(action.type === 'DELETE_POST') {
        newPostItem = currPostList.filter(post => post.id !== action.payload.userId)
    }
    return newPostItem
}

const PostListProvider = ({children}) => {
    const [postList,dispatchPostList] = useReducer(PostListReducer,DEFAULT_POST_LIST)

    const addPost = (userId, postTitle, postBody, reactions, tags) => {
        dispatchPostList({
            type: 'ADD_POST',
            payload: {
                id: Date.now(),
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userId,
                tags: tags,
            }
        })
    }

    const deletePost = (userId) => {
        dispatchPostList({
            type: 'DELETE_POST',
            payload: {
                userId
            }
        })
    }

    return <PostList.Provider value={{
        postList,
        addPost,
        deletePost
    }}>
        {children}
    </PostList.Provider>
}

export default PostListProvider;

const DEFAULT_POST_LIST = [
    {
      id: "1",
      title: "Going to Mumbai",
      body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
      reactions: 2,
      userId: "user-9",
      tags: ["vacation", "Mumbai", "Enjoying"],
    },
    {
      id: "2",
      title: "Paas ho bhai",
      body: "4 saal ki masti k baad bhi ho gaye hain paas. Hard to believe.",
      reactions: 15,
      userId: "user-12",
      tags: ["Graduating", "Unbelievable"],
    },
  ];