import {inputForm} from './inputMask.js';
import validator from 'validator';
import { 
    isValid, 
    isExpirationDateValid, 
    isSecurityCodeValid, 
    getCreditCardNameByNumber 
  } from 'creditcard.js';

export function validateForm() {
    const {form, elements, extra} = inputForm();
    extra.btn.classList.add('disabled');
    Object.values(elements).forEach(elem=>{
        elements.cardInp.addEventListener('input',currEl=>{
            const currWord = currEl.currentTarget.value;
            if (currWord) {
                switch (Number(currWord.charAt(0))) {
                    case 2:
                        extra.img.src = extra.resDict['mir'];
                        break;
                    case 4:
                        extra.img.src = extra.resDict['visa'];
                        break;
                    case 5:
                        extra.img.src = extra.resDict['masterCard'];
                        break;
                    case 6:
                        extra.img.src = extra.resDict['maestro'];
                        break;
                    default:
                        extra.img.src = extra.resDict['card'];
                }
            } else {
                extra.img.src = extra.resDict['card'];
            }
        });
        elem.addEventListener('input',()=>{
            const result = runValid(elements,false);
            if (result) {
                extra.btn.classList.remove('disabled');
                return;
            }
            extra.btn.classList.add('disabled');
        })
        elem.addEventListener('blur',runValid.bind(null, elements));
        form.addEventListener('submit',e=>{
            e.preventDefault();
        });
    });
    return form;
}

function runValid(elements,active=true) {
    const number = elements.cardInp;
    const exp = elements.expInp;
    const cvc = elements.cvcInp;
    const mail = elements.emailInp;
    const resultList = [checkValid(number,isValid,'',active),
    checkValid(exp,isExpirationDateValid, 'exp',active),
    checkValid([number,cvc],isSecurityCodeValid, 'cvc',active),
    checkValid(mail,validator.isEmail,'',active)];
    return !resultList.includes(false);
}


function checkValid(elem, func, word="",active=true) {
    const danger = 'border-danger';
    const result = true; 
    switch (word) {
        case 'cvc': {
            const [number, cvc] = [elem[0],elem[1]];
            if (active) {
                cvc.classList.remove(danger);
            }
            if (func(number.value.replaceAll(' ',''), cvc.value)) return result;
            if (active) {
                cvc.classList.add(danger);
            }
            return !result;
        }
        case 'exp': {
            const [mounth, year] = [elem.value.slice(0,2),'20'+elem.value.slice(3)];
            if (active) {
                elem.classList.remove(danger);
            }
            if (func(mounth, year)) return result;
        }
    }
    if (func(elem.value)) {
        if (active) {
            elem.classList.remove(danger);
        }
        return result;    
    };
    if (active) {
        elem.classList.add(danger);
    }
    return !result;
}