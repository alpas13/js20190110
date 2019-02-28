export default class Portfolio {
  constructor({element, balance}) {
    this._el = element;
    this._balance = balance;
    this._portfolioWorth = 0;

    this._render();
  }

  _addItem(item) {
    this._totalBuy = item.price * item.amount;

    if(this._balance < this._totalBuy) return;
    this._portfolioWorth += this._totalBuy;
    this._balance -= this._totalBuy;
    this._render();
  }

  _render() {
    this._el.innerHTML = `
      <div class="card-panel hoverable center-align">
          <p>
              Current balance: ${this._balance}
              <br />
              Portfolio Worth: ${this._portfolioWorth}
          </p>
      </div>
    `
  }
}