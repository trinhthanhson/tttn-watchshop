import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './authStyle.css'
import Helmet from '../../components/Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getUserProfileRequest } from '../../redux/actions/actions'
import CoffeeCanvas from '../../components/Canvas/Coffee'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase/config'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user.data)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [otpVerified, setOtpVerified] = useState(false)

  useEffect(() => {
    if (user) {
      if (
        user.user.role &&
        (user.user.role.role_name === 'ADMIN' ||
          user.user.role.role_name === 'STAFF')
      ) {
        console.log('for admin and staff')
      } else {
        navigate('/home')
      }
    }
  }, [user, navigate])

  const handleGoHome = () => {
    navigate('/')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:9999/api/auth/sign-in',
        {
          username,
          password
        }
      )
      const { token, status } = response.data
      if (status && token) {
        localStorage.setItem('token', token)
        dispatch(getUserProfileRequest())
        console.log('Đăng nhập thành công')
      } else {
        console.log('Đăng nhập không thành công')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleForgotPassword = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/auth/check/${username}`
      )
      console.log(response)
      if (response.data.code === 200) {
        handleSendOTP()
      } else {
        console.error('Tài khoản không tồn tại')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSendOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {})
      const result = await signInWithPhoneNumber(auth, username, recaptcha)
      setResult(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const verifyOTP = async () => {
    try {
      const data = await result.confirm(otp)
      console.log('data', data)
      setOtpVerified(true)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      console.error('Mật khẩu mới và xác nhận mật khẩu không khớp')
      return
    }

    try {
      await axios.put(`http://localhost:9999/auth/change/${username}`, {
        password: newPassword
      })
      console.log('Thay đổi mật khẩu thành công')
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Helmet title="Login">
      <div className="full-screen relative z-[-1]">
        <img
          className="fixed h-full w-full hover:cursor-none"
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Fbackground.jpg?alt=media&token=edae71b6-7155-4d79-b78c-636c0a929ce6"
          alt="Background"
        />

        <img
          onClick={handleGoHome}
          className="absolute cursor-pointer w-[100px] h-[80px] ml-3 py-[10px] pl-3"
          src="https://firebasestorage.googleapis.com/v0/b/watch-shop-3a14f.appspot.com/o/images%2Flogo.png?alt=media&token=ff560732-bd5c-43d0-9271-7bcd3d9204ea"
          alt="Logo"
        />

        <div
          className="layout_login absolute flex justify-center items-center mt-[8%] ml-[8%] w-[75%] rounded-[15px]"
          style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
        >
          <div className="flex-col col-span-1 w-1/3 h-full object-contain border-r-2 border-neutral-400">
            {' '}
            <CoffeeCanvas />
          </div>

          <div className="flex-col col-span-1 w-2/3">
            {!result && !otpVerified && (
              <>
                <h1 className="font-RobotoSemibold text-center mb-8 text-main text-[25px] uppercase text-white">
                  Đăng Nhập
                </h1>
                <div className="input">
                  <label className=" text-white">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded"
                  />
                </div>
                <div className="input">
                  <label className=" text-white">Mật Khẩu</label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded mb-2"
                  />
                </div>
                <a
                  onClick={() => handleForgotPassword()}
                  className="link_forgotPass  text-white"
                >
                  Quên Mật Khẩu
                </a>

                <div className="btn_submit">
                  <button
                    className="uppercase"
                    type="button"
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="ml-[26%] text-white">
                  <span>Bạn chưa có tài khoản? </span>
                  <a className="link_signup" href="/signup">
                    Đăng Ký Ngay
                  </a>
                </div>
              </>
            )}

            {!otpVerified && !result && (
              <div id="recaptcha" className="mx-20 input"></div>
            )}
            {result && !otpVerified && (
              <>
                <div className="input">
                  <label className="">Input OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    required
                    className="h-8 !w-[50%] text-center outline-0 bg-[#ebebeb] p-2 rounded"
                  />
                  <button
                    onClick={verifyOTP}
                    className="rounded-md bg-main text-white px-3 py-1.5"
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}

            {otpVerified && (
              <>
                <div className="input">
                  <label className="">Mật khẩu mới</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    required
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded mb-2"
                  />
                </div>
                <div className="input">
                  <label className="">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu mới"
                    required
                    className="h-8 w-[45%] outline-0 bg-[#ebebeb] p-2 rounded mb-2"
                  />
                </div>
                <div className="btn_submit">
                  <button
                    onClick={handleChangePassword}
                    className="rounded-md bg-main text-white px-2 py-1.5 mb-1.5"
                    type="submit"
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Login
