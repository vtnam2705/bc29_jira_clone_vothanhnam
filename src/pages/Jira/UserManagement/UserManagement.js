import React, { useEffect, useRef, useState } from 'react';
import { ReactHtmlParser } from 'react-html-parser';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Table, Popconfirm, Modal, Tag, AutoComplete, Input } from 'antd';
import {
  DELETE_USER_SIGN_UP_SAGA,
  EDIT_USERS,
  GET_ALL_USER_SIGNUP,
  GET_USERS_SEARCH_SAGA,
  HIDE_MODAL_EDIT,
  SHOW_MODAL_EDIT,
} from '../../../redux/constants/Jira/Jira';
import { useDispatch, useSelector } from 'react-redux';
import FormEditUser from '../../../components/Form/FormEditUser';

export default function UserManagement() {
  const { arrUsers, userSearch, isModalVisible } = useSelector((state) => state.SignUpReducer);
  const searchRef = useRef(null);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SIGNUP,
    });
  }, []);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    dispatch({
      type: HIDE_MODAL_EDIT,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: HIDE_MODAL_EDIT,
    });
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();

        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return <Tag color="green">{record?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();

        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: SHOW_MODAL_EDIT,
                });
                dispatch({
                  type: EDIT_USERS,
                  userEditModal: record,
                });
              }}
              className="btn mr-2 btn-primary"
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_SIGN_UP_SAGA,
                  userId: record.userId,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid mt-3">
      <h3>User Management</h3>
      <AutoComplete
        // options={userSearch?.map((user, index) => {
        //   return { label: user.name, value: user.userId.toString() };
        // })}
        value={value}
        onChange={(text) => {
          setValue(text);
        }}
        onSelect={(valueSelect, option) => {
          //Set giá trị của hộp thoại = option.label
          setValue(option.label);
        }}
        onSearch={(value) => {
          //Nếu searchRef khác null
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            dispatch({
              type: GET_USERS_SEARCH_SAGA,
              keyWord: value,
            });
          }, 300);
        }}
        className="mt-1 mb-4 w-100"
        style={{ width: 1000 }}
      >
        <Input.Search size="large" placeholder="Search" />
      </AutoComplete>
      <Space style={{ marginBottom: 16 }}></Space>
      <Table columns={columns} dataSource={value ? userSearch : arrUsers} rowKey={'userId'} />
      <Modal
        footer={null}
        width="40%"
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormEditUser />
      </Modal>
    </div>
  );
}
