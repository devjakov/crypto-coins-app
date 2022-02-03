import styled from 'styled-components'

export const Select = styled.select`
background-color: #2C2F36;
color: white;
font: inherit;
font-weight: 500;
height: 45px;
border: none;
border-radius: 0.5rem;
padding: 0 1rem 0 2rem;
outline: none;
margin: auto 0;

* {
    text-align: center;
    background-color: green;
    padding-right: 2rem;
    border-radius: .5rem;
}

&:hover, &:active {
    border: 2px solid #707070;
    margin: auto -2px;
    cursor: pointer;
}

`