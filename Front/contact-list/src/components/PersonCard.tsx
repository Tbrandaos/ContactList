import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Person } from "../models/Person";
import { Link } from "react-router-dom";
import { deletePersonData } from "../api/PersonService";

export interface PersonProps {
  person: Person;
  onPersonRemoved: (() => void);
}

function stringToColor(string: string) {
  let hash = 0;
  let i;
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

  if (names.length === 1) {
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
  const { id, name, address, birthDate } = props.person;

  const deletePerson = async (id: number): Promise<Number> => {
    const deletedId = (await deletePersonData(id)).data;
    props.onPersonRemoved();
    return deletedId;
  };

  return (
    <Card style={{marginTop: "12px"}} sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar {...stringAvatar(name)} />
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {address}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {birthDate.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button style={{marginRight: "16px"}} variant="outlined" startIcon={<DeleteIcon />} onClick={() => deletePerson(id)}>
          Delete
        </Button>
        <Link style={{textDecoration: 'none'}} to={`/edit/${id}`}>
          <Button variant="contained" endIcon={<EditIcon />}>
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PersonCard;
