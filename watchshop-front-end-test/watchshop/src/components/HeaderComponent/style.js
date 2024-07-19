import { Row } from 'antd';
import styled from 'styled-components';
export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26,148,255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #FFF;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 18px;
    color: #FFF;
    white-space: nowrap;
    cursor: pointer;

`