import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/Jira/Jira';
import * as Yup from 'yup';
import { withFormik } from 'formik';

function CreateProject(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  const dispatch = useDispatch();
  const { arrCategory } = useSelector((state) => state.ProjectReducer);
  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content);
  };

  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  return (
    <div className="w-100 mt-3">
      <div className='container'>
        <h3>Create Project</h3>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div className="form-group">
            <p>Name</p>
            <input onChange={handleChange} type="text" className="form-control " name="projectName" />
          </div>

          <div className="form-group">
            <p>Description</p>
            <Editor
              apiKey="nagvjo5dvg33vpu5c0exg83a472ecx1c33d6ox9sdd0o1j8y"
              name="description"
              initialValue=""
              init={{
                height: 500,
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
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="form-group">
            <select onChange={handleChange} name="categoryId" className="form-control">
              {arrCategory.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn btn-outline-primary" type="submit">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

const createProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    projectName: '',
    description: '',
    categoryId: props.arrCategory[0]?.id,
  }),
  validationSchema: Yup.object().shape(),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },

  displayName: 'Create Project Jira',
})(CreateProject);

const mapStateToProps = (state) => ({
  arrCategory: state.ProjectReducer.arrCategory,
});

export default connect(mapStateToProps)(createProjectFormik);
