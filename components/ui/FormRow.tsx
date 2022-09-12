interface Props {
    name: string;
    type: string;
    value: string;
    formName: string;
    labelText?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: React.FC<Props> = ({
    name,
    type,
    value,
    formName,
    handleChange,
}) => {
    return (
        <div className='col-12'>
            <input
                type={type}
                value={value}
                name={name}
                id={formName}
                className='form-control'
                placeholder={name}
                onChange={handleChange}
                required
            />
        </div>
    );
};

export default FormRow;
