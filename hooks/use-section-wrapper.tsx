import { useRef, useState } from 'react'
import useOutsideClick from './use-outside-click';

const useSectionWrapper = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  const showMenu = () => {
    setIsMenuShown(true);
  };

  useOutsideClick([wrapperRef, menuRef, portalRef], () => {
    setIsMenuShown(false);
  });
  
  return {wrapperRef, menuRef, portalRef, isMenuShown, showMenu}
}

export default useSectionWrapper;
