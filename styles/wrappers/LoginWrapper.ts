import styled from "styled-components";

const LoginWrapper = styled.main`
  display: grid;
  place-content: center;
  height: 90vh;
  grid-template-columns: 1fr;
  .title {
    text-align: center;
    font-weight: 400;
    font-size: 66px;
  }

  .btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.2rem;
    height: 50px;
    background: #e3f2fd;
    border: none;
    font-weight: 600;
    font-size: 29px;
    line-height: 35px;
    text-transform: capitalize;
  }
`;

export default LoginWrapper;
