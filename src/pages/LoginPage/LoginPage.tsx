/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import '../../styles/form.scss';
import { loginAsync } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Portal } from '../../components/Portal/Portal';
// eslint-disable-next-line max-len
import { PushNotification } from '../../components/PushNotification/PushNotification';
import { validateEmail, validatePassword } from '../../helpers/validate';
import {
  clearNotification,
  setNotification,
} from '../../features/notificationSlice';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notification } = useAppSelector(state => state.notification);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notification) {
        dispatch(clearNotification());
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <Portal>
        <PushNotification
          message={`${notification.message}`}
          type={notification.type}
        />
      </Portal>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount
        onSubmit={({ email, password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          loginAsync({ email, password }, dispatch)
            .then(() => {
              dispatch(
                setNotification({
                  message: 'You successfully logged in!',
                  type: 'success',
                }),
              );
              navigate('/');
            })
            .catch(err => {
              dispatch(
                setNotification({
                  message: `${err.message}. Please try again later.`,
                  type: 'error',
                }),
              );
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="form box">
            <h1 className="title form__center">Login</h1>
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
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="*******"
                  className={cn('input form__input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock" />
                </span>

                <span
                  className={cn('icon is-small is-right', {
                    pointer: true,
                  })}
                  onClick={togglePasswordVisibility}
                  role="button"
                  tabIndex={0}
                >
                  <i
                    className={cn('fa', {
                      'fa-eye': showPassword,
                      'fa-eye-slash': !showPassword,
                    })}
                  />
                </span>
              </div>

              {touched.password && errors.password && (
                <p className="help is-danger">{errors.password}</p>
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
                  isSubmitting || !!errors.email || !!errors.password
                }
              >
                Login
              </button>
            </div>
            <div className="form__center">
              Do not have an account?{' '}
              <Link className="form__link" to="/sign-up">
                Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
