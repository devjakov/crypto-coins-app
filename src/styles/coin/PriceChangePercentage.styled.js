import styled from "styled-components";

export const PriceChangePercentage = styled.span`
color: ${({ price }) => price >= 0 ? "#00FC2A" : "#FE1040"};
`