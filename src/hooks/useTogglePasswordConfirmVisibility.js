import react from 'react';
import {useState} from 'react';
export const useTogglePasswordConfirmVisibility = () => {
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState(true);
  const [rightConfirmIcon, setRightConfirmIcon] = useState('eye-outline');

  const handlePasswordConfirmVisibility = () => {
    if (rightConfirmIcon === 'eye-outline') {
      setRightConfirmIcon('eye-off-outline');
      setPasswordConfirmVisibility(!passwordConfirmVisibility);
    } else if (rightConfirmIcon === 'eye-off-outline') {
      setRightConfirmIcon('eye-outline');
      setPasswordConfirmVisibility(!passwordConfirmVisibility);
    }
  };

  return {
    passwordConfirmVisibility,
    rightConfirmIcon,
    handlePasswordConfirmVisibility,
  };
};
