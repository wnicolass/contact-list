import validator from "validator";

export default class Login {
  constructor(formId) {
    this.form = document.getElementById(formId);
  }

  showErrorMessage(input, msg) {
    const smallElement = document.createElement("small");
    smallElement.textContent = msg;
    smallElement.classList.add("text-danger");

    input.parentNode.insertBefore(smallElement, input.nextSibling);
    input.classList.add("is-invalid");
    setTimeout(() => {
      smallElement.remove();
      input.classList.remove("is-invalid");
    }, 5000);
  }

  validate(event) {
    const formElement = event.target;
    const emailInput = formElement.querySelector('input[type="email"]');
    const passwordInput = formElement.querySelector('input[type="password"]');
    let hasError = false;

    if (!validator.isEmail(emailInput.value)) {
      this.showErrorMessage(emailInput, "Invalid email");
      hasError = true;
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      this.showErrorMessage(
        passwordInput,
        "Password length must be between 3 and 50 characters"
      );
      hasError = true;
    }

    if (!hasError) {
      formElement.submit();
    }
  }

  eventsHandler() {
    if (!this.form) {
      return;
    }
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validate(event);
    });
  }

  init() {
    this.eventsHandler();
  }
}
