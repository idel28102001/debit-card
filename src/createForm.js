import {el,setChildren} from 'redom';
const currList = ['card.svg','maestro.svg','masterCard.svg','mir.svg','visa.svg'];
const path = "./assets/images/";
const resDict = loadImgs(path,currList);

export function createForm() {
    const form = el('form.col-6 mt-5');
    const [cardNumber, cardInp] = createElement('card number',"cardNumber", 'text','mb-3 position-relative');
    const img = createIcon(resDict.card);
    cardNumber.append(img);
    const miniContainer = el('.mb-3 d-flex justify-content-between');
    const [expiry, expInp] = createElement('card expiry',"cardExpiry",'text','mb-3 col-5');
    const [cvc, cvcInp] = createElement('card cvc',"cardCVC",'text',"mb-3 col-5");
    setChildren(miniContainer, expiry,cvc);
    const [email, emailInp] = createElement('Email address',"emailAddress", 'email');
    const btn = el('button.btn btn-success w-100', {
        type:'submit',
        textContent:'Confirm Payment',
    });
    setChildren(form,cardNumber,miniContainer,email,btn);
    return {form:form, elements:{cardInp,expInp,cvcInp,emailInp}, extra:{btn,img,resDict}};
}

function createIcon(image) {
    const img = el('img', {
        style: {
            width: '40px',
            height: '25px',
            position: "absolute",
            right: "10px",
            bottom:"7px",
        }
    });
    img.src = image;
    return img;
}

function createElement(text,id,type="text",divClass="mb-3", labelClass="form-label") {
    const label = el('label', {
        for:id,
        classList:labelClass,
        textContent:text.toUpperCase(),
    });
    const input = el('input', {
        type:type,
        classList:'form-control',
        id:id,
    })

    const cont = el(`.${divClass}`);
    setChildren(cont, label, input);
    return [cont, input];
}

function loadImgs(path, currList) {
    const resDict = {};
    currList.forEach(e=>{
      resDict[e.slice(0,-4)] = require(`${path}${e}`).default;
    });
    return resDict;
}
