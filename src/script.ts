//INTERFACES Enforces format structure//

interface HasFormatter {
  format(): string;
}

//PAYMENT STRUCTURE

/*CASH*/

class CashPayment implements HasFormatter {
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }

  format() {
    return `${this.client} has payed £${this.amount} for ${this.details}`;
  }
}

/*CARD*/

class CardPayment implements HasFormatter {
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number) {
    this.client = c;
    this.details = d;
    this.amount = a;
  }

  format() {
    return `${this.client} has payed £${this.amount} for ${this.details}`;
  }
}

//GRABING FORM
const form = document.querySelector(".new-item-form") as HTMLFormElement;

//GRABBING INPUTS
const type = document.querySelector("#type") as HTMLSelectElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;
const tracker = document.querySelector(".item-list") as HTMLElement;

//OUTPUUTING LIST TEMPLATE

class ListTemplate {
  constructor(private container: HTMLUListElement) {}
  render(item: HasFormatter, heading: string, position: "start" | "end") {
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    h4.innerText = heading;
    li.append(h4);

    const p = document.createElement("p");
    p.innerText = item.format();
    li.append(p);

    if (position === "start") {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }
}

//USER EVENT, GRABBING VALUE & OUTPUTTING AS LIST

const ul = document.querySelector("ul")!;
const list = new ListTemplate(ul);

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let doc: HasFormatter;
  if (type.value === "cash") {
    doc = new CashPayment(tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new CardPayment(tofrom.value, details.value, amount.valueAsNumber);
  }

  list.render(doc, type.value, "start");
  details.value = "";
  type.value = "";
  tofrom.value = "";
  amount.value = "";
});
