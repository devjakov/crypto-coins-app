import styled from "styled-components";

export const CurrencyConverterWrapper = styled.div`
color: white;
display: flex;
flex-direction: row;
justify-content: space-between;
max-width: 600px;
margin:auto;

& p {
    background-color: #06D554;
    margin: auto;
    min-width: 5rem;
    text-align:center;
    border-radius: .5rem 0 0 .5rem;
    font-weight: 700;
}

& div{
    display: flex;
    height: 2.8rem;
    background-color: #06D554;
    border-radius: .5rem;
    width: 40%;
}

& input {
    border:none;
    width: 100%;
    padding-left: 1rem;
    border-radius:0 .5rem .5rem 0 ;
    color: white;
    background-color: #2C2D33;
}

& input:focus{
    outline:none;
}

& div:focus-within {
    outline: #06D554 1px solid;
    outline-offset: 2px;
}
`