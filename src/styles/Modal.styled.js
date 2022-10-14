import styled from "styled-components";

export const Modal = styled.div`
z-index: ${({ show }) => (show ? 99 : -99)};
display: ${({ show }) => (show ? 'block' : 'none')};
position: fixed;
top: 0;
left: 0;
height: 100vh;
width:100vw;
background: rgba(27, 29, 35, .5)
`