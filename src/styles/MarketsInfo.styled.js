import styled from 'styled-components'

export const MarketsInfo = styled.div`
    color: white;
    background-color: #191B1F;
    font-size: .8rem;
    border: none;
    border-radius: 0 0 .75rem .75rem;
    display: flex;
    justify-content: space-evenly;
    max-width: 900px;
    margin: auto;
    position: relative;
    height: 50px;

    & p {
        flex: 1 0;
        font-weight: 500;
        text-align:center;
        align-items: center;
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        gap: .5rem;
        white-space: nowrap;
    }

    & p:nth-child(1), & p:nth-child(2) {
     flex: 0 1 12.5%;
    }

    & p:nth-child(3){
        justify-content: space-evenly;
    }

    & p img {
        margin: auto 0;
    }

    & span {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    & span p {
        gap: .35rem;
    }

    & p div {
        margin: 0;
        display: inline-flex;
    }

`