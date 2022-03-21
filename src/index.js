import {el, setChildren} from "redom";
import { validateForm } from "./validate.js";
import './bootstrap.min.css';

const currCont = el('.container');
const main = el('.form-content d-flex justify-content-center');
main.append(validateForm());
currCont.append(main);
setChildren(window.document.body, currCont);
