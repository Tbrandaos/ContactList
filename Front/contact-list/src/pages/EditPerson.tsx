import { AppBar, Toolbar, Typography } from "@mui/material";
import { PersonProps } from "../components/PersonCard";

const EditPeople = (props: PersonProps): JSX.Element => {
  const { name, address, birthDate } = props.person;

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            name
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default EditPeople;
