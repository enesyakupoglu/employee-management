import {css} from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
    padding: 16px;
    width: 100%;
    max-width: 400px;
    margin: auto;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  button {
    margin-top: 10px;
  }
  label {
    margin-top: 10px;
    font-weight: bold;
    color: #000066;
  }
  input,
  select {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  button {
    margin-top: 15px;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  .save {
    background-color: #ff6200;
    color: white;
    border: none;
  }
  .cancel {
    background-color: #000066;
    color: white;
    border: none;
  }
`;
