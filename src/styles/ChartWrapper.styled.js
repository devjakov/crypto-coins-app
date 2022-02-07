import styled from "styled-components";

export const ChartWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    padding: 3rem 0 4rem;
    align-items: stretch;
    background-color: ${({ color }) => color ? color : "none"};

    & div {
        background-color: ${({ color }) => color ? color : "none"};
    }

    & table {
        border: none;
    }
`