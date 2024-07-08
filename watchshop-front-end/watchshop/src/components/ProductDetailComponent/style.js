import { InputNumber } from "antd";
import styled from "styled-components";

export const WrapperNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size:24px;
    font-weight:300;
    line-height:32px;
    word-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120,120,120);
    font-size:15px;
    line-height:24px;
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250,250,250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px; 
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    };
    span.change-address{
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        flex-shrink: 0;
    }
`
export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-numer.ant-input-number-sm {
        width: 60px;
        border-top: none;
        boder-bottom: none;
    };
    $.ant-input-number-handler-wrap {
        display: none;
    }
`



