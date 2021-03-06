import styled from "styled-components";

export const ChartContainer = styled.div`
    background-color: #191B1F;
    padding: 0 1rem;
    padding-top: calc(${({ aspectRatio }) => aspectRatio ? `100% / ${aspectRatio}` : "50% / (16/9)"});
    flex: 1;
    flex-direction: column;
    margin:0;
    border-radius: 1rem;
    position: relative;
    height: 0;
    width: 100vw;

    & canvas {
        flex: 1;
        background-color: ${({ color }) => color ? color : "none"};
        position: absolute;
        top: 20%;
        left: 1rem;
        max-width: 100vw;
        max-height: 80%;
    }
`