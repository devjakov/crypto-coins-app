import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CoinLink = styled(Link)`
color: white;
text-decoration:none;

&:hover {
    cursor: pointer;
    text-decoration: default;
}
`