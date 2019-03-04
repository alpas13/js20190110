import Component from '../Component/Component.js';

export default class Sorting extends Component {

    constructor({element, data}) {
        super({element});
        this._render();
        this._data = data;

        document.addEventListener('mousedown', e => this._getSelectedValues(e));

    }

    _getSelectedValues(e) {
        let target = e.target;
        if (!target.closest('.sorting')) return;
        if (target.innerHTML === '') return;
        const sortField = target.innerHTML.toLowerCase();

        this._data.sort(this._byField(sortField));

        let customEvent = new CustomEvent('sortActivated', {
            detail: this._data,
        });

        this._el.dispatchEvent(customEvent);

    }

    _byField(fieldName) {
        return (a, b) => {
            if(fieldName === ('price' || 'rank')) {
                return +a[fieldName] > +b[fieldName] ? 1 : -1;
            }
            return a[fieldName] > b[fieldName] ? 1 : -1;

        }
    };

    _initSortingModule()
    {
        this.elems = document.querySelectorAll('select');
        this.instances = M.FormSelect.init(this.elems);
    }

    _render() {
        this._el.innerHTML = `
    <select>
        <option value="Sorting" disabled selected>Sorting</option>
        <option value="Name">Name</option>
        <option value="Symbol">Symbol</option>
        <option value="Rank">Rank</option>
        <option value="Price">Price</option>
    <label>Sorting Select</label>
    </select>`;
        this._initSortingModule();
    }
}