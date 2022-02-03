import styled from "styled-components";

export const Price = styled.p`
display: flex;
margin: .5rem .5rem;
gap: .15rem;
align-items: center;
color: ${({ price }) => price >= 0 ? "#00FC2A" : "#FE1040"};
`