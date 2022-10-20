import React, { useEffect, useState } from 'react';
import { Select, Radio, Slider, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import {
  CREATE_TASK_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_USER_SEARCH_SAGA,
} from '../../../redux/constants/Jira/Jira';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import {
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
} from './../../../redux/constants/Jira/Jira';

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function CreateTask(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  const { arrProject } = useSelector((state) => state.ProjectReducer);
  const { arrStatus, arrPriority, arrTaskType, arrUser } = useSelector((state) => state.TaskReducer);
  const [size, setSize] = React.useState('default');

  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_USER_SEARCH_SAGA,
      keyWord: '',
    });
  }, []);
  const children = [];
  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          onChange={(e) => {
            let { value } = e.target;
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
            //Cập nhật giá trị cho project Id
            setFieldValue('projectId', e.target.value);
          }}
          className="form-control"
        >
          {arrProject.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input onChange={handleChange} name="taskName" className="form-control" />
      </div>
      <div className="form-group">
        <p>Status Id</p>
        <select onChange={handleChange} name="statusId" className="form-control">
          {arrStatus.map((item, index) => {
            return (
              <option key={index} value={item.statusId}>
                {item.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>Priority</p>
            <select onChange={handleChange} name="priorityId" className="form-control">
              {arrPriority.map((item, index) => {
                return (
                  <option key={index} value={item.priorityId}>
                    {item.priority}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Task type</p>
            <select onChange={handleChange} name="typeId" className="form-control">
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
      </div>
      <div className="row">
        <div className="col-6">
          <p>Assignees</p>
          <Select
            options={userOptions}
            mode="multiple"
            size={size}
            // options
            placeholder="Please select"
            onChange={(values) => {
              //set lại giá trị cho listUserAssign
              setFieldValue('listUserAsign', values);
            }}
            style={{ width: '100%' }}
            onSelect={(value) => {}}
            optionFilterProp="label"
          >
            {children}
          </Select>
          <div className="row mt-3">
            <div className="col-12">
              <p>Original Estimate</p>
              <input
                onChange={handleChange}
                type="number"
                min="0"
                name="originalEstimate"
                defaultValue="0"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <p>Time tracking</p>
          <Slider
            defaultValue={30}
            value={timeTracking.timeTrackingSpent}
            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
          />
          <div className="row">
            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
          </div>
          <div className="row" style={{ marginTop: 5 }}>
            <div className="col-6">
              <p>Time spent</p>
              <input
                type="number"
                defaultValue="0"
                min="0"
                className="form-control"
                name="timeTrackingSpent"
                onChange={(e) => {
                  setTimetracking({
                    ...timeTracking,
                    timeTrackingSpent: e.target.value,
                  });
                }}
              />
            </div>

            <div className="col-6">
              <p>Time remaining</p>
              <input
                type="number"
                defaultValue="0"
                min="0"
                className="form-control"
                name="timeTrackingRemaining"
                onChange={(e) => {
                  setTimetracking({
                    ...timeTracking,
                    timeTrackingRemaining: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <p>Description</p>
            <Editor
              apiKey="nagvjo5dvg33vpu5c0exg83a472ecx1c33d6ox9sdd0o1j8y"
              name="description"
              initialValue=""
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
                setFieldValue('description', content);
              }}
            />
          </div>
        </div>
      </div>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrStatus, arrPriority, arrTaskType, arrProject } = props;
    return {
      listUserAsign: [],
      taskName: '',
      description: '',
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
    };
  },

  // validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_TASK_SAGA,
      taskObject: values,
    });
  },

  displayName: 'createTaskForm',
})(CreateTask);

const mapStateToProps = (state) => {
  return {
    arrStatus: state.TaskReducer.arrStatus,
    arrPriority: state.TaskReducer.arrPriority,
    arrTaskType: state.TaskReducer.arrTaskType,
    arrProject: state.ProjectReducer.arrProject,
  };
};

export default connect(mapStateToProps)(formCreateTask);
