import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserContext } from "@/context/user";
import { MailOutline } from "@mui/icons-material";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "70vh",
  transform: "translate(-50%, -50%)",
  width: "1320px",
  bgcolor: "transparent",
  border: "2px solid rgba(0, 0, 0, 0.24)",
  boxShadow: 24,
  borderRadius: "16px 16px 16px 16px",
  backdropFilter: "blur(8px)",
  p: 4,
};

export default function BasicModal({
  handleOpen,
  handleClose,
  open,
}: {
  handleOpen: any;
  handleClose: any;
  open: boolean;
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  const { login, signup } = useContext(UserContext);

  const handleClickLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activar el loader al comenzar el login

    try {
      const response = await login(email, password);
      console.log("Login response:", response);
      // Si es exitoso, hacer algo, como redirigir o mostrar un mensaje
      alert("Login successful");
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsLoading(false); // Desactivar el loader después de la operación
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activar el loader al comenzar el registro

    try {
      const response = await signup(email, password);
      console.log("Signup response:", response);
      // Si es exitoso, hacer algo, como redirigir o mostrar un mensaje
      alert("User registered successfully");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setIsLoading(false); // Desactivar el loader después de la operación
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack flexDirection={"row-reverse"}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              width={"50%"}
              position={"relative"}
            >
              <div
                style={{
                  width: "547px",
                  height: "70vh",
                  borderRadius: "0px 16px 16px 0px",
                  backgroundColor: "rgba(28, 28, 28, 1)",
                  overflow: "hidden",
                }}
              >
                <section
                  style={{
                    width: "80%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "42px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "35px",
                      marginTop: "45px",
                      color: "white",
                      fontFamily: "IBM Plex Sans",
                      textAlign: "center",
                    }}
                  >
                    {isLogin
                      ? "Welcome back to Quickbet Movies!"
                      : "Welcome to Quickbet Movies!"}
                  </h1>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "IBM Plex Sans",
                      textAlign: "center",
                    }}
                  >
                    {!isLogin
                      ? "🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"
                      : "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}
                  </p>
                  {!isLogin ? (
                    <Image
                      alt="hola"
                      src={"/02.png"}
                      width={550}
                      height={550}
                      style={{ position: "absolute", bottom: -9 }}
                    />
                  ) : (
                    <Image
                      alt="hola"
                      src={"/yellow-hoodie-character.png"}
                      width={550}
                      height={550}
                      style={{ position: "absolute", bottom: -9 }}
                    />
                  )}
                </section>
              </div>
            </Stack>

            <Stack width={"50%"}>
              <Stack
                height={"100%"}
                justifyContent={"space-around"}
                alignItems={"center"}
                alignContent={"center"}
                flexDirection={"column"}
              >
                <Stack
                  alignItems={"center"}
                  flexDirection={"row"}
                  width={"100%"}
                  gap={"1rem"}
                >
                  <Image
                    onClick={handleClose}
                    width={32}
                    style={{ cursor: "pointer" }}
                    height={32}
                    alt="back"
                    src={"/CaretCircleLeft.svg"}
                  />
                  <span style={{ color: "white" }}>Back</span>
                </Stack>

                <Stack>
                  <Stack
                    sx={{
                      backgroundColor: "rgba(38, 38, 38, 1)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    flexDirection={"row"}
                  >
                    <button
                      onClick={handleClickLogin}
                      style={{
                        backgroundColor: !isLogin
                          ? "rgba(240, 185, 11, 1)"
                          : "transparent",
                        height: "46px",
                        color: "white",
                        width: "116px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={handleClickLogin}
                      style={{
                        backgroundColor: isLogin
                          ? "rgba(240, 185, 11, 1)"
                          : "transparent",
                        height: "46px",
                        width: "116px",
                        border: "none",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Log In
                    </button>
                  </Stack>
                </Stack>

                {!isLogin ? (
                  <Stack
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <button
                      onClick={handleRegisterClick}
                      style={{
                        backgroundColor: "rgba(240, 185, 11, 1)",
                        height: "46px",
                        width: "80%",
                        border: "none",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Register with your Email <MailOutline />
                    </button>
                  </Stack>
                ) : (
                  <Stack>
                    <form
                      onSubmit={handleLoginSubmit}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "34px",
                      }}
                    >
                      <Typography textAlign={"center"} color="white">
                        We love having you back
                      </Typography>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading} // Deshabilitar el botón mientras carga
                      >
                        Log In
                      </Button>
                    </form>
                  </Stack>
                )}

                {isRegister && !isLogin && (
                  <Stack>
                    <form
                      onSubmit={handleRegisterSubmit}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "34px",
                      }}
                    >
                      <Typography textAlign={"center"} color="white">
                        Register Here
                      </Typography>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading} // Deshabilitar el botón mientras carga
                      >
                        Register
                      </Button>
                    </form>
                  </Stack>
                )}

                {isLoading && (
                  <CircularProgress
                    style={{ color: "yellow", marginTop: "20px" }} // Loader amarillo
                  />
                )}

                <Stack>
                  <span
                    style={{
                      color: "white",
                      fontFamily: "Inter",
                      fontWeight: "lighter",
                    }}
                  >
                    For any questions, reach out to support@Quickbetdmovies.com
                  </span>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const Input = styled.input`
  height: 44px;
  width: 427px;
  border-radius: 5px 5px 0px 0px;
  padding-left: 14px;
`;
