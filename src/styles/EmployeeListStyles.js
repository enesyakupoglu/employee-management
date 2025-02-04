import {css} from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
    padding: 16px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h2 {
    color: #000066;
    text-align: center;
    font-weight: bold;
  }
  .container {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }
  .add-button {
    display: block;
    margin: 10px auto;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #ff6200;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .add-button:hover {
    background-color: #cc4f00;
  }
  .view-toggle {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .view-toggle button {
    margin: 5px;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    transition: background 0.3s ease;
  }
  .table-view {
    background-color: #ff6200;
    color: white;
  }
  .list-view {
    background-color: #000066;
    color: white;
  }
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .search-bar input {
    padding: 8px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .pagination button {
    margin: 5px;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    border: none;
    transition: background 0.3s ease;
  }
  table,
  .list-container {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #000066;
    color: white;
  }
  .actions button {
    margin-right: 5px;
    padding: 8px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    transition: background 0.3s ease;
    border: none;
  }
  .edit {
    background-color: #ff6200;
    color: white;
    cursor: pointer;
  }
  .delete {
    background-color: #000066;
    color: white;
    cursor: pointer;
  }
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: white;
    margin: 3% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    align-self: center;
    justify-content: center;
    text-align: center;
  }

  .modal-content_form {
    width: 100%;
    padding: 20px;
    text-align: start;
  }

  .modal-content__close {
    align-self: flex-end;
    width: 5%;
  }
  .show {
    display: block;
  }

  .view-toggle {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
  }

  .view-toggle button {
    background: #001f5b;
    color: white;
    border: none;
    font-size: 16px;
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
    height: 60px;
    justify-content: center;
  }

  .view-toggle button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  .view-toggle button span {
    font-size: 16px;
    font-weight: bold;
  }

  .view-toggle button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
  }

  .add-button {
    background: #ff6600;
    color: white;
    border: none;
    font-size: 18px;
    font-weight: bold;
    padding: 14px 24px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, background 0.2s;
  }

  .add-button svg {
    width: 20px;
    height: 20px;
    fill: white;
  }

  .add-button:hover {
    background: #cc5200;
    transform: translateY(-3px);
  }
  @media (max-width: 768px) {
    .view-toggle {
      display: none;
    }
    table {
      display: none;
    }
  }
`;
