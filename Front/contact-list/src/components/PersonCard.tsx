import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Person } from "../models/Person";

interface PersonProps {
  person: Person;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;
  console.log(string)
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  
  return color;
}

function stringAvatar(name: string) {
  const names = name.split(" ");

  if(names.length === 1){
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${names[0][0]}`,
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${names[0][0]}${names[1][0]}`,
  };
}

const PersonCard = (props: PersonProps): JSX.Element => {
  const{
    name, 
    address,
    birthDate,
  } = props.person;
  
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar {...stringAvatar(name)} />
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {address}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {birthDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<EditIcon />}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}

export default PersonCard;
