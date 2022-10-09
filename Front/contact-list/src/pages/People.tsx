import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { getPersonListData } from "../api/PersonService";
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
      <Link to={`/edit/${0}`}>
        <Button variant="contained" endIcon={<AddIcon />}>
          New
        </Button>
      </Link>
      <Container>
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
