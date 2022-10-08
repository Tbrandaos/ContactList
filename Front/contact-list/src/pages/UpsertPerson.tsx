import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, TextField, Toolbar, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { Person } from "../models/Person";
import { getPersonData } from "../api/PersonService";
import { useParams } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";

const personData = async (id: number): Promise<Person> => {
  const person = (await getPersonData(id)).data;
  return person;
};

const UpsertPerson = (): JSX.Element => {
  const params = useParams();

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
    </div>
  );
};

export default UpsertPerson;
