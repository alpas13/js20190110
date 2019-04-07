import Component from '../Component/Component.js';

export default class Filter extends Component {
    constructor({ element }) {
        super({ element });
        this._el = element;

        this._render();

        this._el.addEventListener('input', debounce(e => {
            let value = e.target.value;
            let filterEvent = new CustomEvent('filter', { detail: value.toLowerCase() })
            this._el.dispatchEvent(filterEvent);
        }, 500))
    }

    _render() {
        this._el.innerHTML = `
      <div class="input-field col s4">
          <input type="text">
          <label for="first_name">Filter</label>
      </div>
    `
    }
}

function debounce(f, delay) {
    let timerId;
    return function wrapper(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            f.apply(this, args);
        }, delay);
    }
}