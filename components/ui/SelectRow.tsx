import { useGlobalContext } from "../../context/globalContext";
interface Props {
  name: string;
  formName: string;
  labelText?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    id: number;
    name: string;
  }[];
}

const SelectRow: React.FC<Props> = ({
  name,
  formName,
  handleChange,
  options,
}) => {
  const { selectedLink } = useGlobalContext();
  console.log(selectedLink.name);

  return (
    <div className='col-12'>
      <select
        defaultValue={selectedLink.name}
        name={name}
        id={formName}
        onChange={handleChange}
      >
        {options.map((icon: any) => {
          return (
            <option value={icon.name} key={icon.id}>
              {icon.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectRow;
