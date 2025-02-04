import {html, fixture, expect} from '@open-wc/testing';
import '../src/components/EmployeeForm.js';

describe('EmployeeForm Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
    await element.updateComplete;
  });

  it('should emit save-employee event when form is submitted with valid data', async () => {
    const form = element.shadowRoot.querySelector('form');
    expect(form).to.not.be.null;

    element.employee = {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '5551234567',
      employmentDate: '2023-01-01',
      birthDate: '1990-06-15',
      department: 'Tech',
      position: 'Senior',
    };

    await element.updateComplete;

    let eventTriggered = false;
    element.addEventListener('save-employee', (event) => {
      eventTriggered = true;
      expect(event.detail.firstName).to.equal('Alice');
      expect(event.detail.email).to.equal('alice@example.com');
    });

    form.dispatchEvent(new Event('submit', {bubbles: true, composed: true}));
    await element.updateComplete;

    expect(eventTriggered).to.be.true;
  });
});
