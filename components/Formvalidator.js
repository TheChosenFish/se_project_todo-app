class formValidator {
    constructor (settings, formEl) {
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
}

resetValidation () {
 this._inputSelector.reset();
 this._submitButtonSelector.disabled();
}

_showInputError () {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
}

_hideInputError () {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
}

_checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(
          inputElement,
          inputElement.validationMessage,
        );
      } else {
        this._hideInputError(inputElement);
      }
}


_hasInvalidInput () {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
}


_toggleButtonState () {
    const buttonElement = this._formEl.querySelector(
        this._submitButtonSelector,
      );
    if (this._hasInvalidInput()) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
}

_setEventListeners() {
    this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
      );
      const buttonElement = this._formEl.querySelector(
        this._submitButtonSelector,
      );
    
      this._toggleButtonState(this._inputList, buttonElement);
    
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputList, buttonElement);
        });
      });
}

enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
}
}

export default formValidator;