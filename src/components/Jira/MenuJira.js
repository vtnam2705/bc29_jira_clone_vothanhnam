import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MenuJira() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img className="logo-reactjs" src={require('../../assets/img/download.jfif').default} alt="123" />
        </div>
        <div className="account-info">
          <p className="font-weight-bold">React Jira Clone</p>
          <p>Software Project</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-th-list mr-2"></i>
          <NavLink className="text-dark" activeClassName="active font-weight-bold" to="/jira">
            <span style={{ fontSize: 16 }}>Board</span>
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-2" />
          <NavLink className="text-dark" activeClassName="active font-weight-bold" to="/createproject">
            <span style={{ fontSize: 16 }}>Create Project</span>
          </NavLink>
        </div>

        <div>
          <i className="fa fa-project-diagram mr-2"></i>
          <NavLink className="text-dark" activeClassName="active font-weight-bold" to="/projectmanagement">
            <span style={{ fontSize: 16 }}>Projects</span>
          </NavLink>
        </div>

        <div>
          <i className="fa fa-user-cog mr-2"></i>
          <NavLink className="text-dark" activeClassName="active font-weight-bold" to="/usermanagement">
            <span style={{ fontSize: 16 }}>User Management</span>
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-truck mr-2" />
          <span style={{ fontSize: 16 }}>Releases</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-equals mr-2" />
          <span style={{ fontSize: 16 }}>Issues and filters</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-paste mr-2" />
          <span style={{ fontSize: 16 }}>Pages</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-location-arrow mr-2" />
          <span style={{ fontSize: 16 }}>Reports</span>
        </div>
        <div style={{ cursor: 'no-drop' }}>
          <i className="fa fa-box mr-2" />
          <span style={{ fontSize: 16 }}>Components</span>
        </div>
      </div>
    </div>
  );
}
