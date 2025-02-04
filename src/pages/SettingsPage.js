import {LitElement, html, css} from 'lit';
import {getLocalizedText} from '../localization/localization.js';

class SettingsPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
    }

    .setting {
      margin-bottom: 20px;
    }

    .setting label {
      display: block;
      margin-bottom: 5px;
    }

    .setting input,
    .setting select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
    }

    .setting button {
      background-color: #000066;
      color: white;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;
    }

    .setting button:hover {
      background-color: #333399;
    }
  `;

  static properties = {
    currentLang: {type: String},
    theme: {type: String},
  };

  constructor() {
    super();
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.theme = localStorage.getItem('theme') || 'light';
  }

  setLanguage(event) {
    this.currentLang = event.target.value;
    document.documentElement.lang = this.currentLang;
    localStorage.setItem('lang', this.currentLang);

    window.dispatchEvent(new Event('language-changed'));

    this.requestUpdate();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);

    document.body.classList.toggle('dark-theme', this.theme === 'dark');
    document.body.classList.toggle('light-theme', this.theme === 'light');

    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        <div class="setting">
          <label>${getLocalizedText('settings.language')}</label>
          <select @change="${this.setLanguage}">
            <option value="en" ?selected="${this.currentLang === 'en'}">
              English
            </option>
            <option value="tr" ?selected="${this.currentLang === 'tr'}">
              Türkçe
            </option>
          </select>
        </div>

        <div class="setting">
          <label>${getLocalizedText('settings.theme')}</label>
          <button @click="${this.toggleTheme}">
            ${this.theme === 'light'
              ? getLocalizedText('settings.enableDarkMode')
              : getLocalizedText('settings.enableLightMode')}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('settings-page', SettingsPage);
