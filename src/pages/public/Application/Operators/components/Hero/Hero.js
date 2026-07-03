import React from 'react';
const Hero = ({ operatorType }) => {
  return (
    <section className="grid items-center gap-8 md:grid-cols-[1fr_260px]" data-aos="fade-up">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">{operatorType} permits</p>
        <h1 className="text-4xl font-bold leading-tight text-text-primary sm:text-3xl">
          Operator ({operatorType}) application types
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
          Select the permit that matches your operation and continue through verification and application submission.
        </p>
      </div>
      <img
        loading="lazy"
        src="https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731948390/h6n0cce2dtcacy4dn0h7.svg"
        alt=""
        className="hidden max-h-52 w-full object-contain md:block"
      />
    </section>
  );
};

export default Hero;
