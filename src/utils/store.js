import {employees} from '../data/employees.js';

export class Store {
  static loadEmployees() {
    let storedEmployees = JSON.parse(localStorage.getItem('employees'));

    if (!storedEmployees || storedEmployees.length === 0) {
      storedEmployees = employees;
      Store.saveEmployees(storedEmployees);
    }

    return storedEmployees;
  }

  static saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
  }
}
