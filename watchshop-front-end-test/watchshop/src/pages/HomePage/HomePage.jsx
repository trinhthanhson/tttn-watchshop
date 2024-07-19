import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SlideComponent from '../../components/SlideComponent/SlideComponent'
import silde1 from '../../assets/images/banner01.png'
import silde2 from '../../assets/images/banner02.png'
import silde3 from '../../assets/images/banner03.png'
import silde4 from '../../assets/images/banner04.png'
import CartComponent from '../../components/CartComponent/CartComponent'


const HomePage = () => {
    const arr = ['TV', 'TL', 'LAP']
    return (
        <div style={{ width: '1270px', margin: '0 auto' }}>
            <WrapperTypeProduct>
                {arr.map((item) =>
                    <TypeProduct name={item} key={item} />)}
            </WrapperTypeProduct>
            <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SlideComponent arrImages={[silde1, silde2, silde3, silde4]} />
                    <WrapperProducts>
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                        <CartComponent />
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton="Xem Thêm" type="outline"
                            styleButton={{
                                border: '1px solid rgb(11, 116, 229)',
                                color: 'rgb(11,116,129)', width: '240px', height: '38px',
                                borderRadius: '4px'
                            }} styleTextButton={{ fontWeight: 500 }} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePage