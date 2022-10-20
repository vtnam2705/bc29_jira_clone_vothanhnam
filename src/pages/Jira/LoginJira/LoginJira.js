import { LockOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { USER_SIGNIN_API } from '../../../redux/constants/Jira/Jira';
import { NavLink } from 'react-router-dom';

function LoginJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
          Login Jira
        </h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: '100%', minWidth: 300 }}
            type="password"
            name="password"
            size="large"
            placeholder="password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password}</div>

        <div className="row">
          <div className="col-6">
            <Button
              htmlType="submit"
              size="large"
              style={{ minWidth: 100, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
              className="mt-5"
            >
              Login
            </Button>
          </div>
          <div className="col-6">
            <NavLink to="/signup">
              <Button
                size="large"
                style={{ minWidth: 100, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                className="mt-5"
              >
                Sign Up
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="social mt-3 d-flex">
          <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={'large'}>
            <span className="font-weight-bold" style={{ color: '#fff' }}>
              F
            </span>
          </Button>
          <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={'large'}></Button>
        </div>
      </div>
    </form>
  );
}

const LoginJiraWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('email is invalid!'),
    password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let action = {
      type: USER_SIGNIN_API,
      userLogin: {
        email: values.email,
        password: values.password,
      },
    };

    setSubmitting(true);
    props.dispatch(action);
  },
  displayName: 'LoginJira',
})(LoginJira);

export default connect()(LoginJiraWithFormik);
