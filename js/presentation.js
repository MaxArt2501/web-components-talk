customElements.define('support-table', class extends HTMLElement {
  static observedAttributes = [ 'chrome', 'firefox', 'safari' ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<table part="frame"><caption part="caption"><slot></slot></caption><thead><tr></tr></thead><tbody><tr></tr></tbody></table>`;
    this.updateContent();
  }

  attributeChangedCallback() {
    this.updateContent();
  }

  updateContent() {
    this.shadowRoot.querySelector('thead > tr').innerHTML =
      this.constructor.observedAttributes.map(environment => {
        return `<th part="header"><img part="icon" src="img/${environment}.svg" alt="${environment} logo"></th>`;
      }).join('');

    this.shadowRoot.querySelector('tbody > tr').innerHTML =
      this.constructor.observedAttributes.map(environment => {
        const value = this.getAttribute(environment);
        const partName = 'value ' + (value ? 'ok' : 'ko');
        return `<td part="${partName}">${value}</td>`;
      }).join('');
  }
});
