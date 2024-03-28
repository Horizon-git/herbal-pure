/* eslint-disable max-len */
/* eslint-disable no-console */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import PhoneInputField from '../../components/PhoneInputField/PhoneInputField';
import { authService } from '../../services/authService';
import { Portal } from '../../components/Portal/Portal';
import { PushNotification } from '../../components/PushNotification/PushNotification';
import { usePageError } from '../../app/hooks';

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

export const RegistrationPage = () => {
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [error, setError] = usePageError('');
  const navigate = useNavigate();

  const onPhoneError = (err: string | undefined) => {
    setPhoneError(err);
  };

  return (
    <div className="form-container">
      <Portal>
        <PushNotification message={`${error}`} />
      </Portal>

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
          console.log(error);
          // formikHelpers.resetForm();

          authService
            .register({ name, email, password, phone })
            .then(() => {
              navigate('/login');
            })
            .catch(err => {
              if (err.message) {
                setError(`${err.message}: Please try again later.`);
              }

              if (!err.response?.data) {
                return;
              }

              const { errors } = err.response.data;

              formikHelpers.setFieldError('email', errors?.email);
              formikHelpers.setFieldError('password', errors?.password);
              formikHelpers.setFieldError('name', errors?.name);
              formikHelpers.setFieldError('phone', errors?.phone);
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
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
                  type="tel"
                  changePhoneError={onPhoneError}
                  phoneError={phoneError}
                  name="phone"
                  component={PhoneInputField}
                />
              </div>
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
                  'button is-loading': isSubmitting,
                })}
                disabled={
                  // eslint-disable-next-line max-len, prettier/prettier
                  isSubmitting || !!errors.email || !!errors.password || !!errors.name || !!phoneError
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
