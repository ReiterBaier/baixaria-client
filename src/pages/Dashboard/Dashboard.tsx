import { Box } from "@mui/material";
import { baixariaApiUrl } from "../../services/api-config";

export default function Dashboard() {
  return (
    <Box
      width={'100%'}
      height={'100vh'}
    >
      {" "}
      <iframe
        src={`${baixariaApiUrl}/board/queues`}
        title="Bull Dashboard"
        style={{ width: "100%", height: "100%", border: "none" }}
      />{" "}
    </Box>
  );
}
