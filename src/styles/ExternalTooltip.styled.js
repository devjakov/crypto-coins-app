import styled from "styled-components";

export const ExternalTooltip = styled.div`
color:white;
position: absolute;
top: 1.25rem;
left: 2rem;


    & h1 {
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
    }

    & h1 + p {
        font-size: 1.5rem;
        font-weight: 700;
    }

    & p {
        font-weight: 300;
        margin: 0;
    }

`