import styled from 'styled-components';

const StyledCodeBoard = styled.div`
  padding: 15px;
  color: white;
  background-color: black;
  border: 2px solid 
  border-radius: 20px;
  width: 80%;
  height:300px;
  overflow-y:scroll;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px 0;
  letter-spacing: 1px;
  font-size:18px;
`;

const CodeBlank = styled.span`
  padding: 0 3px;
`;

export const CodeBoard = (props) => {
  return (
    <StyledCodeBoard>
      {props.code.split('\n').map((code, index) => (
        <div key={index}>
          {code.split(' ').map((char, index) => (
            <span key={index}>
              {char}
              <CodeBlank></CodeBlank>{' '}
            </span>
          ))}
        </div>
      ))}
    </StyledCodeBoard>
  );
};
