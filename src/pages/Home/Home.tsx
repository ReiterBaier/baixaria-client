import { useState } from 'react';
import {
  Box,
  CssBaseline,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DownloadIcon from '@mui/icons-material/Download';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { BaixariaPallete } from '../../helpers/types';
import { DownloadQueueServices } from '../../services/routes/users/downloadQueueServices';
import ToastBar from '../../components/ToastBar/ToastBar';

export default function Home() {
  const [link, setLink] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [downloadType, setDownloadType] = useState<string>('AUDIO');
  const [audioType, setAudioType] = useState<string>('M4A');
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | undefined>(undefined);
  const [snackbarType, setSnackbarType] = useState<'success' | 'error' | undefined>(undefined);

  const theme = createTheme({
    palette: {
      primary: {
        main: BaixariaPallete.PrimaryButton,
      },
      secondary: {
        main: BaixariaPallete.SecondaryButton,
      },
      error: {
        main: BaixariaPallete.ErrorButton,
      },
      success: {
        main: BaixariaPallete.SuccessButton,
      },
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarType(undefined);
    setSnackbarMessage(undefined);
    setSnackbarOpen(false);
  };

  const handleDownload = async () => {
    if (!link || !path) {
      setSnackbarType('error');
      setSnackbarMessage('Você precisa inserir o LINK e o CAMINHO da pasta para Download, eu não sou mágico');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      const downloadQueueService = new DownloadQueueServices();
      // Envia url, path, type e audioType para o backend
      const response = await downloadQueueService.create({ url: link, path, type: downloadType, audioType });
      setSnackbarType('success');
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
      console.log('Job criado:', response);
    } catch (error) {
      setSnackbarType('error');
      setSnackbarMessage(JSON.stringify(error));
      setSnackbarOpen(true);
      console.error('Erro ao baixar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        sx={{ background: BaixariaPallete.Background }}
      >
        {snackbarOpen && (
          <ToastBar
            snackbarOpen={snackbarOpen}
            handleSnackbarClose={handleSnackbarClose}
            message={snackbarMessage}
            type={snackbarType}
          />
        )}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          width="40%"
          height="80%"
          p={4}
          pt={2}
          bgcolor="#000000"
          borderRadius={6}
          boxShadow={3}
          sx={{ marginTop: '-5%' }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: BaixariaPallete.PrimaryText }}>
            Baixaria
          </Typography>
          <TextField
            label="Link"
            placeholder="Insira a URL aqui..."
            variant="filled"
            fullWidth
            value={link}
            onChange={(e) => setLink(e.target.value)}
            sx={{
              background: BaixariaPallete.InputField,
              borderRadius: 6,
              mb: 3,
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "& .MuiFilledInput-underline:hover:before": { borderBottom: "none" },
            }}
            InputLabelProps={{
              style: { color: BaixariaPallete.Background },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon sx={{ color: BaixariaPallete.ErrorButton }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Insira o caminho da pasta..."
            label="Caminho"
            variant="filled"
            fullWidth
            value={path}
            onChange={(e) => setPath(e.target.value)}
            sx={{
              background: BaixariaPallete.InputField,
              borderRadius: 6,
              mb: 3,
              "& .MuiFilledInput-underline:before": { borderBottom: "none" },
              "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              "& .MuiFilledInput-underline:hover:before": { borderBottom: "none" },
            }}
            InputLabelProps={{
              style: { color: BaixariaPallete.Background },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FolderOpenIcon sx={{ color: BaixariaPallete.ErrorButton }} />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" width="100%" gap={2} mb={3}>
            <TextField
              select
              label="Tipo de Download"
              variant="filled"
              fullWidth
              value={downloadType}
              onChange={(e) => setDownloadType(e.target.value)}
              sx={{
                background: BaixariaPallete.InputField,
                borderRadius: 6,
                "& .MuiFilledInput-underline:before": { borderBottom: "none" },
                "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              }}
              InputLabelProps={{
                style: { color: BaixariaPallete.Background },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DownloadIcon sx={{ color: BaixariaPallete.ErrorButton }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="VIDEO">Vídeo</MenuItem>
              <MenuItem value="AUDIO">Áudio</MenuItem>
            </TextField>
            <TextField
              select
              label="Tipo de Áudio"
              variant="filled"
              fullWidth
              value={audioType}
              onChange={(e) => setAudioType(e.target.value)}
              disabled={downloadType !== 'AUDIO'}
              sx={{
                background: BaixariaPallete.InputField,
                borderRadius: 6,
                "& .MuiFilledInput-underline:before": { borderBottom: "none" },
                "& .MuiFilledInput-underline:after": { borderBottom: "none" },
              }}
              InputLabelProps={{
                style: { color: BaixariaPallete.Background },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MusicNoteIcon sx={{ color: BaixariaPallete.ErrorButton }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="M4A">M4a</MenuItem>
              <MenuItem value="MP3">Mp3</MenuItem>
              <MenuItem value="WAV">WAV</MenuItem>
            </TextField>
          </Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleDownload}
            sx={{ width: '100%', height: '50px', m: 5, p: 5, fontWeight: 'bold', borderRadius: 6 }}
          >
            {loading ? <CircularProgress size={24} color="info" /> : 'Baixar'}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
