import styled from "styled-components";

export const ChartContainer = styled.div`
    background-color: #191B1F;
    padding: 0 1rem;
    padding-top: calc(${({ aspectRatio }) => aspectRatio ? `100% / ${aspectRatio}` : "50% / (16/9)"});
    flex: 1;
    margin:0;
    border-radius: 1rem;
    position: relative;
    height: 0;

    & canvas {
        flex: 1;
        background-color: ${({ color }) => color ? color : "none"};
        position: absolute;
       top: 1rem;
       left: 1rem;
       max-width: 98%;
       max-height: 98%;
    }
`