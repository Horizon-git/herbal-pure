import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

import './PhoneInputField.scss';
import { useEffect } from 'react';
import classNames from 'classnames';
import { FieldAttributes } from 'formik';

const PhoneInputField = ({
  field,
  form: { setFieldValue, touched },
  changePhoneError,
  phoneError,
}: FieldAttributes<any>) => {
  const onValueChange = (phoneNumber: string) => {
    setFieldValue(field.name, phoneNumber);
  };

  // eslint-disable-next-line max-len, prettier/prettier, no-nested-ternary
  const newError = field.value
    ? isPossiblePhoneNumber(field.value)
      ? undefined
      : 'Invalid phone number'
    : 'Phone number required';

  useEffect(() => {
    changePhoneError(newError);
  }, [changePhoneError, newError]);

  return (
    <div className="input-field">
      <PhoneInput
        international
        defaultCountry="UA"
        placeholder="Enter phone number"
        name={field.name}
        value={field.value}
        onChange={onValueChange}
        onBlur={field.onBlur}
        numberInputProps={{
          className: classNames('input', 'form__input', {
            'is-danger': touched.phone && newError,
          }),
        }}
      />

      {touched.phone && phoneError && (
        <>
          <span className="icon is-small is-right has-text-danger">
            <i className="fas fa-exclamation-triangle" />
          </span>
          <p className="help is-danger">{phoneError}</p>
        </>
      )}
    </div>
  );
};

export default PhoneInputField;
