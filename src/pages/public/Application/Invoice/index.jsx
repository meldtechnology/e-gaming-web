import Container from "../../../../mui/components/Container";
import Divider from "@mui/material/Divider";
import Main from "../../../../mui/layouts/Main";
import { Hero, PaymentInvoice } from "./components";

export const Invoice = () => {
  return (
    <Main>
      <Container className={`!pb-0 !pt-1`}>
        <Hero />
      </Container>
      <Divider />
      <Container>
        <PaymentInvoice  />
      </Container>
    </Main>
  );
}