import { FormRow, SelectRow } from "../..";
import { useGlobalContext } from "../../../context/globalContext";

const LinksModal: React.FC = () => {
  const {
    linkType,
    selectedLink,
    availableIcons,
    handleInputChange,
    handleFormSubmit,
    deleteItem,
  } = useGlobalContext();
  return (
    <div className='modal'>
      <form>
        {linkType === "social" ? (
          <SelectRow
            name={"name"}
            formName={"selectedLink"}
            handleChange={handleInputChange}
            options={availableIcons}
          />
        ) : (
          <FormRow
            name='name'
            type='text'
            formName='selectedLink'
            value={selectedLink.name}
            handleChange={handleInputChange}
          />
        )}
        <FormRow
          name='url'
          type='text'
          formName='selectedLink'
          value={selectedLink.url}
          handleChange={handleInputChange}
        />

        <button type='submit' className='btn' onClick={handleFormSubmit}>
          Confirm
        </button>
      </form>
      <div
        className='btn'
        onClick={() => deleteItem(selectedLink.id, linkType)}
      >
        Deleted
      </div>
    </div>
  );
};

export default LinksModal;
