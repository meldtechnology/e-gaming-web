import { env } from "../../../../../../config/env";
import React, { useEffect, useState } from "react";
import { formatAmount, getItem } from "../../../../../../services";
import * as yup from "yup";
import { useFormik } from "formik";
import { CustomerInvoiceInfo } from "../../../../../../ui-components/CustomerInvoiceInfo";
import { ProgressButton } from "../../../../../../ui-components/Form/component/ProgressButton";
import { CreatePublicPayment as generateInvoice } from "../../../../../../services/payments";
import { MeldAlert } from "../../../../../../ui-components/Alerts";
import { AlertType } from "../../../../../../ui-components/Alerts/AlertType";
import { Button, Card, Input } from "../../../../../../ui-components/primitives";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
    .required('Please provide email.'),
  confirmEmail: yup
    .string()
    .email("Invalid Confirm Email")
    .oneOf([yup.ref('email'), null], 'Email must match')
    .required('Please provide confirm email.'),
  phoneNumber: yup
    .string()
    .min(10)
    .max(14)
    .required('Please provide your phone number'),
});

const SummaryRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-0">
    <dt className="text-sm font-semibold text-text-secondary">{label}</dt>
    <dd className="max-w-[65%] break-words text-right text-sm font-semibold text-text-primary">{value || "Not available"}</dd>
  </div>
);

const GET_INVOICE_URL = env.CREATE_PAYMENTS_BASE_URL;
export const PaymentInvoice = () => {
  const [form, setForm] = useState({});
  const [reference, setReference] = useState('');
  const [showReference, setShowReference] = useState(false);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { addPayment, invoices } = generateInvoice(GET_INVOICE_URL);

  const initialValues = {
    email: '',
    confirmEmail: '',
    phoneNumber: ''
  }

  const onSubmit = async (values) => {
    setShow(true);
    const paymentData = {
      amountPayable: form?.amountPayable,
      description: `Payment for ${form?.code} was requested by ${form?.applicant?.name}`,
      itemCode: form?.code,
      payerEmail: values.email,
      payerName: form?.applicant?.name,
      payerPhone: values.phoneNumber,
      reference: form?.reference,
      requester: form?.applicant?.name
    }
    const result = await addPayment(paymentData);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setReference(result?.data?.data?.externalReference || result?.data?.externalReference || reference);
      setShowReference(true);
    }
    setShow(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const appForm = getItem('applicationForm');
    if(appForm !== undefined) setForm(JSON.parse(appForm));
    if(invoices) setReference(invoices?.data?.externalReference);
  }, [invoices]);

  const hasPayableAmount = form?.amountPayable !== 0 && form?.amountPayable !== undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      <Card padded className="gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Payment invoice</p>
          <h1 className="mt-2 text-2xl font-bold text-text-primary">Get Customer Retrieval Reference</h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Enter payer details to generate the customer invoice reference for this application.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-muted p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Application amount (NGN)</p>
          <p className="mt-3 text-3xl font-bold text-text-primary">NGN {formatAmount(form?.amountPayable)}</p>
        </div>

        <form onSubmit={formik.handleSubmit} className={`${showReference ? 'hidden' : ''} space-y-4`}>
          <Input
            label="Payment alert email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
          />
          <Input
            label="Confirm email"
            name="confirmEmail"
            type="email"
            value={formik.values.confirmEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmEmail && formik.errors.confirmEmail ? formik.errors.confirmEmail : ""}
          />
          <Input
            label="Phone number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
          />
          <Button
            type="submit"
            fullWidth
            size="lg"
            className={`${hasPayableAmount && !show ? '' : 'hidden'}`}
          >
            Get Customer Invoice
          </Button>
          <ProgressButton saving={show} width={'w-[100%]'} position={'justify-center'} text={'Generating...'} />
        </form>

        <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
        <CustomerInvoiceInfo invoiceNumber={reference} show={showReference} />
      </Card>

      <Card padded className="gap-4">
        <div className="border-b border-border pb-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Application summary</p>
          <h2 className="mt-2 text-2xl font-bold text-text-primary">{form?.reference || "Pending application"}</h2>
        </div>
        <dl>
          <SummaryRow label="Permit Name" value={form?.fileName} />
          <SummaryRow label="Permit Type" value={form?.typeName} />
          <SummaryRow label="Validity Period" value={form?.validity ? `${form.validity} days` : ""} />
          <SummaryRow label="Applicant" value={form?.applicant?.name} />
          <SummaryRow label="Application Date" value={form?.submittedOn ? new Date(form.submittedOn).toDateString() : ""} />
        </dl>
      </Card>
    </div>
  );
}
