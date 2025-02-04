import {LitElement, html} from 'lit';
import {deleteModalStyles} from '../styles/DeleteModalStyles.js';
import {globalStyles} from '../styles/globalStyles.js';
import {getLocalizedText} from '../localization/localization.js';

class DeleteModal extends LitElement {
  static styles = [globalStyles, deleteModalStyles];

  static properties = {
    isOpen: {type: Boolean},
    employee: {type: Object},
  };

  constructor() {
    super();
    this.isOpen = false;
    this.employee = null;
  }

  confirmDelete() {
    if (!this.employee) return;
    this.dispatchEvent(
      new CustomEvent('delete-confirmed', {
        detail: {id: this.employee.id},
        bubbles: true,
        composed: true,
      })
    );

    this.close();
  }

  close() {
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('close-modal', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleOutsideClick(event) {
    if (event.target.classList.contains('modal')) {
      this.close();
    }
  }

  render() {
    return html`
      <div class="modal ${this.isOpen ? 'show' : ''}">
        <div class="modal-content">
          <h3>${getLocalizedText('deleteModal.areYouSure')}</h3>
          <p>
            ${getLocalizedText('deleteModal.confirmMessage')
              .replace('{name}', this.employee?.firstName || '')
              .replace('{surname}', this.employee?.lastName || '')}
          </p>
          <button class="confirm" @click="${this.confirmDelete}">
            ${getLocalizedText('deleteModal.proceed')}
          </button>
          <button class="cancel" @click="${this.close}">
            ${getLocalizedText('deleteModal.cancel')}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('delete-modal', DeleteModal);
export {DeleteModal};
