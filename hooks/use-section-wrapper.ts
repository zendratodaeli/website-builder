import { useRef, useState } from 'react'
import useOutsideClick from './use-outside-click';

const useSectionWrapper = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const showMenu = () => {
    setIsMenuShown(true);
  };

  const activateEditMode = () => {
      if (!isMenuShown) {
        setIsMenuShown(true);
      }
  
      if (isMenuShown && !isEditable) {
        setIsEditable(true);
      }
    };

  const reset = () => {
    setIsMenuShown(false);
    setIsEditable(false);
  };

  useOutsideClick([wrapperRef, menuRef, portalRef], () => {
    reset();
  });

  
  return {
    wrapperRef, 
    menuRef, 
    portalRef, 
    isMenuShown, 
    isEditable,
    activateEditMode,
    showMenu,
    reset, 
  }
}

export default useSectionWrapper;
