import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography } from "@mui/material";

interface MainAppBarProps {
  title: string;
}

const AppBarWrapper = styled.div`
  flex-grow: 1;
`;

export default function MainAppBar({ title }: MainAppBarProps) {
  return (
    <AppBarWrapper>
      <AppBar position="static" style={{ alignItems: "center" }}>
        <Toolbar variant="dense">
          <Typography variant="h4" color="inherit" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </AppBarWrapper>
  );
}
