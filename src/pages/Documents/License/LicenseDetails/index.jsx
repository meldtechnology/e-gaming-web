import { env } from "../../../../config/env";
import { useParams } from "react-router-dom";
import Main from "../../../../mui/layouts/Main";
import { GetLicenseService } from "../../../../services/document";
import Container from "../../../../mui/components/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Loader } from "../../../../ui-components/Loader";
import { EmptyState } from "../../../../ui-components/primitives";
import { LicenseResultCard } from "../LicenseResultCard";

const GET_LICENCE_URL = env.DOCUMENTS_LICENSE_NUMBER_URL;
export const LicenseDetails = () => {
  const { number } = useParams();
  const { license, isLoading, isError } = GetLicenseService(`${GET_LICENCE_URL}${number}`);

  return (
    <Main>
      <Container>
        <Box>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              data-aos={'fade-up'}
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Enugu State Gaming Commission License Validation
            </Typography>
            <Typography
              variant="h6"
              align={'center'}
              color={'text.secondary'}
              data-aos={'fade-up'}
            >
              Please see below the status of your license.
            </Typography>
          </Box>
          {isLoading ? (
            <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
              <Loader w="w-8" h="h-8" />
              <span className="sr-only">Fetching license details...</span>
            </div>
          ) : isError || !license?.data ? (
            <div className="rounded-2xl border border-border bg-surface p-6">
              <EmptyState title="License record not found" description="Check the license number and try again." />
            </div>
          ) : (
            <LicenseResultCard license={license?.data} />
          )}
        </Box>
      </Container>
    </Main>
  );
}
