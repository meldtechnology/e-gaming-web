import Main from "../../../../mui/layouts/Main";
import Container from "../../../../mui/components/Container";
import { Hero, Details } from "./components";
import Divider from "@mui/material/Divider";

export const Form = () => {
  return (
    <Main>
      <Container className={`!pb-0 !pt-1`}>
        <Hero />
      </Container>
      <Divider />
      <Container>
        <Details />
      </Container>
    </Main>
  );
}