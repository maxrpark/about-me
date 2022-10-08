import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  size: number;
  border?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 1.5 }) => {
  return <SpinnerWrapper size={size} border={size}></SpinnerWrapper>;
};

const animation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerWrapper = styled.div<SpinnerProps>`
  width: ${(props) => `${props.size}rem`};
  height: ${(props) => `${props.size}rem`};
  border: ${(props) => `${props.border}px`} solid
    ${(props) => props.theme.buttonColor};
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.bgColor};
  animation: ${animation} 0.6s linear infinite;

  margin: 0 auto;
`;
export default Spinner;
