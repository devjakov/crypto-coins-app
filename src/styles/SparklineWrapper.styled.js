import styled from "styled-components";

export const SparklineWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: stretch;

    & canvas {
        flex: 1;
        border: none;
    }
`