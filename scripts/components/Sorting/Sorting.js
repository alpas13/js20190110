import Component from '../Component/Component.js';

export default class Sorting extends Component {
    constructor({element, data}) {
        super({element});
        this._render();

    }

    _initSortingModule() {
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