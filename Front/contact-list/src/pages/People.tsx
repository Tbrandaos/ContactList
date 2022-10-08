import { Container } from "@mui/material";
import React from "react";
import PersonCard from "../components/PersonCard";

function People() {
  return (
    <div className="App">
      <Container>
        <PersonCard></PersonCard>
      </Container>
    </div>
  );
}

export default People;
