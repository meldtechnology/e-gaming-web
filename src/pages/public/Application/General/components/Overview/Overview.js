import React from 'react';

const Overview = () => {
  return (
    <section className="rounded-2xl bg-brand px-6 py-8 text-on-brand" data-aos="fade-up">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <div>
          <p className="text-3xl font-bold">1</p>
          <p className="mt-2 text-sm font-semibold">Choose permit</p>
          <p className="mt-1 text-sm text-on-brand">Select the license type that matches your gaming operation.</p>
        </div>
        <div>
          <p className="text-3xl font-bold">2</p>
          <p className="mt-2 text-sm font-semibold">Verify operator</p>
          <p className="mt-1 text-sm text-on-brand">Confirm proprietor or agent details before completing forms.</p>
        </div>
        <div>
          <p className="text-3xl font-bold">3</p>
          <p className="mt-2 text-sm font-semibold">Generate invoice</p>
          <p className="mt-1 text-sm text-on-brand">Submit your application and continue with payment reference details.</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
