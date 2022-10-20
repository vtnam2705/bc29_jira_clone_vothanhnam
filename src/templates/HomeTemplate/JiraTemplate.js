import React from 'react';
import { Route } from 'react-router-dom';
import MenuJira from '../../components/Jira/MenuJira';
import ModalJira from '../../components/Jira/ModalJira.js/ModalJira.js';
import SidebarJira from '../../components/Jira/SidebarJira';

export const JiraTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarJira />
              <MenuJira />
              <Component {...propsRoute} />
              <ModalJira />
            </div>
          </>
        );
      }}
    />
  );
};
