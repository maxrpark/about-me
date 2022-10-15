import styled from "styled-components";

const ModalLinksWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(33, 33, 33, 0.8);

  .modal {
    /* max-width: 500px; */
    height: 375px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px 16px;
    width: 90%;
    background: var(--color-white-1);
    box-shadow: 2px 10px 15px rgba(0, 0, 0, 0.25); /*todo  variable*/
    border-radius: 5px;
    background: ${(props) => props.theme.bgColor};
  }

  .editing-link {
    margin-top: 2rem;
    width: 100%;
    min-height: 75px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .preview {
    display: block;
    /* margin-bottom: 0.5rem; */
    font-size: 1rem;
    text-align: center;
  }

  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 8px;
    gap: 8px;
    width: 100%;
    height: 36px;
    border: none;
    margin: 0 auto;
    /* confirm */
    background: #59ffa0; /*todo change color*/
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25); /*todo  variable*/
    border-radius: 5px;
  }

  .delete {
    background: #d64045;
    width: 120px;
    color: var(--color-white-1);
  }
  .btn:disabled {
    opacity: 0.6;
  }

  .close-icon {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .close-icon svg {
    width: 25px;
    height: 25px;
  }
`;

export default ModalLinksWrapper;
