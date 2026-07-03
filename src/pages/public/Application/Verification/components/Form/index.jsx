import { env } from "../../../../../../config/env";
import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ProgressButton } from "../../../../../../ui-components/Form/component/ProgressButton";
import { useNavigate } from "react-router-dom";
import {
  UserVerificationService as verifyEntity
} from "../../../../../../services/user/UserVerificationService";
import { storeItem } from "../../../../../../services";
import { Button, Input, Select, Textarea } from "../../../../../../ui-components/primitives";

const validationSchema = yup.object({
  regNumber: yup
    .string()
    .trim()
    .required('Government Issued Number is required.'),
  firstname: yup
    .string()
    .required('Please specify matching your First Name'),
  lastname: yup
    .string()
    .required('Please specify your matching Last Name')
});

const OPERATOR_TYPE = {
  Proprietor: 'CAC',
  Agent: 'NIN'
}

const VERIFICATION_URL = env.VERIFY_IDENTITY_URL;
export const Form = () => {
  const [type, setType] = useState('');
  const [bizType, setBizType] = useState('RC');
  const [regLabel, setRegLabel] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const { verify } = verifyEntity(`${VERIFICATION_URL}?type=${OPERATOR_TYPE[type]}`);

  const initialValues = {
    regNumber: '',
    firstname: '',
    lastname: '',
    address: ''
  };

  const onSubmit = async (values) => {
    setVerifying(true);
    const result = await verify(configRegNumber(values));
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      storeItem('operator', JSON.stringify(result?.data?.data));
      navigate('/apply/operator/form', { replace: true});
    }
    setVerifying(false);
  };

  const configRegNumber = (values) => {
    if(type === 'Proprietor')
      values['regNumber'] = bizType + values['regNumber'].replace(/[A-Z]|[a-z]/g, '');
    else
      values['regNumber'] = values['regNumber'].replace(/[A-Z]|[a-z]/g, '');
    return values;
  }

  const onChangeOperator = (e) => {
    setType(e.target.value);
    if(e.target.value === 'Proprietor') {
      formik.setFieldValue('firstname', '.');
      formik.setFieldValue('lastname', '.');
    }else {
      formik.setFieldValue('firstname', '');
      formik.setFieldValue('lastname', '');
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if(type === 'Proprietor') setRegLabel('Business Registration Number')
    else if(type === 'Agent') setRegLabel('Agent NIN')
    else setRegLabel('');
  }, [type]);

  return (
    <div className="w-full max-w-xl">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand">Operator verification</p>
        <h1 className="text-3xl font-bold text-text-primary">Verify your identity</h1>
        <p className="mt-3 text-base leading-7 text-text-secondary">
          Verify as a proprietor or agent before submitting your application.
        </p>
        {isError ? (
          <div className="mt-4 block w-full rounded-xl border border-danger/30 bg-danger-soft p-4 text-center text-danger" role="alert">
            {errorMsg}
          </div>
        ) : null}
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Select
          label="Operator category"
          name="type"
          value={type}
          onChange={onChangeOperator}
          options={[
            { label: "Select category", value: "" },
            { label: "Proprietor", value: "Proprietor" },
            { label: "Agent", value: "Agent" },
          ]}
        />

        {type ? (
          <div className={`grid gap-3 ${type === 'Proprietor' ? 'grid-cols-[150px_1fr] sm:grid-cols-1' : 'grid-cols-1'}`}>
            {type === 'Proprietor' ? (
              <Select
                label="Business type"
                name="bizType"
                value={bizType}
                onChange={e => setBizType(e.target.value)}
                options={[
                  { label: "Registered Corporation", value: "RC" },
                  { label: "Business Name", value: "BN" },
                ]}
              />
            ) : null}
            <Input
              label={`${regLabel} *`}
              name="regNumber"
              value={formik.values.regNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.regNumber && formik.errors.regNumber ? formik.errors.regNumber : ""}
            />
          </div>
        ) : null}

        {type === 'Agent' ? (
          <>
            <Input
              label="First Name *"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : ""}
            />
            <Input
              label="Last Name *"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : ""}
            />
            <Textarea
              label="Operating Address Line"
              name="address"
              rows={4}
              placeholder="Operating address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </>
        ) : null}

        <div>
          <Button type="submit" fullWidth size="lg" className={verifying ? "hidden" : ""}>
            Verify
          </Button>
          <ProgressButton saving={verifying} width={'w-[100%]'} position={'justify-center'} text={'Verifying...'} />
        </div>
      </form>
    </div>
  );
}
