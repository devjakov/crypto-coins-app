import styled from "styled-components";

export const Circle = styled.div`
background-color: ${({ color }) => color ? color : "white"};
border: ${({ borderColor }) => borderColor ? `${borderColor} 1.5px solid` : "none"};
box-shadow: ${({ borderColor }) => borderColor ? "rgba(6, 213, 84, 0) 0px 0px 10px -3px, rgba(6, 213, 84, .6) 0px 0px 10px -1px" : "none"};
border-radius: 50%;
height: .6rem;
width: .6rem;
margin:auto .5rem 0 0;
display: inline-block;
`
