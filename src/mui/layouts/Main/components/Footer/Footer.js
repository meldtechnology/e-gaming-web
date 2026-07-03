import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="grid gap-8 md:grid-cols-2 sm:grid-cols-1">
        <div>
          <a href="/" title="Enugu State Gaming Commission" className="flex items-center gap-2.5">
            <img src="/images/enugu_logo2.png" alt="ESGC" className="h-10 w-10 object-contain" />
            <span className="text-base font-bold text-text-primary">Enugu State Gaming Commission</span>
          </a>
          <p className="mt-3 max-w-sm text-sm text-text-secondary">
            Licensing, regulation and compliance for gaming and lottery operations across Enugu State.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-16 gap-y-6">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Quick links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/" className="text-text-secondary transition-colors hover:text-brand">Home</a></li>
              <li><a href="/apply" className="text-text-secondary transition-colors hover:text-brand">Apply for a permit</a></li>
              <li><a href="/apply/payment/invoice" className="text-text-secondary transition-colors hover:text-brand">Pay invoice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Access</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/sign-in" className="text-text-secondary transition-colors hover:text-brand">Staff sign in</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-center text-sm text-text-secondary">
          &copy; 2024 Enugu State Gaming Commission. All rights reserved.
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-text-muted">
          When you visit or interact with our web application, we or our authorised service providers
          may use cookies for storing information to help provide you with a better, faster and safer experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
