/* eslint-disable max-len */
/* eslint-disable no-console */
import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import cn from 'classnames';
import '../../styles/form.scss';
import {
  validateEmail,
  validateMessage,
  validateName,
} from '../../helpers/validate';
import { sendPostContactUs } from '../../services/contactForm';
import { PushNotification } from '../../components/PushNotification/PushNotification';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearNotification,
  setNotification,
} from '../../features/notificationSlice';

export const ContactUsPage = () => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector(state => state.notification);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notification) {
        dispatch(clearNotification());
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  return (
    <div className="form-container">
      <PushNotification
        message={`${notification.message}`}
        type={notification.type}
      />
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validateOnMount
        onSubmit={({ email, name, message }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          sendPostContactUs({ name, email, message })
            .then(() => {
              dispatch(
                setNotification({
                  message:
                    'Message has been sent! Our team will contact you soon',
                  type: 'success',
                }),
              );
              formikHelpers.resetForm();
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
            <h1 className="title form__center">Contact Us</h1>
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
                  placeholder="Your Name"
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
                  placeholder="e.g. john@example.com"
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
              <label htmlFor="message" className="label">
                Message
              </label>
              <div className="control">
                <Field
                  validate={validateMessage}
                  name="message"
                  id="message"
                  placeholder="Your message here..."
                  as="textarea"
                  className={cn('textarea form__input', {
                    'is-danger': touched.message && errors.message,
                  })}
                />
              </div>
              {touched.message && errors.message && (
                <p className="help is-danger">{errors.message}</p>
              )}
            </div>
            <div className="field form__center">
              <button
                type="submit"
                className={cn('form__button', {
                  'button is-loading': isSubmitting,
                })}
                // eslint-disable-next-line max-len, prettier/prettier
                disabled={isSubmitting || !!errors.name || !!errors.email || !!errors.message}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
