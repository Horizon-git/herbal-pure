import { FC } from 'react';
import './PushNotification.scss';
import classNames from 'classnames';
import { Portal } from '../Portal/Portal';

type Props = {
  message: string;
  type: 'success' | 'error' | '';
};

export const PushNotification: FC<Props> = ({ message, type }) => {
  return (
    <Portal>
      <div
        className={classNames('push-notification', {
          'push-notification--visible': !!message,
          'push-notification--error': type === 'error',
          'push-notification--success': type === 'success',
        })}
      >
        <h2 className="push-notification__message">{message}</h2>
      </div>
    </Portal>
  );
};
