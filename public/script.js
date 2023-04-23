"use strict";
//INTERFACES Enforces format structure//
//PAYMENT STRUCTURE
/*CASH*/
class CashPayment {
    constructor(c, d, a) {
        this.client = c;
        this.details = d;
        this.amount = a;
    }
    format() {
        return `${this.client} has payed £${this.amount} for ${this.details}`;
    }
}
/*CARD*/
class CardPayment {
    constructor(c, d, a) {
        this.client = c;
        this.details = d;
        this.amount = a;
    }
    format() {
        return `${this.client} has payed £${this.amount} for ${this.details}`;
    }
}
//GRABING FORM
const form = document.querySelector(".new-item-form");
//GRABBING INPUTS
const type = document.querySelector("#type");
const tofrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
const tracker = document.querySelector(".item-list");
//OUTPUUTING LIST TEMPLATE
class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, position) {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        h4.innerText = heading;
        li.append(h4);
        const p = document.createElement("p");
        p.innerText = item.format();
        li.append(p);
        if (position === "start") {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
//USER EVENT, GRABBING VALUE & OUTPUTTING AS LIST
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let doc;
    if (type.value === "cash") {
        doc = new CashPayment(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new CardPayment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, "start");
    details.value = "";
    type.value = "";
    tofrom.value = "";
    amount.value = "";
});
