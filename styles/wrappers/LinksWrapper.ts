import styled from "styled-components";

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0.5rem;
  position: relative;

  .links-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0 auto;
  }

  .links-btn,
  .links-add {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    transition: var(--transition-1);
    box-shadow: var(--box-shadow-1);
    background: ${(props) => props.theme.buttonColor};
    position: relative;
    padding: 20px;
  }

  .social-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0 auto;
  }

  .social-btn,
  .social-add {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  .social-btn svg,
  .social-add {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    padding: 0.7rem;
    box-shadow: var(--box-shadow-1);
    background: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.textColor};
  }
  .pencil {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 36px;
    height: 36px;
    right: 8px;
    border-radius: 50%;
    background: white;
    background: var(--dark-primary-light);
  }
  .pencil svg {
    fill: ${(props) => props.theme.textColorSecondary};
  }
`;

export default LinkWrapper;
