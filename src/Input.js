import styled from "styled-components";

const InputContainer = styled.div`
  height: 40px;
  display: flex;
  border-radius: 3px;
  overflow: hidden;
`;
const InputSearch = styled.input`
  background-color: #fae3e4;
  outline: none;
  border: none;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Input = ({ className, suffix, ...others }) => {
  return (
    <InputContainer className={className}>
      <InputSearch {...others} />
      {suffix}
    </InputContainer>
  );
};

export default Input;
