"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ThemeProvider, createTheme, TextField, Button } from "@mui/material";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [mode] = useState<"light" | "dark">("dark");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: "#1f2937",
                backgroundImage: "unset",
              },
            },
          },
        },
      }),
    [mode],
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  };

  if (status === "authenticated") {
    return <div>Redirecting...</div>;
  }

  const ssoSignIn = async () => {
    await signIn("boxyhq-saml");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-screen h-screen grid login-main-div place-content-center">
        <div className="login-main-box flex flex-col items-center p-5">
          <div className="title ml-1 px-3 py-6">
            <span>My App</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full mt-2">
            <TextField
              fullWidth
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              label="Username"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              className="mt-2"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              size="small"
              label="Password"
              variant="outlined"
              required
            />
          {/* Button to submit form */}
          <div className="w-full mt-4">
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            className="mt-4"
          >
            Sign-in
          </Button>
          </div>
          </form>
          <div className="login-sso-or">
            <div></div>
            <br></br>OR
            <div></div>
          </div>
          <div className="w-full mt-4">
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="small"
              onClick={ssoSignIn}
            >
              Sign-in with SSO
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
