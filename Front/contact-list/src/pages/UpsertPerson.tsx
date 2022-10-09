import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Person } from "../models/Person";
import { getPersonData, postContactData, postPersonData, putContactData, putPersonData } from "../api/Service";
import { useParams } from "react-router-dom";
import MainAppBar from "../components/MainAppBar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NewIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import ContactList, { ContactUiModel } from "../components/ContactList";

const personData = async (id: number): Promise<Person> => {
  const person = (await getPersonData(id)).data;
  return person;
};

const updatePerson = async (person: Person): Promise<Person> => {
  const result = (await putPersonData(person)).data;
  return result;
};

const postPerson = async (person: Person): Promise<Person> => {
  const result = (await postPersonData(person)).data;
  return result;
};

const UpsertPerson = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<ContactUiModel[]>([]);
  const [person, setPerson] = useState<Person>(new Person());
  useEffect(() => {
    personData(parseInt(params.personId ?? "0")).then((person) => {
      setPerson(person);
      const contactUiModels = person.contacts.map((contact) => {
        return new ContactUiModel(
          contact.id,
          contact.name,
          contact.contactType,
          contact.value,
          contact.personId
        );
      })
      setContacts(contactUiModels);
    }
    );
  }, [params.personId]);

  function addNewContact() {
    setContacts((prevContacts) => {
      return [new ContactUiModel(), ...prevContacts]
    })
  }

  return (
    <>
      <MainAppBar title={person.name} /><Container>
        <Box mt={5} sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={person.name}
            onChange={(newValue) => {
              setPerson({ ...person, name: newValue.target.value });
            }} />
        </Box>
        <Box mt={5} sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="address"
            label="Address"
            variant="standard"
            value={person.address}
            onChange={(newValue) => {
              setPerson({ ...person, address: newValue.target.value });
            }} />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mt={5} sx={{ display: "flex", alignItems: "flex-end" }}>
            <DatePicker
              label="Birth Date"
              value={person.birthDate}
              onChange={(newValue) => {
                setPerson({ ...person, birthDate: newValue ?? "" });
              }}
              renderInput={(params) => <TextField {...params} />} />
          </Box>
        </LocalizationProvider>

        <Typography mt={5} variant="h4" component="h4">
          Contacts
        </Typography>
        <Box mt={5} mb={5} sx={{ display: "flex", alignItems: "flex-end" }}>

          <Button variant="contained" endIcon={<NewIcon />} onClick={() => {
            addNewContact()
          }}>
            Add
          </Button>
        </Box>
        <ContactList contactList={contacts} onModelChanged={(contactUiModels) => setContacts([...contactUiModels])} />

        <Button style={{marginRight: "12px", marginTop: "16px"}} variant="contained" endIcon={<ArrowBackIcon />} onClick={() => {
          navigate("/");
        }}>
          Back
        </Button>
        <Button style={{marginTop: "16px"}}  variant="contained" endIcon={<SendIcon />} onClick={async () => {
          person.contacts = contacts;
          if (person.id === 0) {
            await postPerson(person);
          } else {
            await updatePerson(person);
          }
          navigate("/");
        }}>
          Send
        </Button>
      </Container>
    </>
  );
};

export default UpsertPerson;
