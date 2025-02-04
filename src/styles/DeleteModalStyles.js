import {css} from 'lit';

export const deleteModalStyles = css`
  :host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  h3 {
    color: #000066;
  }

  button {
    margin: 10px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
  }

  .confirm {
    background-color: #ff6200;
    color: white;
    border: none;
  }

  .cancel {
    background-color: #000066;
    color: white;
    border: none;
  }

  .modal {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, visibility 0.3s;
  }

  .modal.show {
    display: flex;
    visibility: visible;
    opacity: 1;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .modal-content button {
    margin: 10px;
  }
`;
