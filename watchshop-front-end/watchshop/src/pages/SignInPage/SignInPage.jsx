import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrappperTextLight } from './Style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imgLogo from '../../assets/images/logo-login.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder='abc@gmail.com' />
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}> {
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm placeholder='password' type={isShowPassword ? "text" : "password"} />
                    </div>
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(255,57,69)',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            marginTop: '10px'
                        }}
                        textButton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '20px' }}
                    >
                    </ButtonComponent>
                    <p><WrappperTextLight>Quên mật khẩu?</WrappperTextLight></p>
                    <p>Chưa có tài khoản? <WrappperTextLight>, Tạo tài khoản</WrappperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imgLogo} preview={false} alt='img-logo' height="203px" width="203px"></Image>
                    <h4>Mua sắm tại WATCHSHOP uy ín đảm bảo</h4>
                </WrapperContainerRight>
            </div >
        </div>
    )
}

export default SignInPage