import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { SIGN_UP_USER_SAGA } from '../../../redux/constants/Jira/Jira';

function SignUpJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          Sign Up
        </h3>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<MailOutlined />}
          />
        </div>
        {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            type="password"
            name="passWord"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>
        {errors.passWord && touched.passWord ? <div className="text-danger">{errors.passWord}</div> : null}

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            type="phone"
            name="phoneNumber"
            size="large"
            placeholder="Phone number"
            prefix={<PhoneOutlined />}
          />
        </div>
        {errors.phoneNumber && touched.phoneNumber ? <div className="text-danger">{errors.phoneNumber}</div> : null}

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            type="text"
            name="name"
            size="large"
            placeholder="Name"
            prefix={<UserOutlined />}
          />
        </div>
        {errors.name && touched.name ? <div className="text-danger">{errors.name}</div> : null}

        <div className="row">
          <div className="col-6">
            <Button
              htmlType="submit"
              size="large"
              style={{ minWidth: 90, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
              className="mt-5"
            >
              Sign Up
            </Button>
          </div>

          <div className="col-6">
            <NavLink to="/login">
              <Button
                size="large"
                style={{ minWidth: 90, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                className="mt-5"
              >
                Login
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const signUpForm = withFormik({
  // enableReinitialize: true,
  mapPropsToValues: (props) => ({
    email: '',
    passWord: '',
    phoneNumber: '',
    name: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    passWord: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at min 6 characters')
      .max(32, 'Password must be at max 32 characters'),
    phoneNumber: Yup.string()
      .required('PhoneNumber is required')
      .matches(phoneRegExp, 'Phone number must be at min 10 and at max 12 numbers'),
    name: Yup.string().required('Name is required'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: SIGN_UP_USER_SAGA,
      newUser: values,
    });
  },

  displayName: 'SignUpForm',
})(SignUpJira);

export default connect()(signUpForm);
