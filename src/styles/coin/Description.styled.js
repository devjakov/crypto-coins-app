import styled from "styled-components";

export const Description = styled.div`
background-color: #191B1F;
color: white;
font-size: 1.15rem;
text-align: left;
line-height: 2.25rem;
padding: 4rem 4rem;
border-radius: 1rem;

& a {
    color: #06D554;
}

& a:hover{
    text-decoration: underline;
}

& svg {
    display: block;
    margin: -1.5rem auto;
    padding-bottom: 3rem;
}
`