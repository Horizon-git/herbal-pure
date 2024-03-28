import { FC } from 'react';
import './PushNotification.scss';
import classNames from 'classnames';

type Props = {
  message: string;
};

export const PushNotification: FC<Props> = ({ message }) => {
  // const [visible, setVisible] = useState(visibility);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVisible(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [visible]);

  return (
    <div
      className={classNames('push-notification', {
        'push-notification--visible': !!message,
      })}
    >
      <h2 className="push-notification__message">{message}</h2>
    </div>
  );
};
