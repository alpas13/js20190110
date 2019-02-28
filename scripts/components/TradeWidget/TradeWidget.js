export default class TradeWidget {
  constructor({element, onConfirm, balance}) {
    this._el = element;
    this._onConfirmCallback = onConfirm;
    this._currentBalance = balance;
    this._currentAmount = null;

    this._el.addEventListener('input', (e) => {
      if (!e.target.closest('#amount')) return;

      if (Number.isNaN(+e.target.value) === true) {
        e.target.value = this._currentAmount;
      }

      if (this._currentBalance < (this._currentItem.price * +e.target.value)) {
        e.target.value = this._currentAmount;
      } else this._calcAmount(e.target.value);

    });

    this._el.addEventListener('click', e => this._onButtonClick(e));
  }

  close() {
    this._el.querySelector('.modal').classList.remove('open');
    this._updateAmount();
  }

  _onButtonClick(e) {
    const close = e.target.closest('[data-action="close"]');
    const buy = e.target.closest('[data-action="buy"]');
    if (close) {
      this.close();
    } else if (buy) {
      this._currentItem.amount = this._amount;
      const item = this._currentItem;

      this._onConfirmCallback(item);
      this._updateBalance();
      this._updateAmount();
      this.close();
    }
  }

  trade(item) {
    this._currentItem = item;
    this._total = 0;

    this._render(item);
  }

  _calcAmount(targetValue) {
    const value = targetValue;
    this._amount = Number(value);
    this._total = this._currentItem.price * Number(value);
    this._updateDisplay(this._total);
    this._currentAmount = value;
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector("#item-total");
    this._totalEl.textContent = value;
  }

  _updateBalance() {
    this._currentBalance -= this._currentItem.price * this._currentItem.amount;
  }

  _updateAmount() {
    this._currentAmount = null;
  }

  _render(item) {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${item.name}:</h4>
          <p>
            Current price: ${item.price}. Total: <span id="item-total">${this._total}</span>
          </p>

          <div class="row">
            <form class="col s12">
                <div class="input-field col s4">
                    <input id="amount" type="text">
                    <label for="amount">Amount</label>
                </div>
            </form>
            </div>
        </div>
        
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat" data-action="buy">Buy</a>
          <a href="#!" class="modal-close waves-effect waves-teal btn-flat" data-action="close">Cancel</a>
        </div>
    </div>
    `
  }
}