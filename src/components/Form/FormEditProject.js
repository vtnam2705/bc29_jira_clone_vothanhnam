import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { GET_PROJECT_CATEGORY_SAGA, UPDATE_PROJECT_SAGA } from './../../redux/constants/Jira/Jira';

function FormEditProject(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  const { arrCategory } = useSelector((state) => state.ProjectReducer);

  const dispatch = useDispatch();
  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content);
  };

  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="container-fluid">
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p>Project id</p>
            <input value={values.id} disabled type="text" name="id" className="form-control" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p>Project name</p>
            <input name="projectName" onChange={handleChange} value={values.projectName} className="form-control" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p>Project category</p>
            <select name="categoryId" onChange={handleChange} value={values.categoryId} className="form-control">
              {arrCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <p>Description</p>
            <Editor
              apiKey="nagvjo5dvg33vpu5c0exg83a472ecx1c33d6ox9sdd0o1j8y"
              name="description123"
              value={values.description}
              init={{
                height: 400,
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
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

const editProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProjectEdit } = props;

    return {
      id: arrProjectEdit?.id,
      projectName: arrProjectEdit.projectName,
      description: arrProjectEdit.description,
      categoryId: arrProjectEdit.categoryId,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    });
  },

  displayName: 'CreateProjectFormik',
})(FormEditProject);

const mapStateToProps = (state) => ({
  arrProjectEdit: state.ProjectReducer.arrProjectEdit,
});

export default connect(mapStateToProps)(editProjectForm);
