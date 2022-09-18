import styled from "styled-components";

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .links-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }

  .links-btn,
  .links-add {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: 10px;
    transition: all 0.3s linear;
  }

  .social-container {
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }
`;

export default LinkWrapper;
