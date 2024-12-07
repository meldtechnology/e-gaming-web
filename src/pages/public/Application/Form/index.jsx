import Main from "../../../../mui/layouts/Main";
import Container from "../../../../mui/components/Container";
import { Hero, Details } from "./components";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export const Form = () => {
  const [reference,setReference] = useState({});
  return (
    <Main>
      <Container className={`!pb-0 !pt-1`}>
        <Hero setReference={setReference}/>
      </Container>
      <Divider />
      <Container>
        <Details reference={reference} />
      </Container>
    </Main>
  );
}