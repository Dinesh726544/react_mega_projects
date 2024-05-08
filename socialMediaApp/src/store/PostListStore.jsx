import { createContext, useReducer,useState,useEffect } from "react";

export const PostList = createContext({
    postList : [],
    fetching : false,
    deletePost : () => {},
    addPosts: () => {}
});

const PostListReducer = (currPostList,action) => {
    console.log(action.payload.postData)
    console.log(action)
    console.log(currPostList)

    let newPostItem = currPostList
    if(action.type === 'ADD_POST') {
        newPostItem = [action.payload.postData, ...currPostList]
    }else if(action.type === 'ADD_INITIAL_POST') {
        newPostItem = action.payload.posts
    }else if(action.type === 'DELETE_POST') {
        newPostItem = currPostList.filter(post => post.id !== action.payload.userId)
    }
    return newPostItem
}

const PostListProvider = ({children}) => {
    const [postList,dispatchPostList] = useReducer(PostListReducer,DEFAULT_POST_LIST)

    //this logic is for comment addpost func 
    /*const addPost = (userId, postTitle, postBody, reactions, tags) => {
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
    }*/

    const addPost = (postData) => {
        dispatchPostList({
            type: 'ADD_POST',
            payload:{
                postData
            } 
        })

    }

    const addPosts = (posts) => {
        dispatchPostList({
            type: 'ADD_INITIAL_POST',
            payload: {
                posts
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


    return <PostList.Provider value={{
        postList,
        addPost,
        deletePost,
        fetching
    }}>
        {children}
    </PostList.Provider>
}

export default PostListProvider;

const DEFAULT_POST_LIST = [
    // {
    //   id: "1",
    //   title: "Going to Mumbai",
    //   body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    //   reactions: 2,
    //   userId: "user-9",
    //   tags: ["vacation", "Mumbai", "Enjoying"],
    // },
    // {
    //   id: "2",
    //   title: "Paas ho bhai",
    //   body: "4 saal ki masti k baad bhi ho gaye hain paas. Hard to believe.",
    //   reactions: 15,
    //   userId: "user-12",
    //   tags: ["Graduating", "Unbelievable"],
    // },
  ];