import React from 'react'
import { StyleNameProduct, WrapperCartStyle, WrapperDiscoutText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { StarFilled } from '@ant-design/icons'
const CartComponent = () => {
    return (
        <WrapperCartStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt='example' src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />}
        >
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán 10000+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText><span style={{ marginRight: '8px' }} > 1.000.000</span>
                <WrapperDiscoutText>-5%</WrapperDiscoutText>
            </WrapperPriceText>
        </WrapperCartStyle >
    )
}

export default CartComponent