import { Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateTask from '../../pages/Jira/CreateTask/CreateTask';
import ProjectDetail from '../../pages/Jira/CreateTask/CreateTask';
import { HIDE_MODAL, SHOW_MODAL } from '../../redux/constants/Jira/Jira';

export default function SidebarJira() {
  const { isModalVisible } = useSelector((state) => state.TaskReducer);
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch({
      type: SHOW_MODAL,
    });
  };

  const handleOk = () => {
    dispatch({
      type: HIDE_MODAL,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: HIDE_MODAL,
    });
  };
  return (
    <div>
      <div className="sideBar">
        <div className="sideBar-top">
          <div className="sideBar-icon">
            <i className="fab fa-jira" />
          </div>
          <div className="sideBar-icon" data-toggle="modal" data-target="#searchModal" style={{ cursor: 'pointer' }}>
            <i className="fa fa-search" />
          </div>
          <div className="sideBar-icon">
            <i onClick={showModal} style={{ cursor: 'pointer', marginLeft: '2px' }} className="fa fa-plus mt-2" />
          </div>
        </div>
        <div className="sideBar-bottom">
          <div className="sideBar-icon">
            <i className="fa fa-question-circle" />
          </div>
        </div>
        <div className="sideBar-img">
          <img
            style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
            src="https://image.thanhnien.vn/1024/uploaded/thienminh/2017_04_11/anhnoibat_kscn.jpg"
            alt="1"
          />
        </div>
      </div>
      <Modal footer="" width="50%" title="Create task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <CreateTask />
      </Modal>
    </div>
  );
}
