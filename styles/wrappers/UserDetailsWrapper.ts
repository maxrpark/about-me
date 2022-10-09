import styled from "styled-components";

const UserDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  .user-image {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
  }
`;

export default UserDetailsWrapper;
