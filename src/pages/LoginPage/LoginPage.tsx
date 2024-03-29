/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import '../../styles/form.scss';

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

export const LoginPage = () => {
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount
        onSubmit={({ email, password }) => {
          console.log(email, password);

          // TODO: send data to server
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

              {touched.password && errors.password && (
                <p className="help is-danger">{errors.password}</p>
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
