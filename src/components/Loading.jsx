import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{display: "flex", justifyContent: 'center', my: 4}}>
      <Box
        component="img"
        src='/loading.gif'
        height={120}
        alt='loader'
      />
    </Box>
  );
};

export default Loading;
