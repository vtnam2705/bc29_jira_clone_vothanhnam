import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Button, Drawer, Popconfirm, Popover, Space, Table, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  CLOSE_DRAWER,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_ALL_PROJECT_SAGA,
  REMOVE_USER_PROJECT_SAGA,
} from '../../../redux/constants/Jira/Jira';
import FormEditProject from './../../../components/Form/FormEditProject';
import { ADD_USER_PROJECT_SAGA, GET_USER_SEARCH_SAGA, OPEN_DRAWER } from './../../../redux/constants/Jira/Jira';

export default function ProjectManagement() {
  const { arrUserSearch } = useSelector((state) => state.ProjectReducer);
  const { arrProject } = useSelector((state) => state.ProjectReducer);
  const { visible } = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const [value, setValue] = useState('');

  const searchRef = useRef(null);

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
      visible: true,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
      visible: true,
    });
  };

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      //Sort đối với number
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ['descend'],
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text, record, index) => {
        return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>;
      },
      //Sort đối với chuỗi
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
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',

      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();

        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: 'Creator',
      // dataIndex: 'creator',
      key: 'creator',
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();

        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: 'Members',
      key: 'members',
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    style={{ borderRadius: '15px' }}
                                    width="25px"
                                    height="25px"
                                    src={item.avatar}
                                    alt={item.avatar}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_SAGA,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    style={{ fontSize: '10px' }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
            <Popover
              placement="rightTop"
              title="Add user"
              content={() => {
                return (
                  <AutoComplete
                    options={arrUserSearch?.map((item, index) => {
                      return { label: item.name, value: item.userId.toString() };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSearch={(value) => {
                      //Nếu searchRef khác null
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_SEARCH_SAGA,
                          keyWord: value,
                        });
                      }, 300);
                    }}
                    onSelect={(valueSelect, option) => {
                      //Set giá trị của hộp thoại = option.label
                      setValue(option.label);

                      dispatch({
                        type: ADD_USER_PROJECT_SAGA,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    style={{ width: '100%' }}
                  />
                );
              }}
              trigger="click"
            >
              <Button className='ml-2'>
                <span className=''>+</span>
              </Button>
            </Popover>
          </div>
        );
      },
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: OPEN_DRAWER,
                });

                dispatch({
                  type: EDIT_PROJECT,
                  projectEditModal: record,
                });
              }}
              className="btn mr-2 btn-primary"
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  idProject: record.id,
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
    <div className="w-100 mt-3 p-2">
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}></Space>
      <Table columns={columns} rowKey={'id'} dataSource={arrProject} onChange={handleChange} />

      <Drawer title="Edit Project" width={650} onClose={onClose} visible={visible} bodyStyle={{ paddingBottom: 80 }}>
        <FormEditProject />
      </Drawer>
    </div>
  );
}
