class formValidator {
    constructor (settings, formEl) {
    this._formEL = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
}

resetValidation () {

}

_showInputError () {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
}

_hideInputError () {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
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
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
}


_toggleButtonState () {
    if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
      }
}

_setEventListeners() {
    this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
      );
      const buttonElement = this._.querySelector(
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
    this._formEL.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
}
}

export default formValidator;