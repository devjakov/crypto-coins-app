import styled from "styled-components";

export const SearchResult = styled.div`
width: 400px;
overflow: hidden;
height: 3rem;
font-weight: 300;
border-right:2px solid #707070;
border-left:2px solid #707070;
margin: auto -2px;

& a {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
}

& a img {
    margin-left: .75rem;
    display: flex;
    height: 55%;
}

&:hover {
    background-color: #494b52
}

&:last-child{
    border-radius: 0 0 .5rem .5rem;
    border: 2px solid #707070;
    border-top:none;
    margin: auto -2px;
}
`