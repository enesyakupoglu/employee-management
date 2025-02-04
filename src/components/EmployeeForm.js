import {LitElement, html} from 'lit';
import {employeeFormStyles} from '../styles/EmployeeFormStyles';
import {globalStyles} from '../styles/globalStyles.js';
import {getLocalizedText} from '../localization/localization.js';

class EmployeeForm extends LitElement {
  static styles = [globalStyles, employeeFormStyles];

  static properties = {
    employee: {type: Object},
    employees: {type: Array},
    isEditing: {type: Boolean},
  };

  constructor() {
    super();
    this.employee = this.getEmptyEmployee();
    this.isEditing = false;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('employee') && this.employee) {
      this.employee = {...this.employee};
      this.isEditing = !!this.employee.id;
    }
  }

  getEmptyEmployee() {
    return {
      id: Date.now(),
      firstName: '',
      lastName: '',
      employmentDate: '',
      birthDate: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
  }

  handleInput(e) {
    this.employee = {...this.employee, [e.target.name]: e.target.value};
    this.requestUpdate();
  }

  saveEmployee(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      alert(getLocalizedText('employeeForm.validation.fillRequiredFields'));
      return;
    }

    const confirmUpdate = confirm(
      getLocalizedText('employeeForm.validation.confirmUpdate')
    );
    if (!confirmUpdate) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('save-employee', {
        detail: this.employee,
        bubbles: true,
        composed: true,
      })
    );

    this.employee = this.getEmptyEmployee();
    this.requestUpdate();
  }

  cancel() {
    this.dispatchEvent(
      new CustomEvent('close-form', {
        bubbles: true,
        composed: true,
      })
    );

    this.employee = this.getEmptyEmployee();
    this.requestUpdate();
  }

  validateForm() {
    const {firstName, lastName, phone, email, department, position, id} =
      this.employee;

    const nameRegex = /^[a-zA-ZğüşöçİĞÜŞÖÇ]+$/;
    const phoneRegex = /^[0-9+() -]{10,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
      alert(getLocalizedText('employeeForm.validation.invalidName'));
      return false;
    }

    if (!phone.match(phoneRegex)) {
      alert(getLocalizedText('employeeForm.validation.invalidPhone'));
      return false;
    }

    if (!email.match(emailRegex)) {
      alert(getLocalizedText('employeeForm.validation.invalidEmail'));
      return false;
    }

    if (!department) {
      alert(getLocalizedText('employeeForm.validation.selectDepartment'));
      return false;
    }

    if (!position) {
      alert(getLocalizedText('employeeForm.validation.selectPosition'));
      return false;
    }

    if (!this.employees || this.employees.length === 0) {
      return true;
    }

    const existingEmployee = this.employees.find((emp) => emp.id === id);

    if (existingEmployee && existingEmployee.email === email) {
      return true;
    }

    if (this.employees.some((emp) => emp.email === email && emp.id !== id)) {
      alert(getLocalizedText('employeeForm.validation.duplicateEmail'));
      return false;
    }

    return true;
  }

  render() {
    if (!this.employee) return html``;

    return html`
      <form @submit="${this.saveEmployee}">
        <label>${getLocalizedText('employeeForm.firstName')}</label>
        <input
          type="text"
          name="firstName"
          .value="${this.employee.firstName}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.lastName')}</label>
        <input
          type="text"
          name="lastName"
          .value="${this.employee.lastName}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.employmentDate')}</label>
        <input
          type="date"
          name="employmentDate"
          .value="${this.employee.employmentDate}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.birthDate')}</label>
        <input
          type="date"
          name="birthDate"
          .value="${this.employee.birthDate}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.phone')}</label>
        <input
          type="tel"
          name="phone"
          .value="${this.employee.phone}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.email')}</label>
        <input
          type="email"
          name="email"
          .value="${this.employee.email}"
          @input="${this.handleInput}"
          required
        />

        <label>${getLocalizedText('employeeForm.department')}</label>
        <select name="department" @change="${this.handleInput}" required>
          <option value="">
            -- ${getLocalizedText('employeeForm.selectDepartment')} --
          </option>
          <option
            value="Analytics"
            ?selected="${this.employee.department === 'Analytics'}"
          >
            ${getLocalizedText('employeeForm.analytics')}
          </option>
          <option
            value="Tech"
            ?selected="${this.employee.department === 'Tech'}"
          >
            ${getLocalizedText('employeeForm.tech')}
          </option>
        </select>

        <label>${getLocalizedText('employeeForm.position')}</label>
        <select name="position" @change="${this.handleInput}" required>
          <option value="">
            -- ${getLocalizedText('employeeForm.selectPosition')} --
          </option>
          <option
            value="Junior"
            ?selected="${this.employee.position === 'Junior'}"
          >
            ${getLocalizedText('employeeForm.junior')}
          </option>
          <option
            value="Medior"
            ?selected="${this.employee.position === 'Medior'}"
          >
            ${getLocalizedText('employeeForm.medior')}
          </option>
          <option
            value="Senior"
            ?selected="${this.employee.position === 'Senior'}"
          >
            ${getLocalizedText('employeeForm.senior')}
          </option>
        </select>

        <button type="submit" class="save">
          ${getLocalizedText('employeeForm.save')}
        </button>
        <button type="button" class="cancel" @click="${this.cancel}">
          ${getLocalizedText('employeeForm.cancel')}
        </button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
export {EmployeeForm};
