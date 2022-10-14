import { FormRow, SelectRow, Spinner } from "../..";
import { useGlobalContext } from "../../../context/globalContext";
import { ModalLinksWrapper } from "../../../styles/wrappers";
import { CloseIcon } from "../../icons";
import SingleLink from "../../SingleLink";
const LinksModal: React.FC = () => {
  const {
    linkType,
    selectedLink,
    availableIcons,
    isFormSubmitted,
    isDeleting,
    isDisabled,
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
          <label className='preview'>Preview</label>
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
            disabled={isDisabled}
          >
            {isFormSubmitted ? <Spinner size={1.5} /> : "Confirm"}
          </button>
        </form>
        <button
          type='submit'
          className='btn delete'
          onClick={() => deleteItem(selectedLink._id, linkType)}
          disabled={isDisabled}
        >
          {isDeleting ? <Spinner size={1.5} /> : "Delete"}
        </button>
      </div>
    </ModalLinksWrapper>
  );
};

export default LinksModal;
