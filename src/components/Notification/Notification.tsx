import { FC } from 'react';

import './Notification.scss';

type Props = {
  message: string;
};

export const Notification: FC<Props> = ({ message }) => {
  return (
    <div className="notification-herbal">
      <h2 className="notification-herbal__message">{message}</h2>
    </div>
  );
};
