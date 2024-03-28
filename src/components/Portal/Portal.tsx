import { createPortal } from 'react-dom';

export const Portal = ({ children }: any) => {
  return createPortal(children, document.body);
};
