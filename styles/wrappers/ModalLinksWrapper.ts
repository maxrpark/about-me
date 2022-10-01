import styled from "styled-components";

const ModalLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 16px;
  width: 90%;
  max-width: 500px;
  height: 375px;
  background: #ffffff; /*todo  variable*/
  box-shadow: 2px 10px 15px rgba(0, 0, 0, 0.25); /*todo  variable*/
  border-radius: 5px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .editing-link {
    margin-top: 3rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 38px 0;
  }

  input,
  select {
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
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
    color: white; /*todo change color*/
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
