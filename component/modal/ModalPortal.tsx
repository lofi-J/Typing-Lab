import {ReactNode, useMemo} from "react";
import {createPortal} from "react-dom";

const ModalPortal = ({children}: {children: ReactNode}) => {
  const root = document.getElementById('portal');
  const dom = useMemo(() => document.getElementById('portal'), [root]);
  if (!dom) return null;
  return createPortal(children, dom);
}

export default ModalPortal;