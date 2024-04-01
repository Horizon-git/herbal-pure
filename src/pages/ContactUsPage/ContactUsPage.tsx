/* eslint-disable no-console */
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import '../../styles/form.scss';
import {
  validateEmail,
  validateMessage,
  validateName,
} from '../../helpers/validate';

export const ContactUsPage = () => {
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validateOnMount
        onSubmit={({ email, name, message }) => {
          console.log(email, name, message);
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
