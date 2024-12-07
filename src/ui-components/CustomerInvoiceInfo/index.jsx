export const CustomerInvoiceInfo = ({invoiceNumber, show}) => {
  return (
    <div className={`${show? '':'hidden'} w-[100%] p-4 text-[1.2rem]`}>
      <span style={{ fontWeight: 700}}>Note:</span> Please copy the customer retrieval reference below.<br/>
      Use the customer retrieval reference number to make payment at the bank.<br /><br />
      Please make sure you snap, screenshot or copy out this reference number before closing this page,
      as access to this information will not be available again once closed.
      <div className={`p-4 text-center text-[1.5rem] bg-amber-200 text-orange-800 font-bold mt-4`}>
        {invoiceNumber}
      </div>
    </div>
  );
}
