import { firebaseError } from "../../firebase/firebase.utils";

export const isEmpty = (value) => {
  return value.trim() === "";
};

export const isLengthLessThan = (value, min) => {
  return value.length < min;
};

export const isEmailCorrect = (value) => {
  const emailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
  );
  return emailRegex.test(value);
};

export const validationErrorMessages = {
  REQUIRED: "Обязательно для заполнения",
  INVALID_EMAIL: "Некорректный email адрес",
  PASSWORD_DOESNT_MATCH: "Пароли должны совпадать",
  MIN_CHARACTERS_COUNT: "Минимальное кол-во символов:",
};

export const getFirebaseErrorMessageByCode = (errorCode) => {
  const { userDoesntExists, wrongPassword, userAlreadyExists } = firebaseError;

  switch (errorCode) {
    case userDoesntExists.code:
      return userDoesntExists.message;
    case wrongPassword.code:
      return wrongPassword.message;
    case userAlreadyExists.code:
      return userAlreadyExists.message;

    default:
      return "";
  }
};
