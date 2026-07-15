import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Container from '../../components/Container';
import { Footer } from './components';

const PublicHeader = () => (
  <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
    <div className="mx-auto flex max-w-[1236px] items-center justify-between px-4 py-3">
      <a href="/" className="flex items-center gap-2.5" title="Enugu State Gaming Commission">
        <img src="/images/enugu_logo2.png" alt="ESGC" className="h-9 w-9 object-contain" />
        <span className="text-sm font-bold text-text-primary sm:hidden">
          Enugu State Gaming Commission
        </span>
      </a>
      <nav className="flex items-center gap-2">
        <a
          href="/apply"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          Apply
        </a>
        <a
          href="/sign-in"
          className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong"
        >
          Staff Sign in
        </a>
      </nav>
    </div>
  </header>
);

const Main = ({ children, colorInvert = false, bgcolor = 'transparent', showFooter = true }) => {
  return (
    <Box className="min-h-screen bg-surface-muted">
      <PublicHeader />
      <main>{children}</main>
      <div className={`${showFooter ? '' : 'hidden'} border-t border-border bg-surface`}>
        <Container paddingY={4}>
          <Footer />
        </Container>
      </div>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
  showFooter: PropTypes.bool,
};

export default Main;
