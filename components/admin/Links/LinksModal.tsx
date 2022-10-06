import { FormRow, SelectRow } from "../..";
import { useGlobalContext } from "../../../context/globalContext";
import { ModalLinksWrapper } from "../../../styles/wrappers";
import { CloseIcon } from "../../icons";
import SingleLink from "../../SingleLink";
const LinksModal: React.FC = () => {
  const {
    linkType,
    selectedLink,
    availableIcons,
    handleInputChange,
    handleFormSubmit,
    deleteItem,
    closeModal,
  } = useGlobalContext();

  return (
    <ModalLinksWrapper>
      <div className='modal'>
        <div className='close-icon' onClick={closeModal}>
          <CloseIcon />
        </div>
        <div className='editing-link'>
          <SingleLink classType={linkType} name={selectedLink.name} />
        </div>
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

          <button
            type='submit'
            className='btn confirm'
            onClick={handleFormSubmit}
          >
            Confirm
          </button>
        </form>
        <div
          className='btn delete'
          onClick={() => deleteItem(selectedLink._id, linkType)}
        >
          Deleted
        </div>
      </div>
    </ModalLinksWrapper>
  );
};

export default LinksModal;
