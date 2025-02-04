import {html, fixture, expect} from '@open-wc/testing';
import '../src/components/DeleteModal.js';

describe('DeleteModal Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<delete-modal></delete-modal>`);
    element.isOpen = true;
    element.employee = {id: 1, firstName: 'John', lastName: 'Doe'};
    await element.updateComplete;
  });

  it('should emit delete-confirmed event when delete button is clicked', async () => {
    await element.updateComplete;

    const deleteButton = element.shadowRoot.querySelector('.confirm');
    expect(deleteButton).to.not.be.null;

    let eventTriggered = false;
    element.addEventListener('delete-confirmed', (event) => {
      eventTriggered = true;
      expect(event.detail.id).to.equal(1);
    });

    deleteButton.click();
    await element.updateComplete;
    expect(eventTriggered).to.be.true;
  });

  it('should emit close-modal event when cancel button is clicked', async () => {
    await element.updateComplete;

    const cancelButton = element.shadowRoot.querySelector('.cancel');
    expect(cancelButton).to.not.be.null;

    let eventTriggered = false;
    element.addEventListener('close-modal', () => {
      eventTriggered = true;
    });

    cancelButton.click();
    await element.updateComplete;
    expect(eventTriggered).to.be.true;
  });
});
