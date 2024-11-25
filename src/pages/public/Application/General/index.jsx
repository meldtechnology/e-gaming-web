import Main from "../../../../mui/layouts/Main";
import Container from "../../../../mui/components/Container";
import {
  Hero,
  Overview,
  Products,
} from "./components";

export const General = () => {
  return (
    <Main>
      <Container>
        <Hero />
      </Container>
      <Container paddingY={'0 !important'}>
        <Overview />
      </Container>
      <Container>
        <Products />
      </Container>
    </Main>
  );
}