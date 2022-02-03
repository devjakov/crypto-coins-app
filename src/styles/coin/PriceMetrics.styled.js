import styled from "styled-components";

export const PriceMetrics = styled.div`
background-color: #191B1F;
display: inline-flex;
flex-direction: column;
justify-content: center;
padding: 0 5rem;
border-radius: 1rem;
color: white;
height: 100%;
max-width: 33.33%;

& h1 {
    display: flex;
    justify-content: center;
    gap: 1rem; 
    
}

& h1 svg {
    padding-right: .5rem;
}

& h1 span {
    font-size: 1.25rem;
    display: flex;
    align-items: center;
}



& h3 {
    align-self: center;
    position: relative;
}

& h3 span{
    display: block;
    font-weight: 300;
}

& h3 span:nth-child(1) {
    display: inline;

}

& h3 svg {
    position: absolute;
    top: calc(50% - 6px);
    left: -2rem;
}

& h3 .fa-caret-up {
    color: #00FC2A;
}

& h3 .fa-caret-down {
    color: #FE1040;
}
`