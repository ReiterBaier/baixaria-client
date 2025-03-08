import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaDashcube, FaHome } from "react-icons/fa";
import { BaixariaPallete } from '../../helpers/types';

interface LayoutBaseProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    success: { main: BaixariaPallete.SuccessButton },
    error: { main: BaixariaPallete.ErrorButton },
    warning: { main: BaixariaPallete.WarningButton },
    primary: { main: BaixariaPallete.PrimaryButton },
  },
});

const LayoutBase = ({ children }: LayoutBaseProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: BaixariaPallete.Background,
          color: BaixariaPallete.PrimaryText,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            background: BaixariaPallete.Header,
            borderBottom: `1px outset ${BaixariaPallete.Border}`,
          }}
        >
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Button
              href="/"
              sx={{
                color: BaixariaPallete.PrimaryText,
                fontSize: '1.2rem',
                textTransform: 'none',
                mx: 2,
              }}
            >
              <FaHome style={{ marginRight: 8, fontSize: '1.3rem' }} />
              Home
            </Button>
            <Button
              href="/dashboard"
              sx={{
                color: BaixariaPallete.PrimaryText,
                fontSize: '1.2rem',
                textTransform: 'none',
                mx: 2,
              }}
            >
              <FaDashcube style={{ marginRight: 8, fontSize: '1.3rem' }} />
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flex: 1, pt: '80px', p: 2 }}>
          {children}
        </Box>
        <Box
          component="footer"
          sx={{
            background: BaixariaPallete.Footer,
            py: 1,
            textAlign: 'center',
            borderTop: `1px outset ${BaixariaPallete.Border}`,
          }}
        >
          <Container>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Baixaria. Todos os direitos reservados.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutBase;
