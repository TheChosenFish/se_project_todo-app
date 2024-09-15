import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, inputList }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inValues = {};
    this._inputList.forEach((input) => {
      inValues[input.name] = input.inValues;
      console.log("name attribute", input.name);
    });
    return inValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (inValues) => {
      inValues.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inValues);
    });
  }
}

export default PopupWithForm;
