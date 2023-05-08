import React from "react";
import SideBar from "../SideBar/SideBar";
import './Feed.css'


const Feed = () => {

  return (
    <div className='feedContainer'>
        <div className='sideBarContainer'>
          <SideBar />
          <p className='copyright'>Copyright 2023 DaniilAndCo</p>
        </div>
        <div className='videosContainer'>
          <article className='categoryTitleContainer'>
            <h1 className='categoryTitle'> New </h1>
            <h2 className='videosCaption'> videos </h2>`
          </article>
          
        </div>
    </div>
  );
};

export default Feed;