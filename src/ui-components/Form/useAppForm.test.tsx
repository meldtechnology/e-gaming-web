import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { type FormikValues } from "formik";
import { useAppForm } from "./useAppForm";

const formTemplate = [
  {
    formControls: [
      {
        name: "operatorName",
        label: "Operator Name",
        required: true,
      },
      {
        name: "website",
        label: "Website",
        required: false,
      },
    ],
  },
];

describe("useAppForm", () => {
  it("generates initial values, Yup validation, and template payloads", async () => {
    let formik: ReturnType<typeof useAppForm<FormikValues>> | undefined;

    const Probe = () => {
      formik = useAppForm({
        formTemplate,
        onSubmit: vi.fn(),
      });
      return <form />;
    };

    renderToStaticMarkup(<Probe />);

    expect(formik?.values).toEqual({
      operatorName: "",
      website: "",
    });

    await expect(formik?.validateForm({ operatorName: "", website: "" })).resolves.toMatchObject({
      operatorName: "Operator Name is required",
    });

    await expect(formik?.validateForm({ operatorName: "Meld Gaming", website: "" })).resolves.toEqual({});

    expect(formik?.buildTemplatePayload({ operatorName: "Meld Gaming", website: "" })[0].formControls?.[0]).toMatchObject({
      name: "operatorName",
      value: "Meld Gaming",
    });
  });
});
