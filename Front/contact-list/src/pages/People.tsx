import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { getPersonData } from "../api/PersonService";
import { Person } from '../models/Person';

const peopleData = async(): Promise<Person[]> => {
  const people = (await getPersonData()).data;
  console.log(people);
  return people;
};

function People() {
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    peopleData().then((people) => setPeople(people));
  }, [])
  
  return (
    <div className="App">
      <Container>
        {people.map(person => 
          <PersonCard key={person.id} person={person}></PersonCard>
        )}
      </Container>
    </div>
  );
}

export default People;
