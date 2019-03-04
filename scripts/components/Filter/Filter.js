import Component from '../Component/Component.js';

export default class Filter extends Component {
    constructor({element, data}) {
        super({element});
        this._render(data);
        this._aktivFilter = null;

        document.addEventListener('click', e => this._getSelectedValues(e));
    }

    _initFilterModule() {
        this.elems = document.querySelectorAll('select');
        this.instances = M.FormSelect.init(this.elems);
    }

    _getSelectedValues() {
        let selectedCoins = this._el.querySelectorAll('.filter .selected > span > label > span');

        selectedCoins = Object.values(selectedCoins).map(item => item.innerHTML);

        if ((!this._aktivFilter || this._aktivFilter.join('') !== selectedCoins.join('')) && selectedCoins.length) {
            let customEvent = new CustomEvent('filterActivated', {
                detail: selectedCoins,
            });

            this._el.dispatchEvent(customEvent);
            this._aktivFilter = selectedCoins;
        }

        if (!selectedCoins.length && this._aktivFilter) {
            let customEvent = new CustomEvent('filterActivated', {
                detail: selectedCoins,
            });

            this._el.dispatchEvent(customEvent);
            this._aktivFilter = null;
        }

    }

    _render(data) {
        this._el.innerHTML = `
    <select multiple>
        <option value="" disabled>Filter</option>
            ${data.map(coin => `
                  <option value="${coin.id}">${coin.name}</option>
            `).join('')}
    <label>Filter Select</label>
    </select>`;
        this._initFilterModule();
    }
}