import styled from 'styled-components'

export const Search = styled.input`
    height: 43px;
    font: inherit;
    font-size: .9rem;
    color: white;
    background-color: #2C2F36;
    border:none;
    border-radius: .5rem;
    padding-left: 2rem;
    min-width: 100px;
    max-width: 730px;
    width: 100%;
    flex: 1;
    margin: auto;
    

    &:focus{
        outline: 2px solid #707070;
        margin: auto;
        z-index: 5;
    }

    &::-webkit-input-placeholder{
        color:white;
        font-weight: 500;
        opacity: .9;
    }
`