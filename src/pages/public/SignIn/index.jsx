import Main from '../../../mui/layouts/Main';
import { Form } from './components';

export const SignIn = () => {
  return (
    <Main showFooter={false}>
      <div className="mx-auto flex min-h-[calc(100vh-65px)] max-w-[1236px] items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-3xl border border-border bg-surface shadow-e2 lg:grid-cols-1">
          {/* Brand panel */}
          <div className="relative flex flex-col justify-between bg-brand p-10 text-on-brand lg:hidden">
            <div />
            <div className="flex flex-col items-center text-center">
              <span className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white/10 p-4">
                <img src="/images/enugu_logo2.png" alt="ESGC" className="h-24 w-24 object-contain" />
              </span>
              <h2 className="mt-6 text-xl font-semibold leading-tight">Enugu State Gaming Commission</h2>
              <p className="mt-2 text-sm text-on-brand/80">Regulatory & licensing platform</p>
            </div>
            <p className="text-xs text-on-brand/60">&copy; 2024 Enugu State Gaming Commission</p>
          </div>

          {/* Form */}
          <div className="flex items-center justify-center p-10 sm:p-6">
            <div className="w-full max-w-sm">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
