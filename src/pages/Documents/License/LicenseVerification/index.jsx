import { useMemo, useState } from "react";
import { env } from "../../../../config/env";
import Main from "../../../../mui/layouts/Main";
import Container from "../../../../mui/components/Container";
import { GetLicenseService } from "../../../../services/document";
import { Button, Card, EmptyState, Input, Skeleton } from "../../../../ui-components/primitives";
import { LicenseResultCard } from "../LicenseResultCard";

const GET_LICENCE_URL = env.DOCUMENTS_LICENSE_NUMBER_URL;

export const LicenseVerification = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState("");
  const [error, setError] = useState("");
  const endpoint = useMemo(
    () => submittedNumber ? `${GET_LICENCE_URL}${encodeURIComponent(submittedNumber)}` : null,
    [submittedNumber],
  );
  const { license, isLoading, isError, mutate } = GetLicenseService(endpoint);

  const submitLookup = (event) => {
    event.preventDefault();
    const trimmed = licenseNumber.trim();
    if (!trimmed) {
      setError("Enter a license number to verify.");
      return;
    }
    setError("");
    if (trimmed === submittedNumber) {
      mutate?.();
      return;
    }
    setSubmittedNumber(trimmed);
  };

  return (
    <Main>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
          <Card padded className="gap-6">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">License verification</p>
              <h1 className="mt-2 text-3xl font-bold text-text-primary">Verify an ESGC license</h1>
              <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-text-secondary">
                Enter the license number to confirm its current validity status.
              </p>
            </div>

            <form onSubmit={submitLookup} className="grid gap-4 sm:grid-cols-1 md:grid-cols-[1fr_auto] md:items-end">
              <Input
                label="License number"
                name="licenseNumber"
                value={licenseNumber}
                onChange={(event) => setLicenseNumber(event.target.value)}
                error={error}
                autoComplete="off"
              />
              <Button type="submit" size="lg" loading={isLoading}>
                Verify
              </Button>
            </form>
          </Card>

          {isLoading ? (
            <Card padded className="gap-3" role="status" aria-live="polite">
              <p className="text-sm font-semibold text-text-secondary">Fetching license details...</p>
              <Skeleton lines={4} />
            </Card>
          ) : submittedNumber && (isError || !license?.data) ? (
            <Card padded>
              <EmptyState
                title="License record not found"
                description="Check the license number and try again."
                action={
                  <Button variant="outline" color="neutral" buttonClicked={() => mutate?.()}>
                    Retry lookup
                  </Button>
                }
              />
            </Card>
          ) : license?.data ? (
            <LicenseResultCard license={license.data} />
          ) : null}
        </div>
      </Container>
    </Main>
  );
};
