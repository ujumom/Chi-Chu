import { useState, useCallback, ChangeEvent } from 'react';

type UserInputProps = [string, (e: ChangeEvent) => void];

const useInput = (initialValue: string): UserInputProps => {
  const [userFormInput, setUserFormInput] = useState(initialValue);

  const onChangeForm = useCallback(e => {
    setUserFormInput(e.target.value);
  }, []);

  return [userFormInput, onChangeForm];
};

export default useInput;
