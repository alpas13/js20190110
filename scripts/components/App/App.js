import Table from '../Table/Table.js';
import Portfolio from '../Portfolio/Portfolio.js';
import TradeWidget from '../TradeWidget/TradeWidget.js';
import DataService from '../../services/DataService.js';
import Filter from '../Filter/Filter.js';
import Sorting from '../Sorting/Sorting.js';

export default class App {
  constructor({ element }) {
    this._el = element;
    this._userBalance = 10000;

    this._render();

    DataService.getCurrencies((data) => {
      this._data = data;
      this._initTable(this._data);
      this._initSorting(this._data);
      this._initFilter(this._data);
    });

    this._initPortfolio();
    this._initTradeWidget();

  }

  _initTable(data) {
    this._table = new Table({
      data,
      element: this._el.querySelector('[data-element="table"]'),
    });

    this._table.on('rowClick', e => {
      this._tradeItem(e.detail);
    });
  }

  _initPortfolio() {
    this._portfolio = new Portfolio({
      element: this._el.querySelector('[data-element="portfolio"]'),
      balance: this._userBalance,
    });
  }

  _initTradeWidget() {
    this._tradeWidget = new TradeWidget({
      element: this._el.querySelector('[data-element="trade-widget"]'),
    });

    this._tradeWidget.on('buy', e => {
      const { item, amount } = e.detail;
      this._portfolio.addItem(item, amount);
    });
  }

  _initFilter(data) {
    this._filter = new Filter({
      element : this._el.querySelector('[data-element="filter"]'),
      data,
    });
    this._filter.on('filterActivated', e => {
      let options = e.detail;
      if(!options.length) this._table._render(data);
      else {
        options = options.map(item => {
          return data.find(coin => coin.name === item);
        });
        this._table._render(options);
      }
    });
  }

  _initSorting(data) {
    this._sorting = new Sorting({
      element : this._el.querySelector('[data-element="sorting"]'),
      data
    });
    this._sorting.on('sortActivated', e => {
      let options = e.detail;
      if(!options) return;

      this._table._render(options);
    });
  }

  _tradeItem(id) {
    const coin = this._data.find(coin => coin.id === id);
    this._tradeWidget.trade(coin);
  }

  _render() {
    this._el.innerHTML = `
      <div class="row">
          <div class="col s12">
              <h1>Tiny Crypto Market</h1>
          </div>
      </div>
      <div class="table-section">
          <div class="table-options">
              <div class="filter">
                <div data-element="filter" class="input-field col s12"></div>
              </div>
              <div class="sorting">
                <div data-element="sorting" class="input-field col s12"></div>
              </div>
          </div>
          <div class="row portfolio-row">
              <div class="col s6 offset-s6" data-element="portfolio"></div>
          </div>
      </div>
      <div class="row">
          <div class="col s12" data-element="table"></div>
      </div>
      <div data-element="trade-widget"></div>
    `
  }
}