import {LitElement, html, css} from 'lit';
import {getLocalizedText} from '../localization/localization.js';

class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    nav a {
      display: block;
      width: 80%;
      max-width: 300px;
      color: white;
      background-color: #000066;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    nav a:hover {
      text-decoration: none;
      transform: translateY(-3px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
    }

    .logo {
      width: 350px;
      margin-bottom: 20px;
    }

    h1 {
      color: #000066;
      font-size: 24px;
    }

    p {
      color: #333;
      margin-top: 10px;
    }

    @media (min-width: 768px) {
      nav a {
        font-size: 20px;
        padding: 20px;
      }
    }

    @media (min-width: 1024px) {
      nav a {
        font-size: 22px;
        padding: 25px;
      }
    }
  `;

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
      <img class="logo" src="/src/assets/ing-logo.svg" alt="Logo" />
      <h1>${getLocalizedText('general.title')}</h1>
      <nav>
        <a href="/">${getLocalizedText('navigationMenu.home')}</a>
        <a href="/employees">${getLocalizedText('navigationMenu.employees')}</a>
        <a href="/settings">${getLocalizedText('navigationMenu.settings')}</a>
      </nav>
      <p>${getLocalizedText('settings.language')}: English</p>
    `;
  }
}

customElements.define('home-page', HomePage);
