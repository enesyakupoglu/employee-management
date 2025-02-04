import {LitElement, html} from 'lit';
import {employeeListStyles} from '../styles/EmployeeListStyles.js';
import './EmployeeForm.js';
import './DeleteModal.js';
import {globalStyles} from '../styles/globalStyles.js';
import {Store} from '../utils/store.js';
import {getLocalizedText} from '../localization/localization.js';

class EmployeeList extends LitElement {
  static styles = [globalStyles, employeeListStyles];

  static properties = {
    employees: {type: Array},
    filteredEmployees: {type: Array},
    currentPage: {type: Number},
    itemsPerPage: {type: Number},
    searchQuery: {type: String},
    isTableView: {type: Boolean},
    showForm: {type: Boolean},
    selectedEmployee: {type: Object},
    showDeleteModal: {type: Boolean},
    employeeToDelete: {type: Object},
  };

  constructor() {
    super();
    this.employees = Store.loadEmployees();
    this.filteredEmployees = [...this.employees];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.searchQuery = '';
    this.isTableView = true;
    this.showForm = false;
    this.selectedEmployee = this.getEmptyEmployee();
    this.showDeleteModal = false;
    this.employeeToDelete = null;

    this.languageChangeHandler = () => this.requestUpdate();
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

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('language-changed', this.languageChangeHandler);
  }

  disconnectedCallback() {
    window.removeEventListener('language-changed', this.languageChangeHandler);
    super.disconnectedCallback();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  searchEmployees(event) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((emp) =>
      Object.values(emp).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery)
      )
    );
  }

  addEmployee() {
    this.selectedEmployee = this.getEmptyEmployee();
    this.showForm = true;
    this.requestUpdate();
  }

  editEmployee(id) {
    const employee = this.employees.find((emp) => emp.id === id);
    this.selectedEmployee = employee ? {...employee} : this.getEmptyEmployee();
    this.showForm = true;
  }

  saveEmployee(event) {
    const updatedEmployee = event.detail;

    const normalizedEmail = updatedEmployee.email.trim().toLowerCase();

    if (
      this.employees.some(
        (emp) =>
          emp.email.trim().toLowerCase() === normalizedEmail &&
          emp.id !== updatedEmployee.id
      )
    ) {
      alert('This email is already registered! Please use a different email.');
      return;
    }

    const index = this.employees.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      this.employees[index] = {...this.employees[index], ...updatedEmployee};
    } else {
      this.employees = [...this.employees, updatedEmployee];
    }

    Store.saveEmployees(this.employees);
    this.filteredEmployees = [...this.employees];
    this.requestUpdate();
    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.selectedEmployee = this.getEmptyEmployee();
  }

  confirmDeleteEmployee(id) {
    this.employeeToDelete = this.employees.find((emp) => emp.id === id);
    this.showDeleteModal = true;
  }

  deleteEmployee(event) {
    const employeeId = event.detail.id;
    this.employees = this.employees.filter((emp) => emp.id !== employeeId);
    this.filteredEmployees = [...this.employees];

    Store.saveEmployees(this.employees);
    this.showDeleteModal = false;
    this.employeeToDelete = null;
    this.requestUpdate();
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
    this.requestUpdate();
  }

  nextPage() {
    if (
      this.currentPage <
      Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    ) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  firstUpdated() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    if (window.innerWidth <= 768) {
      this.isTableView = false;
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="container">
        <h2>${getLocalizedText('employeeList.title')}</h2>
        <div>
          <div class="view-toggle">
            <button
              class="${this.isTableView ? 'table-view active' : 'table-view'}"
              @click="${() => (this.isTableView = true)}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 3h18v18H3z" />
              </svg>
              <span>${getLocalizedText('employeeList.tableView')}</span>
            </button>
            <button
              class="${!this.isTableView ? 'list-view active' : 'list-view'}"
              @click="${() => (this.isTableView = false)}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
                />
              </svg>
              <span>${getLocalizedText('employeeList.listView')}</span>
            </button>
          </div>
          <button class="add-button" @click="${this.addEmployee}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
              />
            </svg>
            ${getLocalizedText('employeeList.addButton')}
          </button>
          <div class="search-bar">
            <input
              type="text"
              placeholder="${getLocalizedText(
                'employeeList.searchPlaceholder'
              )}"
              @input="${this.searchEmployees}"
            />
          </div>
        </div>

        ${this.isTableView
          ? html`
              <table>
                <thead>
                  <tr>
                    <th>${getLocalizedText('employeeList.firstName')}</th>
                    <th>${getLocalizedText('employeeList.lastName')}</th>
                    <th>${getLocalizedText('employeeList.employmentDate')}</th>
                    <th>${getLocalizedText('employeeList.birthDate')}</th>
                    <th>${getLocalizedText('employeeList.phone')}</th>
                    <th>${getLocalizedText('employeeList.email')}</th>
                    <th>${getLocalizedText('employeeList.department')}</th>
                    <th>${getLocalizedText('employeeList.position')}</th>
                    <th>${getLocalizedText('employeeList.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.paginatedEmployees.map(
                    (emp) => html`
                      <tr>
                        <td>${emp.firstName}</td>
                        <td>${emp.lastName}</td>
                        <td>${emp.employmentDate}</td>
                        <td>${emp.birthDate}</td>
                        <td>${emp.phone}</td>
                        <td>${emp.email}</td>
                        <td>${emp.department}</td>
                        <td>${emp.position}</td>
                        <td>
                          <button
                            class="edit"
                            @click="${() => this.editEmployee(emp.id)}"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M12 20h9" />
                              <path
                                d="M16.5 3.5a2.12 2.12 0 0 1 3 0 2.12 2.12 0 0 1 0 3L7 19l-4 1 1-4Z"
                              />
                            </svg>
                          </button>
                          <button
                            class="delete"
                            @click="${() => this.confirmDeleteEmployee(emp.id)}"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path
                                d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                              />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                              <path d="M5 6h14l-1 14H6L5 6Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `
          : ''}
        ${!this.isTableView
          ? html`
              <div class="list-container">
                ${this.paginatedEmployees.map(
                  (emp) => html`
                    <div class="list-item">
                      <div class="list-item__details">
                        <strong>${emp.firstName} ${emp.lastName}</strong>
                        <p>
                          📅 ${getLocalizedText('employeeList.employmentDate')}:
                          ${emp.employmentDate}
                        </p>
                        <p>
                          🎂 ${getLocalizedText('employeeList.birthDate')}:
                          ${emp.birthDate}
                        </p>
                        <p>
                          📞 ${getLocalizedText('employeeList.phone')}:
                          ${emp.phone}
                        </p>
                        <p>
                          📧 ${getLocalizedText('employeeList.email')}:
                          ${emp.email}
                        </p>
                        <p>
                          🏢 ${getLocalizedText('employeeList.department')}:
                          ${emp.department}
                        </p>
                        <p>
                          📌 ${getLocalizedText('employeeList.position')}:
                          ${emp.position}
                        </p>
                      </div>
                      <div class="list-item__actions">
                        <button
                          class="edit"
                          @click="${() => this.editEmployee(emp.id)}"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path
                              d="M16.5 3.5a2.12 2.12 0 0 1 3 0 2.12 2.12 0 0 1 0 3L7 19l-4 1 1-4Z"
                            />
                          </svg>
                        </button>
                        <button
                          class="delete"
                          @click="${() => this.confirmDeleteEmployee(emp.id)}"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M5 6h14l-1 14H6L5 6Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          : ''}

        <div class="pagination">
          <button
            @click="${this.prevPage}"
            ?disabled="${this.currentPage === 1}"
          >
            ${getLocalizedText('employeeList.previous')}
          </button>
          <button
            @click="${this.nextPage}"
            ?disabled="${this.currentPage >=
            Math.ceil(this.filteredEmployees.length / this.itemsPerPage)}"
          >
            ${getLocalizedText('employeeList.next')}
          </button>
        </div>

        ${this.showDeleteModal
          ? html`
              <delete-modal
                .isOpen="${this.showDeleteModal}"
                .employee="${this.employeeToDelete}"
                @delete-confirmed="${this.deleteEmployee}"
                @close-modal="${this.cancelDelete}"
              ></delete-modal>
            `
          : ''}
        ${this.showForm
          ? html`
              <div class="modal show">
                <div class="modal-content">
                  <button
                    class="modal-content__close"
                    @click="${this.closeForm}"
                  >
                    ❌
                  </button>
                  <employee-form
                    .employee="${this.selectedEmployee}"
                    @close-form="${this.closeForm}"
                    @save-employee="${this.saveEmployee}"
                  ></employee-form>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
export {EmployeeList};
