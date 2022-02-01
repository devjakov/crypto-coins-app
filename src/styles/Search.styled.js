import styled from 'styled-components'

export const Search = styled.input`
    height: 43px;
    font: inherit;
    font-size: .9rem;
    color: white;
    background-color: #2C2F36;
    border-radius: .5rem;
    padding-left: 2rem;
    border: 1px solid #191B1F;
    outline: none;
    min-width: 100px;
    max-width: 730px;
    width: 100%;
    flex: 1;
    margin: auto;

    &:focus{
        border: 2px solid #707070;
        margin: auto -1px;
    }

    &::-webkit-input-placeholder{
        color:white;
        opacity: .9;
    }
`