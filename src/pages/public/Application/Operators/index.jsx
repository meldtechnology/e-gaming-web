import Main from "../../../../mui/layouts/Main";
import Container from "../../../../mui/components/Container";
import { Hero, Overview } from "./components";
import { useParams } from "react-router-dom";
import { LatestProducts } from "./components";

export const Operators = () => {
  const { operatorType } = useParams();

  return (
    <Main>
      <Container>
        <Hero operatorType={operatorType} />
      </Container>
      <Container paddingY={'0 !important'}>
        <Overview operatorType={operatorType} />
      </Container>
      <Container>
        <LatestProducts operatorType={operatorType} />
      </Container>
    </Main>
  );
}