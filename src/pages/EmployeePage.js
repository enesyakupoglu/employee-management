import {LitElement, html} from 'lit';
import '../components/EmployeeList.js';
import {getLocalizedText} from '../localization/localization.js';

class EmployeePage extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', () => this.requestUpdate());
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', () => this.requestUpdate());
    super.disconnectedCallback();
  }

  render() {
    return html`
      <h2>${getLocalizedText('general.title')}</h2>
      <employee-list></employee-list>
    `;
  }
}

customElements.define('employee-page', EmployeePage);
