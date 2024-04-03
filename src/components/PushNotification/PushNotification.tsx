import { FC } from 'react';
import './PushNotification.scss';
import classNames from 'classnames';

type Props = {
  message: string | undefined;
  type: 'success' | 'error' | undefined;
};

export const PushNotification: FC<Props> = ({ message, type }) => {
  return (
    <div
      className={classNames('push-notification', {
        'push-notification--visible': !!message,
        'push-notification--error': type === 'error',
        'push-notification--success': type === 'success',
      })}
    >
      {message !== undefined && (
        <h2 className="push-notification__message">{message}</h2>
      )}
    </div>
  );
};
