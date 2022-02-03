import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
background-color: ${props => !props.selected ? "#191B1F" : "#2C2F36"};
color: white;
text-decoration:none;
padding: .8rem 2rem;
border: none;
border-radius: .5rem;
margin: auto 0;

&:hover {
    background-color: #2C2F36;
    cursor: pointer;
}
`