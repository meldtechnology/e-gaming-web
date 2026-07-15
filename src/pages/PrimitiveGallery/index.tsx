import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Loader,
  Modal,
  Pagination,
  Select,
  Skeleton,
  StatusBadge,
  Table,
  Tabs,
  Tag,
  Textarea,
} from "../../ui-components/primitives";
import type { TableColumn } from "../../ui-components/primitives";

type PrimitiveRow = {
  name: string;
  status: string;
};

const columns: TableColumn<PrimitiveRow>[] = [
  { key: "name", header: "Name", cell: (row) => row.name },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
];

const rows: PrimitiveRow[] = [
  { name: "Sports betting permit", status: "ISSUED" },
  { name: "Lottery operator", status: "REVIEW" },
  { name: "Casino licence", status: "PENDING" },
  { name: "Gaming machine", status: "DECLINE" },
];

const SectionTitle = ({ children }: { children: string }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-secondary">{children}</h3>
);

const PrimitiveSet = ({ tone }: { tone: "light" | "dark" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = tone === "dark";

  return (
    <section className={`${isDark ? "dark" : ""} rounded-3xl bg-surface-muted p-6`}>
      <h2 className="mb-6 text-xl font-bold text-text-primary">
        {isDark ? "Dark mode" : "Light mode"}
      </h2>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card padded className="gap-5">
          <div>
            <SectionTitle>Buttons</SectionTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Button>Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button variant="outline" color="primary">Outline</Button>
              <Button variant="ghost" color="neutral">Ghost</Button>
              <Button color="danger">Danger</Button>
              <Button loading>Saving</Button>
            </div>
          </div>
          <div>
            <SectionTitle>Badges & status</SectionTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">Brand</Badge>
              <Badge tone="success" dot>Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="danger" variant="solid">Danger</Badge>
              <StatusBadge status="ISSUED" />
              <StatusBadge status="PENDING" />
            </div>
          </div>
        </Card>

        <Card padded className="gap-4">
          <SectionTitle>Form controls</SectionTitle>
          <Input name="galleryInput" label="Applicant name" placeholder="Jane Doe" helperText="As on your ID." />
          <Input name="galleryError" label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
          <Select
            name="gallerySelect"
            label="Operator type"
            options={[
              { label: "Proprietor", value: "proprietor" },
              { label: "Agent", value: "agent" },
            ]}
          />
          <Textarea name="galleryArea" label="Notes" placeholder="Add any supporting detail" />
          <Tag selectedTags={() => undefined} tags={["License", "Report"]} placeholder="Add tag" />
        </Card>

        <Card padded className="gap-4">
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "overview", label: "Overview", panel: <p className="p-4 text-sm text-text-secondary">Overview panel</p> },
              { id: "details", label: "Details", panel: <p className="p-4 text-sm text-text-secondary">Details panel</p> },
            ]}
          />
          <Table columns={columns} data={rows} />
          <Pagination pageInfo={{ page: 1, totalPages: 3, previous: 0, next: 2 }} onRefresh={() => undefined} />
        </Card>

        <Card padded className="gap-4">
          <SectionTitle>States</SectionTitle>
          <EmptyState title="No applications yet" description="Approved applications will appear here once submitted." />
          <Skeleton lines={3} />
          <div className="flex items-center gap-4">
            <Loader />
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          </div>
          <Modal
            open={modalOpen}
            title={<h3 className="text-lg font-bold text-text-primary">Primitive modal</h3>}
            onClose={() => setModalOpen(false)}
            labelledBy={`${tone}-primitive-modal`}
          >
            <p className="text-sm text-text-secondary">Modal body using the shared primitive. Press Escape or click the backdrop to close.</p>
          </Modal>
        </Card>
      </div>
    </section>
  );
};

export const PrimitiveGallery = () => (
  <div className="space-y-6 p-4">
    <PrimitiveSet tone="light" />
    <PrimitiveSet tone="dark" />
  </div>
);
