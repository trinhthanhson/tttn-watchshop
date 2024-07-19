import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Anchor,
  Container,
  Form,
  GhostButton,
  LeftOverlayPanel,
  Overlay,
  OverlayContainer,
  Paragraph,
  RightOverlayPanel,
  SignInContainer,
  SignUpContainer,
  Title,
  Page,
  ErrorMessage,
  SuccessMessage,
} from "../../Components/LoginComponents/Components";
import axios from "axios";

function Login() {
  const [mode, toggle] = React.useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtpValue] = useState(""); // State to hold OTP input value
  const [repassword, setRepassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State for password match
  const [hasError, setHasError] = useState(false); // State for general errors
  const [checkSucces, setCheckSucces] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [messgaeNow, setMessage] = useState("");
  const [checkMessage, setCheckMessage] = useState(false);
  const [usernameNow, setUsernameNow] = useState("");
  const [checkUsernameNow, setCheckUsernameNow] = useState(false);
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false); // New state for forgot password modal
  const [fieldErrors, setFieldErrors] = useState({
    firstname: false,
    lastname: false,
    username: false,
    email: false,
    password: false,
    repassword: false,
  }); // State to track field validation errors
  const [showOTPForm, setShowOTPForm] = useState(false); // State to show OTP form

  const validateFields = () => {
    let isValid = true;
    const errors = {
      firstname: firstname.trim() === "",
      lastname: lastname.trim() === "",
      username: username.trim() === "",
      email: email.trim() === "" || !email.includes("@"),
      password: password.trim() === "",
      repassword: repassword.trim() === "" || password !== repassword,
    };

    setFieldErrors(errors);

    for (const error in errors) {
      if (errors[error]) {
        isValid = false;
      }
    }

    return isValid;
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/api/auth/sign-in",
        {
          username,
          password,
        }
      );
      const { token, status } = response.data;
      if (status && token) {
        localStorage.setItem("token", token);
        console.log("Đăng nhập thành công");
        navigate("/manager/products");
      } else {
        console.log("Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.setItem("token", error);
    }
  };

  const handleSignUp = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:9999/api/auth/sign-up",
        {
          firstname,
          lastname,
          username,
          password,
          email,
          otp,
          role_name: "CUSTOMER",
        }
      );
      setCheckSucces(true);
      setCheckError(false);
      setUsername("");
      setPassword("");
      // Show OTP form after successful sign up
    } catch (error) {
      console.error("Error:", error);
      setHasError(true); // Set general error state
      setCheckError(true);
      setCheckSucces(false);
    }
  };

  // Function to handle OTP submission (to be implemented)
  const handleOTPSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const isValid = validateFields();

    if (!isValid) {
      return; // Exit sign up function if any field is invalid
    }
    try {
      const response = await axios.post(
        "http://localhost:9999/api/auth/sent-otp",
        {
          email,
          username,
        }
      );

      console.log("Gui OTP thanh cong");
      if (response.data.message === "success") {
        setShowOTPForm(true);
      } else if (response.data.message === "email exist") {
        setMessage(response.data.message);
        setCheckMessage(true);
        setCheckUsernameNow(false);
      } else {
        setUsernameNow(response.data.message);
        setCheckUsernameNow(true);
        setCheckMessage(false);
      }

      // Show OTP form after successful sign up
    } catch (error) {
      console.error("Error:", error);
      setHasError(true); // Set general error state
    }
  };
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/api/auth/forgot-password",
        {
          email,
        }
      );
      if (response.data.message === "success") {
        setCheckSucces(true);
        setCheckError(false);
      } else {
        setCheckSucces(false);
        setCheckError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setCheckSucces(false);
      setCheckError(true);
    }
  };
  return (
    <Page>
      <Container>
        {!showOTPForm ? (
          <SignUpContainer>
            <Form>
              <Title>Create Account</Title>
              <Input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {fieldErrors.firstname && (
                <ErrorMessage>First name is required.</ErrorMessage>
              )}
              <Input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {fieldErrors.lastname && (
                <ErrorMessage>Last name is required.</ErrorMessage>
              )}
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {fieldErrors.username && (
                <ErrorMessage>Username is required.</ErrorMessage>
              )}
              {checkUsernameNow && <ErrorMessage>{usernameNow}</ErrorMessage>}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {fieldErrors.email && (
                <ErrorMessage>
                  Email is required and must include '@'.
                </ErrorMessage>
              )}
              {checkMessage && <ErrorMessage>{messgaeNow}</ErrorMessage>}
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {fieldErrors.password && (
                <ErrorMessage>Password is required.</ErrorMessage>
              )}
              <Input
                type="password"
                placeholder="Repassword"
                value={repassword}
                onChange={(e) => {
                  setRepassword(e.target.value);
                  setPasswordsMatch(password === e.target.value); // Check if passwords match
                }}
              />
              {fieldErrors.repassword && (
                <ErrorMessage>Passwords do not match.</ErrorMessage>
              )}
              {hasError && (
                <ErrorMessage>Error occurred while signing up.</ErrorMessage>
              )}
              <div style={{ position: "relative", marginTop: "10px" }}>
                <Button type="button" onClick={handleOTPSubmit}>
                  Sign Up
                </Button>
              </div>
            </Form>
          </SignUpContainer>
        ) : (
          <SignUpContainer>
            <Form>
              <Title>Enter OTP</Title>
              {!checkSucces && (
                <Input
                  type="number" // Change type to number
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtpValue(e.target.value)}
                />
              )}
              {checkSucces && (
                <SuccessMessage>Correct OTP code please login</SuccessMessage>
              )}
              {checkError && (
                <SuccessMessage>
                  OTP code is incorrect! Please re-enter!
                </SuccessMessage>
              )}
              <div style={{ position: "relative", marginTop: "10px" }}>
                <Button type="button" onClick={handleSignUp}>
                  Submit OTP
                </Button>
              </div>
            </Form>
          </SignUpContainer>
        )}

        <SignInContainer signinIn={mode}>
          <Form>
            <Title>Sign in</Title>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Anchor href="#" onClick={() => setShowForgotPassword(true)}>
              Forgot your password?
            </Anchor>
            <Button onClick={handleLogin}>Sign In</Button>
          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={mode}>
          <Overlay signinIn={mode}>
            <LeftOverlayPanel signinIn={mode}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signinIn={mode}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter Your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>

      {showForgotPassword && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowForgotPassword(false)}>
              &times;
            </CloseButton>
            <h2>Forgot Password</h2>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleForgotPassword}>Get OTP</Button>
          </ModalContent>
        </Modal>
      )}
    </Page>
  );
}

export default Login;
