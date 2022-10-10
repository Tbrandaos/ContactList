import { Container, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { getPersonListData } from "../api/Service";
import { Person } from "../models/Person";
import MainAppBar from "../components/MainAppBar";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const peopleData = async (): Promise<Person[]> => {
  const people = (await getPersonListData()).data;
  return people;
};

function People() {
  const [people, setPeople] = useState<Person[]>([]);

  function fetchPeople() {
    peopleData().then((people) => setPeople(people));
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="App">
      <MainAppBar title="Contacts" />
      <Container>
        <Link to={`/edit/${0}`} style={{textDecoration: "none"}}>
          <Fab style={{marginTop: "12px"}} variant="extended" color="primary" aria-label="add">
            <AddIcon />
            New Contact
          </Fab>
        </Link>
        {people.map((person) => (
          <PersonCard
            key={person.id}
            onPersonRemoved={() => {
              fetchPeople();
            }}
            person={person}
          ></PersonCard>
        ))}
      </Container>
    </div>
  );
}

export default People;