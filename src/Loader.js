import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 8rem auto;
`;

const rotate = keyframes`
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
`;

const LoaderImage = styled.div`
  border: 20px solid #f3f3f3;
  border-radius: 50%;
  border-top: 20px solid #1ecaac;
  width: 180px;
  height: 180px;
  margin: auto;
  animation: ${rotate} 2s linear infinite;
`;

const Title = styled.h2`
  margin: 50px auto;
  text-align: center;
  color: #404c4a;
`;

const Loader = ({ message }) => {
  return (
    <LoaderContainer>
      <LoaderImage />
      <Title>{message}</Title>
    </LoaderContainer>
  );
};

export default Loader;
