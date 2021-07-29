import { useState } from "react";

export function useUserFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,

    (event) => {
      setValues((fields) => ({
        ...fields,
        [event.target.name]: event.target.value,
      }));
    },
  ];
}
