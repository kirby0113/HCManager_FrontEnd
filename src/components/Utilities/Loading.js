import styled from 'styled-components';

const StyledLoadingWindow = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  color: black;
`;

export const LoadingWindow = () => {
  return <StyledLoadingWindow>ロード中...</StyledLoadingWindow>;
};
