import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FormBuilder } from "./index";

const mocks = vi.hoisted(() => ({
  extractTemplate: vi.fn(),
  getTemplateService: vi.fn(),
  templateFormProps: [],
  updateDocumentService: vi.fn(),
}));

vi.mock("../../services", () => ({
  GetFormTemplateService: mocks.getTemplateService,
  UpdateDocumentService: mocks.updateDocumentService,
}));

vi.mock("../../services/extractRow", () => ({
  extractTemplate: mocks.extractTemplate,
}));

vi.mock("../Form/DynamicForm", () => ({
  TemplateForm: (props) => {
    mocks.templateFormProps.push(props);

    return (
      <div data-testid="template-form">
        {JSON.stringify(props.data)}
      </div>
    );
  },
}));

vi.mock("../Loader", () => ({
  Loader: () => <div data-testid="loader" />,
}));

vi.mock("../Alerts", () => ({
  MeldAlert: ({ message }) => <div>{message}</div>,
}));

vi.mock("../Alerts/AlertType", () => ({
  AlertType: {
    ERROR: "error",
    SUCCESS: "success",
  },
}));

describe("FormBuilder", () => {
  const serverTemplate = {
    data: [{ templateDetails: { generated: "blank template" } }],
  };
  const extractedTemplate = { generated: "blank template" };

  beforeEach(() => {
    mocks.templateFormProps.length = 0;
    mocks.extractTemplate.mockReset();
    mocks.getTemplateService.mockReset();
    mocks.updateDocumentService.mockReset();

    mocks.extractTemplate.mockReturnValue(extractedTemplate);
    mocks.getTemplateService.mockReturnValue({
      template: serverTemplate,
      loadingTemplate: false,
    });
    mocks.updateDocumentService.mockReturnValue({
      modifyDocument: vi.fn(),
    });
  });

  it("renders a document with no saved formTemplate using the extracted blank template", () => {
    render(
      <FormBuilder
        onClick={vi.fn()}
        fileData={[{ name: "New License", code: "NL-001" }]}
      />,
    );

    expect(screen.getByTestId("template-form")).toHaveTextContent(
      JSON.stringify(extractedTemplate),
    );
    expect(mocks.extractTemplate).toHaveBeenCalledWith(serverTemplate);
    expect(mocks.templateFormProps.at(-1).data).toEqual(extractedTemplate);
  });

  it("renders a document with a non-empty saved formTemplate using the saved template", () => {
    const savedTemplate = { sections: [{ title: "Saved Section" }] };

    render(
      <FormBuilder
        onClick={vi.fn()}
        fileData={[{
          name: "Saved License",
          code: "SL-001",
          formTemplate: savedTemplate,
        }]}
      />,
    );

    expect(screen.getByTestId("template-form")).toHaveTextContent(
      JSON.stringify(savedTemplate),
    );
    expect(mocks.extractTemplate).not.toHaveBeenCalled();
    expect(mocks.templateFormProps.at(-1).data).toBe(savedTemplate);
  });

  it("renders a document with an empty saved formTemplate using the extracted blank template", () => {
    render(
      <FormBuilder
        onClick={vi.fn()}
        fileData={[{
          name: "Empty License",
          code: "EL-001",
          formTemplate: {},
        }]}
      />,
    );

    expect(screen.getByTestId("template-form")).toHaveTextContent(
      JSON.stringify(extractedTemplate),
    );
    expect(mocks.extractTemplate).toHaveBeenCalledWith(serverTemplate);
    expect(mocks.templateFormProps.at(-1).data).toEqual(extractedTemplate);
  });
});
