import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <div data-aos="fade-right" className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">ESGC permit application</p>
          <h1 className="text-5xl font-bold leading-tight text-text-primary md:text-4xl sm:text-3xl">
            Apply for gaming permits with a cleaner digital workflow.
          </h1>
          <p className="mt-5 text-lg leading-8 text-text-secondary">
            Browse available gaming licenses, submit your details, generate your invoice, and continue the approval process online.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/apply/operator/Proprietor"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              See gaming permits
            </Link>
            <Link
              to="/document/license/verification"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Verify license
            </Link>
          </div>
        </div>
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
      >
        <img
          loading="lazy"
          src={'https://res.cloudinary.com/dh1mgjbev/image/upload/v1734086648/Shutterstock_online_betting-smaller-size_s5wyt8.png'}
          alt="Online gaming permit application"
          className="max-h-[440px] w-full max-w-[620px] rounded-2xl object-cover shadow-e2"
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
