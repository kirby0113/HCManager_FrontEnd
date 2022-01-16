import styled from 'styled-components';

const StyledSelectBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
  padding-bottom: 30px;
`;

const Label = styled.label``;

const Select = styled.select``;

export const UserSelectBox = (props) => {
  return (
    <StyledSelectBox>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Select id={props.id} onChange={props.onChange}>
        <option value='' key=''>
          -
        </option>
        {props.options.map((data) => (
          <option value={data.user_id} key={data.user_id}>
            {data.name}
          </option>
        ))}
      </Select>
    </StyledSelectBox>
  );
};
