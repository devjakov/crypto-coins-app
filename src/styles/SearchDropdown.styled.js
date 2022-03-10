import styled from "styled-components";

export const SearchDropdown = styled.div`
position:absolute;
left:1rem;
top:52px;
color:white;
font-weight: 300;
background-color: #2C2F36;
z-index: 8;
border-top: none;
border-radius: 0 0 .5rem .5rem;
width: 400px;

& p {
    height: 40px;
    width: 100%
    background-color:green;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #707070;
    border-radius: 0 0 .5rem .5rem;
    border-top:none;
    margin: auto -2px;
}
`
