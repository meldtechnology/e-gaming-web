import Container from "../../../../mui/components/Container";
import Main from "../../../../mui/layouts/Main";
import { Hero, PaymentInvoice } from "./components";

export const Invoice = () => {
  return (
    <Main>
      <Container className={`!pb-0 !pt-1`}>
        <Hero />
      </Container>
      <Container>
        <PaymentInvoice  />
      </Container>
    </Main>
  );
}
