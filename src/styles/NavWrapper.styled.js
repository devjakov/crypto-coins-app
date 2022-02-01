import styled from "styled-components";

export const NavWrapper = styled.div`
    margin: auto;
    max-width: ${({ maxWidth }) => maxWidth}px;
    height: 100%;
    background-color: #191B1F;
    display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;

  & ul:nth-child(2) {
      padding: 0;
      max-width: 900px;
      flex: 1;
      justify-content: space-evenly;
  }
`