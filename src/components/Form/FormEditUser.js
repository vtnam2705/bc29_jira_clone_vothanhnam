import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { Button } from 'antd';
import { UPDATE_USER_SAGA } from '../../redux/constants/Jira/Jira';

function FormEditUser(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit} className="container-fluid">
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">ID</p>
            <input value={values.id} disabled className="form-control" name="id" />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">Email</p>
            <input onChange={handleChange} value={values.email} className="form-control" name="email" />
            {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">Name</p>
            <input onChange={handleChange} value={values.name} name="name" className="form-control" />
            {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p className="font-weight-bold">Phone</p>
            <input onChange={handleChange} value={values.phoneNumber} name="phoneNumber" className="form-control" />
            {errors.phoneNumber && touched.phoneNumber ? <div className="text-danger">{errors.phoneNumber}</div> : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Button onSubmit={handleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const nameRegex = /^[a-zA-Z ]+$/;
const editUserSignUp = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userDetail } = props;

    return {
      id: userDetail?.userId,
      name: userDetail.name,
      phoneNumber: userDetail.phoneNumber,
      email: userDetail.email,
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    phoneNumber: Yup.string()
      .required('PhoneNumber is required')
      .matches(phoneRegExp, 'Phone number must be at min 10 and at max 12 numbers'),
    name: Yup.string().required('Name is required').matches(nameRegex, 'Name must be characters a-zA-Z'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: UPDATE_USER_SAGA,
      userUpdate: values,
    });
  },

  displayName: 'FormEditUser',
})(FormEditUser);

const mapStateToProps = (state) => ({
  userDetail: state.SignUpReducer.userDetail,
});

export default connect(mapStateToProps)(editUserSignUp);
