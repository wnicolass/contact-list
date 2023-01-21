import "core-js/stable";
import "regenerator-runtime/runtime";
import Contact from "./modules/Contact";
import Login from "./modules/Login";
// import "./assets/styles/style.css";

const signUp = new Login("signUpForm");
const signIn = new Login("signInForm");
signUp.init();
signIn.init();

const contact = new Contact("contactForm");
contact.init();
