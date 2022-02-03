import styled from "styled-components";

export const RadioLabel = styled.label`
display: inline-flex;
gap: .5rem;
align-items: center;
justify-content: center;
font-size: 1rem;
color: white;
font-weight: 300;
cursor:pointer;


& input {
    display: none;
}

& div {
    width: 1.75rem;
    height: 1.75rem;
    outline: 1px solid #06D554;
    border-radius: 50%;
    position: relative;
}

& div::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    transform:translate(-50%,-50%);
    display: block;
    border-radius: 50%;
    background-color: #06D554;
    box-shadow: 0px 0px 10px rgba(6, 213, 84, 1);
    transform: scale(0);
    transition: transform 0.1s;
}

& input:checked + div::after {
    transform: scale(1.01);
}

`