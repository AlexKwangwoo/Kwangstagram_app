import React, { useState } from "react";

//useInput에 text가 들어가면 onChange에 의해 계속 값이 바뀜!
const useInput = (intialValue) => {
  const [value, setValue] = useState(intialValue);
  const onChange = (text) => {
    setValue(text);
  };
  return { value, onChange, setValue };
}; //이값의 이름은 그대로 줄것임!

export default useInput;
