/* eslint-disable no-console */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import './RegistrationForm.scss';

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return undefined;
}

function validatePassword(value: string) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return undefined;
}

function validateName(value: string) {
  if (!value) {
    return 'Name is required';
  }

  return undefined;
}

function validatePhoneNumber(value: string) {
  if (!value) {
    return 'Phone number is required';
  }

  const phonePattern = /^\+?[0-9()-.\s]{10,}$/;

  if (!phonePattern.test(value)) {
    return 'Phone number is not valid';
  }

  return undefined;
}

export const RegistrationPage = () => {
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with the activation link</p>
      </section>
    );
  }

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          phone: '',
        }}
        validateOnMount
        onSubmit={({ name, email, phone, password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          setRegistered(true);

          console.log(name, email, password, phone);

          // TODO: send data to server
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="form box">
            <h1 className="title form__center">Sign up</h1>
            <div className="field">
              <label htmlFor="name" className="label">
                Name
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateName}
                  name="name"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={cn('input form__input', {
                    'is-danger': touched.name && errors.name,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user" />
                </span>

                {touched.name && errors.name && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>

              {touched.name && errors.name && (
                <p className="help is-danger">{errors.name}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn('input form__input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope" />
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="phone" className="label">
                Phone
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePhoneNumber}
                  name="phone"
                  type="phone"
                  id="phone"
                  placeholder="+380 95 093 0222"
                  className={cn('input form__input', {
                    'is-danger': touched.phone && errors.phone,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-phone" />
                </span>

                {touched.phone && errors.phone && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>

              {touched.phone && errors.phone && (
                <p className="help is-danger">{errors.phone}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('input form__input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock" />
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle" />
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>
            <div className="field form__center">
              <button
                type="submit"
                className={cn('form__button', {
                  'is-loading': isSubmitting,
                })}
                disabled={
                  // eslint-disable-next-line max-len, prettier/prettier
                  isSubmitting || !!errors.email || !!errors.password || !!errors.name || !!errors.phone
                }
              >
                Sign up
              </button>
            </div>
            <div className="form__center">
              Already have an account?{' '}
              <Link className="form__link" to="/login">
                Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
