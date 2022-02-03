import styled from "styled-components";

export const CoinImageWrapper = styled.div`
background-color: #191B1F;
color: white;
border-radius: 1rem;
display: flex;
flex-direction: column;
height: 300px;
padding: 0 4rem;

    & img {
        width: fill-content;
        justify-content: center;
        margin: 80px auto;
        margin-bottom: 0;
        padding: 35px;
        background-color: #1F2128;
        border-radius: 1rem;
    }

    & h1 {
        margin: 10px auto;
        font-size: 1.5rem;
        font-weight: 300;
        
        text-align: center;
    }
`