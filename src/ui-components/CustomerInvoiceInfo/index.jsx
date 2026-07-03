export const CustomerInvoiceInfo = ({invoiceNumber, show}) => {
  return (
    <div
      className={`${show? '':'hidden'} w-full rounded-2xl border border-success/30 bg-success-soft p-5 text-sm text-success`}
      role="status"
      aria-live="polite"
    >
      <p className="font-bold">Customer retrieval reference generated</p>
      <p className="mt-2 leading-6">
        Use this Remita retrieval reference number to make payment at the bank. Keep the reference before closing this page.
      </p>
      <div className="mt-4 rounded-xl border border-success/30 bg-surface p-4 text-center text-2xl font-bold tracking-wide text-text-primary">
        {invoiceNumber}
      </div>
    </div>
  );
}
