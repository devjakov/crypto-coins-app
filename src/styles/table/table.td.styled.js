import styled from 'styled-components'

export const Td = styled.td`
color: white;
text-align:left;
border-bottom: 1px solid gray;
padding: 0;

&:nth-child(7) > div, &:nth-child(8) > div{
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    width: 80%;
    position:relative; 
}

&:nth-child(7) p, &:nth-child(8) p{
    margin: 0;
}

`