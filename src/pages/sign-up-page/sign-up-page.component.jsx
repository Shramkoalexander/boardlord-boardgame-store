import React, { useState, useEffect, useCallback } from "react";
import FormInput from "../../components/form-input/form-input.component";
import styles from "./sign-up-page.module.scss";
import {
  isEmpty,
  isEmailCorrect,
  isLengthLessThan,
  validationErrorMessages,
  getFirebaseErrorMessageByCode,
} from "../../components/form/form.utils";
import Alert from "../../components/alert/alert.component";
import { Link } from "react-router-dom";
import {
  selectCurrentUser,
  selectErrorCode,
  selectIsLoading,
} from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { clearError, signUpStart } from "../../redux/user/user.actions";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import { buttonStyleTypes } from "../../components/button-custom/button-custom.utils";
import Form from "../../components/form/form.component";
import SectionTitle from "../../components/section-title/section-title.component";
import useHistoryChange from "../../custom-hooks/useHistoryChange";
import FormSubmitSpinner from "../../components/form-submit-spinner/form-submit-spinner.component";

function SignUpPage({
  signUpErrorCode,
  currentUser,
  signUpStart,
  clearSignUpError,
  isLoading,
}) {
  const [initialState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formFields, setFormFields] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState(initialState);
  const [isSubmitValidationFailed, setIsSubmitValidationFailed] = useState(
    false
  );

  const findValidationErrors = useCallback(
    (displayName, email, password, confirmPassword) => {
      const errors = { ...initialState };

      const passwordMin = 6;

      if (isEmpty(displayName))
        errors.displayName = validationErrorMessages.REQUIRED;
      if (isEmpty(email)) {
        errors.email = validationErrorMessages.REQUIRED;
      } else if (!isEmailCorrect(email)) {
        errors.email = validationErrorMessages.INVALID_EMAIL;
      }
      if (isLengthLessThan(password, passwordMin))
        errors.password = `${validationErrorMessages.MIN_CHARACTERS_COUNT} ${passwordMin}`;
      if (confirmPassword !== password)
        errors.confirmPassword = validationErrorMessages.PASSWORD_DOESNT_MATCH;

      return errors;
    },
    [initialState]
  );

  const checkValidation = useCallback(
    (displayName, email, password, confirmPassword) => {
      const errors = findValidationErrors(
        displayName,
        email,
        password,
        confirmPassword
      );

      setValidationErrors(errors);

      const isValid = Object.values(errors).every((error) => {
        return !error;
      });

      return isValid;
    },
    [findValidationErrors]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    clearSignUpError();
    const { displayName, email, password, confirmPassword } = formFields;

    const isValid = checkValidation(
      displayName,
      email,
      password,
      confirmPassword
    );

    if (isValid) {
      signUpStart({ email, password, displayName });
    } else {
      setIsSubmitValidationFailed(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { displayName, email, password, confirmPassword } = formFields;

    clearSignUpError();

    if (isSubmitValidationFailed) {
      checkValidation(displayName, email, password, confirmPassword);
    }
  }, [checkValidation, clearSignUpError, formFields, isSubmitValidationFailed]);

  useEffect(() => {
    if (currentUser) {
      setFormFields(initialState);
    }
  }, [currentUser, initialState]);

  useHistoryChange(() => {
    clearSignUpError();
  });

  return (
    <>
      <div className="mt-4 mt-xl-5 mb-5">
        <div className="container">
          <div className={styles.container}>
            <SectionTitle />
            {isLoading && <FormSubmitSpinner />}
            <div className={styles.formContainer}>
              <div className="mb-4">
                <Alert
                  alertMessage={getFirebaseErrorMessageByCode(signUpErrorCode)}
                />
              </div>
              <Form onSubmit={handleSubmit} noValidate>
                <FormInput
                  label="Имя пользователя"
                  name="displayName"
                  type="text"
                  value={formFields.displayName}
                  onChange={handleChange}
                  errorMessage={validationErrors.displayName}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formFields.email}
                  onChange={handleChange}
                  errorMessage={validationErrors.email}
                />

                <FormInput
                  label="Пароль"
                  name="password"
                  type="password"
                  value={formFields.password}
                  onChange={handleChange}
                  errorMessage={validationErrors.password}
                />
                <FormInput
                  label="Подтвердите пароль"
                  name="confirmPassword"
                  type="password"
                  value={formFields.confirmPassword}
                  onChange={handleChange}
                  errorMessage={validationErrors.confirmPassword}
                />
                <ButtonCustom styleType={buttonStyleTypes.DARK} type="submit">
                  Зарегистрироваться
                </ButtonCustom>
              </Form>
            </div>

            <div className={styles.alreadyRegistered}>
              Уже зарегистрированы? <Link to="/sign-in">Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  signUpErrorCode: selectErrorCode,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
  clearSignUpError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
