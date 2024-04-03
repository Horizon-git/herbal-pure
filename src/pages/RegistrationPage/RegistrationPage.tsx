/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import PhoneInputField from '../../components/PhoneInputField/PhoneInputField';
import { authService } from '../../services/authService';
import { Portal } from '../../components/Portal/Portal';
import { PushNotification } from '../../components/PushNotification/PushNotification';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../helpers/validate';
import {
  clearNotification,
  setNotification,
} from '../../features/notificationSlice';

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector(state => state.notification);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notification?.type === 'error') {
        dispatch(clearNotification());
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  const onPhoneError = (err: string | undefined) => {
    setPhoneError(err);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <Portal>
        <PushNotification
          message={`${notification?.message}`}
          type={notification?.type}
        />
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

          authService
            .register({ name, email, password, phone })
            .then(() => {
              dispatch(
                setNotification({
                  message: 'Registration was success',
                  type: 'success',
                }),
              );
              navigate('/login');
            })
            .catch(err => {
              if (err.message) {
                dispatch(
                  setNotification({
                    message: `${err.message}. Please try again later.`,
                    type: 'error',
                  }),
                );
              }
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
