// import './App'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { CreatePost } from './components/CreatePost';
import { PostList } from './components/PostList';
import PostListProvider from './store/PostListStore';
function App() {
  
  const [selectedTab,setSlectedTab] = useState('Home');

  const handleClick = (tabName) => {
    if(tabName === "Home") {
      setSlectedTab('Home')
    }else {
      setSlectedTab('Create Post')
    }
  }
  

  return (
    <PostListProvider>
      <div className='flex'>
        <div>
          <Sidebar selectedTab={selectedTab} handleClick={handleClick} />
        </div>
        <div>
          <Header/>
          {selectedTab === 'Home' ? <PostList/>:<CreatePost/>}
          <Footer/>
        </div>
      </div>
    </PostListProvider>
  )
}

export default App;
