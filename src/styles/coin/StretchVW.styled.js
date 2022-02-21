import styled from "styled-components";

export const StretchVW = styled.div`
position: relative;

& div {
    position: absolute;
    margin-bottom: 100px;
}

& div div, {
    position: relative;
    width: 100vw;
    margin-bottom: 100px;
}

& div canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    margin-bottom: 100px;
}
`