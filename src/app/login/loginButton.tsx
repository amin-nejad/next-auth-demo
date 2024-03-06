import { Button, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";

export default function LoginButton(
  { disabled }: { disabled: boolean } = { disabled: false },
) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
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
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="mt-4 w-full">
        <Button type="submit" variant="contained" disabled={disabled} fullWidth>
          Sign-in
        </Button>
      </div>
    </ThemeProvider>
  );
}
