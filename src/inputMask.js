import {createForm} from "./createForm.js";
import Cleave from "cleave.js";

export function inputForm() {
    const {form, elements, extra} = createForm();
    new Cleave(elements.cardInp, {
        creditCard:true,
    });
    const curr = new Date;
    const currDate = `${curr.getFullYear()-2000}-${String(curr.getMonth()+1).padStart(2,'0')}`;
    new Cleave(elements.expInp, {
        date:true,
        dateMin: currDate,
        datePattern: ['m','y'],
        delimiters: ['/'],
    });

    new Cleave(elements.cvcInp, {
        numericOnly:true,
        blocks: [3],
    });
    return {form, elements, extra};
}