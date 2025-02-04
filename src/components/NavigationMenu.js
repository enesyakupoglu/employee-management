import {LitElement, html, css} from 'lit';
import {getLocalizedText} from '../localization/localization.js';

class NavigationMenu extends LitElement {
  static styles = css`
    .navigation-container {
      display: flex;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #000066;
      padding: 10px 20px;
    }
    a {
      color: white;
      text-decoration: none;
      font-size: 16px;
      padding: 10px;
    }
    a:hover {
      text-decoration: underline;
    }
    .language-selector {
      background: white;
      color: #000066;
      padding: 5px;
      border-radius: 5px;
      font-size: 14px;
    }
  `;

  constructor() {
    super();
    this.currentLang = localStorage.getItem('lang') || 'en';
  }

  setLanguage(event) {
    this.currentLang = event.target.value;
    document.documentElement.lang = this.currentLang;
    localStorage.setItem('lang', this.currentLang);

    window.dispatchEvent(new Event('language-changed'));

    this.requestUpdate();
  }

  render() {
    return html`
      <nav>
        <div class="navigation-container">
          <a href="/">${getLocalizedText('navigationMenu.home')}</a>
          <a href="/employees"
            >${getLocalizedText('navigationMenu.employees')}</a
          >
          <a href="/settings">${getLocalizedText('navigationMenu.settings')}</a>
        </div>
        <select class="language-selector" @change="${this.setLanguage}">
          <option value="en" ?selected="${this.currentLang === 'en'}">
            English
          </option>
          <option value="tr" ?selected="${this.currentLang === 'tr'}">
            Türkçe
          </option>
        </select>
      </nav>
    `;
  }
}

customElements.define('navigation-menu', NavigationMenu);
