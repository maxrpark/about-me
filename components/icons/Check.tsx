interface IconProps {
  size?: number;
  color?: string;
}
const Check: React.FC<IconProps> = ({ size = 18, color = "back" }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill={color}
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' />
    </svg>
  );
};
export default Check;
