import React from 'react';

export default function InfoMain(props) {
  let { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div key={index} className="avatar">
          <img src={user.avatar} alt="123" />
        </div>
      );
    });
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Board</h3>
        <div className="social-link">
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            🍺 Support
          </span>
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            🎧 Spotify
          </span>
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            🎮 Tetris
          </span>
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            📕 Storybook
          </span>
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            <i style={{ color: '#2d2dec' }} className="fab fa-facebook"></i> Facebook
          </span>
          <span style={{ backgroundColor: '#f4f5f7' }} className="ml-3 p-2">
            <i className="fab fa-github"></i> Source Code
          </span>
        </div>
      </div>
      <div className="info" style={{ display: 'flex' }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: 'flex' }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
