import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { Person } from "../models/Person";
import { getPersonData, putPersonData } from "../api/PersonService";
import { useParams } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";

const personData = async (id: number): Promise<Person> => {
  const person = (await getPersonData(id)).data;
  return person;
};

const updatePerson = async (person: Person): Promise<Person> => {
  const result = (await putPersonData(person)).data;
  return result;
};

const UpsertPerson = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState<Person>(new Person());
  useEffect(() => {
    personData(parseInt(params.personId ?? "0")).then((person) =>
      setPerson(person)
    );
  }, []);

  return (
    <div>
      <MainAppBar title={person.name} />
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={person.name}
          onChange={(newValue) => {
            setPerson({ ...person, name: newValue.target.value });
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="address"
          label="Address"
          variant="standard"
          value={person.address}
          onChange={(newValue) => {
            setPerson({ ...person, address: newValue.target.value });
          }}
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Birth Date"
          value={person.birthDate}
          onChange={(newValue) => {
            setPerson({ ...person, birthDate: newValue ?? "" });
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" endIcon={<ArrowBackIcon />} onClick={() => {
        navigate("/");
      }}>
        Back
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
        updatePerson(person);
        navigate("/");
      }}>
        Send
      </Button>
    </div>
  );
};

export default UpsertPerson;
