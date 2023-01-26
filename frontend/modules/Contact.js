import validator from "validator";

export default class Contact {
  constructor(contactFormId) {
    this.contactForm = document.getElementById(contactFormId);
  }

  validateInputs(event) {
    const input = event.target;
    let inputValue = input.value;

    if (inputValue.length < 3 || inputValue.length > 30) {
      input.classList.add("is-invalid");
    } else {
      input.classList.replace("is-invalid", "is-valid");
    }
  }

  validateEmail(input) {
    if (!validator.isEmail(input.value)) {
      input.classList.add("is-invalid");
    } else {
      input.classList.replace("is-invalid", "is-valid");
    }
  }

  validatePhone(input) {
    if (input.value.length > 0) {
      if (!/(^\d{9}$)|(^\+\d{12}$)/.test(input.value)) {
        input.classList.add("is-invalid");
        input.setAttribute("data-error", "true");
      } else {
        input.classList.replace("is-invalid", "is-valid");
      }
    }
  }

  eventsHandler() {
    if (!this.contactForm) {
      return;
    }

    const nameInput = this.contactForm.querySelector('input[name="name"]');
    const surnameInput = this.contactForm.querySelector(
      'input[name="surname"]'
    );
    const emailInput = this.contactForm.querySelector('input[name="email"]');
    const phoneInput = this.contactForm.querySelector('input[name="phone"]');
    let hasError = false;

    nameInput.addEventListener("input", (event) => this.validateInputs(event));
    surnameInput.addEventListener("input", (event) =>
      this.validateInputs(event)
    );
    emailInput.addEventListener("input", () => this.validateEmail(emailInput));
    phoneInput.addEventListener("input", () => this.validatePhone(phoneInput));
    this.contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      hasError = [nameInput, surnameInput, emailInput, phoneInput].some(
        (input) => input.classList.contains("is-invalid")
      );

      if (!hasError) {
        this.contactForm.submit();
      }
    });
  }

  init() {
    this.eventsHandler();
  }
}
