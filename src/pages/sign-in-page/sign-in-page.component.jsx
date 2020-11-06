import React, { useState, useEffect, useCallback } from "react";
import FormInput from "../../components/form-input/form-input.component";
import styles from "./sign-in-page.module.scss";
import { Link } from "react-router-dom";
import {
  isEmpty,
  isEmailCorrect,
  validationErrorMessages,
  getFirebaseErrorMessageByCode,
} from "../../components/form/form.utils";
import Alert from "../../components/alert/alert.component";
import { connect } from "react-redux";
import {
  signInWithGoogleStart,
  signInWithEmailStart,
  clearError,
} from "../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectErrorCode,
  selectIsLoading,
} from "../../redux/user/user.selectors";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import { buttonStyleTypes } from "../../components/button-custom/button-custom.utils";
import Form from "../../components/form/form.component";
import SectionTitle from "../../components/section-title/section-title.component";
import useHistoryChange from "../../custom-hooks/useHistoryChange";
import FormSubmitSpinner from "../../components/form-submit-spinner/form-submit-spinner.component";

function SignInPage({
  currentUser,
  signInWithGoogleStart,
  signInErrorCode,
  signInWithEmailStart,
  clearSignInError,
  isLoading,
}) {
  const [initialState] = useState({
    email: "",
    password: "",
  });

  const [formFields, setFormFields] = useState(initialState);
  const [validationErrors, setValidationErrors] = useState(initialState);
  const [isSubmitValidationFailed, setIsSubmitValidationFailed] = useState(
    false
  );

  const findValidationErrors = useCallback(
    (email, password) => {
      const errors = { ...initialState };

      if (isEmpty(email)) {
        errors.email = validationErrorMessages.REQUIRED;
      } else if (!isEmailCorrect(email)) {
        errors.email = validationErrorMessages.INVALID_EMAIL;
      }
      if (isEmpty(password)) errors.password = validationErrorMessages.REQUIRED;

      return errors;
    },
    [initialState]
  );

  const checkValidation = useCallback(
    (email, password) => {
      const errors = findValidationErrors(email, password);

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

    clearSignInError();
    const { email, password } = formFields;

    const isValid = checkValidation(email, password);

    if (isValid) {
      signInWithEmailStart({ email, password });
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
    const { email, password } = formFields;

    clearSignInError();

    if (isSubmitValidationFailed) {
      checkValidation(email, password);
    }
  }, [checkValidation, clearSignInError, formFields, isSubmitValidationFailed]);

  useEffect(() => {
    if (currentUser) {
      setFormFields(initialState);
    }
  }, [currentUser, initialState]);

  useHistoryChange(() => {
    clearSignInError();
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
                  alertMessage={getFirebaseErrorMessageByCode(signInErrorCode)}
                />
              </div>

              <Form onSubmit={handleSubmit} noValidate>
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
                <ButtonCustom styleType={buttonStyleTypes.DARK} type="submit">
                  Войти
                </ButtonCustom>
                <div className={styles.formSectionText}>Войти через:</div>
                <ButtonCustom
                  styleType={buttonStyleTypes.GOOGLE}
                  type="button"
                  onClick={signInWithGoogleStart}
                >
                  Google
                </ButtonCustom>
              </Form>
            </div>
            <Link to="/sign-up">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  signInErrorCode: selectErrorCode,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogleStart: () => dispatch(signInWithGoogleStart()),
  signInWithEmailStart: (emailAndPassword) =>
    dispatch(signInWithEmailStart(emailAndPassword)),
  clearSignInError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
