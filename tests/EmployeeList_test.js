import {html, fixture, expect} from '@open-wc/testing';
import '../src/components/EmployeeList.js';

describe('EmployeeList Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
    element.employees = [];
    element.filteredEmployees = [];
    element.currentPage = 1;
    await element.updateComplete;
  });

  it('should render the component', async () => {
    expect(element).to.exist;
    expect(element.shadowRoot.querySelector('.container')).to.exist;
  });

  it('should add a new employee', async () => {
    const newEmployee = {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
    };

    element.saveEmployee({detail: newEmployee});
    await element.updateComplete;

    expect(element.employees.length).to.equal(1);
    expect(element.employees[0].firstName).to.equal('Alice');
  });

  it('should filter employees by search query', async () => {
    element.employees = [
      {id: 1, firstName: 'Alice', lastName: 'Brown'},
      {id: 2, firstName: 'Bob', lastName: 'Smith'},
    ];
    element.filteredEmployees = [...element.employees];

    const searchInput = element.shadowRoot.querySelector('.search-bar input');
    searchInput.value = 'Alice';
    searchInput.dispatchEvent(new Event('input'));
    await element.updateComplete;

    expect(element.filteredEmployees.length).to.equal(1);
    expect(element.filteredEmployees[0].firstName).to.equal('Alice');
  });

  it('should paginate correctly', async () => {
    element.employees = Array.from({length: 20}, (_, i) => ({
      id: i + 1,
      firstName: `Test${i + 1}`,
    }));
    element.filteredEmployees = [...element.employees];
    await element.updateComplete;

    expect(element.paginatedEmployees.length).to.equal(10);
    element.nextPage();
    await element.updateComplete;

    expect(element.currentPage).to.equal(2);
    expect(element.paginatedEmployees.length).to.equal(10);
  });
});
