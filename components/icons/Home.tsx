interface IconProps {
  size?: number;
  color?: string;
}
const HomeIcon: React.FC<IconProps> = ({ size = 18 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width={size}
      height={size}
    >
      <path fill='none' d='M0 0h24v24H0z' />
      <path d='M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9z' />
    </svg>
  );
};
export default HomeIcon;
