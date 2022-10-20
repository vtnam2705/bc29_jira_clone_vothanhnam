import { Editor } from '@tinymce/tinymce-react';
import { Select, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, connect } from 'react-redux';
import { DELETE_COMMENT_SAGA, INSERT_COMMENT_SAGA } from '../../../redux/constants/Jira/Jira';

import { withFormik } from 'formik';
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_USER_SEARCH_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
} from './../../../redux/constants/Jira/Jira';

function ModalJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  const { callBackSubmit } = useSelector((state) => state.TaskReducer);
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
  const [content, setContent] = useState(taskDetailModal.description);

  const { arrStatus, arrPriority, arrTaskType, arrUser } = useSelector((state) => state.TaskReducer);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              apiKey="nagvjo5dvg33vpu5c0exg83a472ecx1c33d6ox9sdd0o1j8y"
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: 'description',
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: 'description',
                  value: historyContent,
                });

                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };
  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <i className="fa fa-clock" />
          <div style={{ width: '100%' }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input className="form-control" name="timeTrackingSpent" onChange={handleChangeValue} />
          </div>
          <div className="col-6">
            <input className="form-control" name="timeTrackingRemaining" onChange={handleChangeValue} />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });

    dispatch({
      type: GET_USER_SEARCH_SAGA,
    });

    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });

    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          
          <div className="modal-header">
            <div className="task-title">
              
              <div className="form-group">
                <select
                  onChange={(e) => {
                    handleChangeValue(e);
                  }}
                  name="typeId"
                  value={taskDetailModal.typeId}
                  className="form-control"
                >
                  {arrTaskType.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
            
            </div>
            
            <div style={{ display: 'flex' }} className="task-click">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          
          <div className="modal-body">
            <div className="container-fluid">
              
              <div className="row">

                <div className="col-8">
                  <div className="description">{renderDescription()}</div>

                  <div className="comment">
                    <h6>Comment</h6>

                    <div className="block-comment" style={{ display: 'flex' }}>
                      <div className="avatar">
                        <img
                          style={{ objectFit: 'cover' }}
                          src="https://image.thanhnien.vn/1024/uploaded/thienminh/2017_04_11/anhnoibat_kscn.jpg"
                          alt="xyz"
                        />
                      </div>
                      <form onSubmit={handleSubmit} className="input-comment">
                        <input
                          className="form-control"
                          onChange={handleChange}
                          name="contentComment"
                          type="text"
                          placeholder="Add a comment ..."
                        />
                      </form>
                    </div>

                    <div className="  ">
                      <div className="comment-item mt-2">
                        {taskDetailModal.lstComment?.map((comment, index) => {
                          return (
                            <div key={index} className="display-comment mt-3" style={{ display: 'flex' }}>
                              <div className="avatar">
                                <img
                                  style={{ objectFit: 'cover' }}
                                  src="https://image.thanhnien.vn/1024/uploaded/thienminh/2017_04_11/anhnoibat_kscn.jpg"
                                  alt="xyz"
                                />
                              </div>
                              <div>
                                <p style={{ marginBottom: 5, fontWeight: 'bold' }}>{comment.name}</p>
                                <p style={{ marginBottom: 5 }}>{comment.commentContent}</p>
                                <div>
                                  <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() => {
                                      dispatch({
                                        type: DELETE_COMMENT_SAGA,
                                        idComment: comment.id,
                                        taskId: taskDetailModal.taskId,
                                      });
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                    placement="bottom"
                                  >
                                    <button style={{ fontSize: '8px' }} className="btn btn-danger">
                                      Delete
                                    </button>
                                  </Popconfirm>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      value={taskDetailModal.statusId}
                      name="statusId"
                      onChange={(e) => {
                        handleChangeValue(e);
                      }}
                      className="custom-select"
                    >
                      {arrStatus.map((item, index) => {
                        return (
                          <option key={index} value={item.statusId}>
                            {item.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row ml-0">
                      {taskDetailModal.assigness?.map((user, index) => {
                        return (
                          <div key={index} className="col-6  mt-2 mb-2 mr-1">
                            <div key={index} className="row">
                              <div style={{ display: 'flex' }} className="item">
                                <div className="avatar">
                                  <img style={{ width: 30, height: 30 }} src={user.avatar} alt={user.avatar} />
                                </div>
                                <p className="name mt-1 ml-1" style={{ width: 'max-content' }}>
                                  {user.name}
                                  <span>
                                    <i
                                      className="fa fa-times"
                                      style={{ marginLeft: 5, cursor: 'pointer', display: 'revert', color: '#d90000' }}
                                      onClick={() => {
                                        dispatch({
                                          type: HANDLE_CHANGE_POST_API_SAGA,
                                          actionType: REMOVE_USER_ASSIGN,
                                          userId: user.id,
                                        });
                                      }}
                                    />
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-6  mt-2 mb-2" style={{ padding: 0 }}>
                    <Select
                      options={projectDetail.members
                        ?.filter((mem) => {
                          let index = taskDetailModal.assigness?.findIndex((us) => us.id === mem.userId);
                          if (index !== -1) {
                            return false;
                          }
                          return true;
                        })
                        .map((mem, index) => {
                          return { value: mem.userId, label: mem.name };
                        })}
                      optionFilterProp="label"
                      style={{ width: '100%' }}
                      name="lstUser"
                      value="+ Add more"
                      className="form-control"
                      onSelect={(value) => {
                        if (value == '0') {
                          return;
                        }
                        let userSelected = projectDetail.members.find((mem) => mem.userId == value);
                        userSelected = { ...userSelected, id: userSelected.userId };
                        //dispatchReducer
                        dispatch({
                          type: HANDLE_CHANGE_POST_API_SAGA,
                          actionType: CHANGE_ASSIGNESS,
                          userSelected,
                        });
                      }}
                    ></Select>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      onChange={(e) => {
                        handleChangeValue(e);
                      }}
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      onChange={(e) => {
                        handleChangeValue(e);
                      }}
                      name="originalEstimate"
                      value={taskDetailModal.originalEstimate}
                      type="text"
                      className="estimate-hours"
                    />
                  </div>

                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>

                  <div style={{ color: '#929398' }}>Create at a month ago</div>

                  <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const insertCommentForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    taskId: props.taskDetailModal.taskId,
    contentComment: '',
  }),

  // validationSchema: Yup.object().shape({
  //   contentComment: Yup.string().required('Comment is required'),
  // }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: INSERT_COMMENT_SAGA,
      newComment: values,
    });
  },

  displayName: 'Insert Comment',
})(ModalJira);

const mapStateToProps = (state) => ({
  taskDetailModal: state.TaskReducer.taskDetailModal,
});

export default connect(mapStateToProps)(insertCommentForm);
