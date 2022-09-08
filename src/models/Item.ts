export default class Item {
  name: string = "";
  type: string = "";
  cost: number = 0;
  amountLeft: number = 0;

  constructor(name: string, type: string, cost: number, amountLeft: number) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.amountLeft = amountLeft;
  }
}
