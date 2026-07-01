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
  Skeleton,
  Table,
  Tabs,
  Tag,
} from "../../ui-components/primitives";
import type { TableColumn } from "../../ui-components/primitives";

type PrimitiveRow = {
  name: string;
  status: string;
};

const columns: TableColumn<PrimitiveRow>[] = [
  {
    key: "name",
    header: "Name",
    cell: (row) => row.name,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge tone="success">{row.status}</Badge>,
  },
];

const rows: PrimitiveRow[] = [{ name: "Primitive row", status: "Active" }];

const PrimitiveSet = ({ tone }: { tone: "light" | "dark" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const isDark = tone === "dark";

  return (
    <section className={isDark ? "dark bg-gray-900 p-4" : "bg-white-a700 p-4"}>
      <h2 className={isDark ? "mb-4 text-xl font-bold text-white-a700" : "mb-4 text-xl font-bold text-gray-900"}>
        {tone === "dark" ? "Dark primitives" : "Light primitives"}
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4 p-4">
          <div className="flex flex-wrap gap-2">
            <Button>Default Button</Button>
            <Button unstyled className="rounded-[10px] bg-gray-950 p-3 text-white-a700">
              Unstyled Button
            </Button>
            <Badge tone="success">Success</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </div>
          <Input name="primitiveInput" label="Input" placeholder="Current input styling" helperText="Helper text" />
          <Tag selectedTags={() => undefined} tags={["License", "Report"]} placeholder="Add tag" />
        </Card>

        <Card className="gap-4 p-4">
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "overview", label: "Overview", panel: <p className="p-4 text-sm">Overview panel</p> },
              { id: "details", label: "Details", panel: <p className="p-4 text-sm">Details panel</p> },
            ]}
          />
          <Table columns={columns} data={rows} />
          <Pagination pageInfo={{ page: 1, totalPages: 3, previous: 0, next: 2 }} />
        </Card>

        <Card className="gap-4 p-4">
          <EmptyState title="Empty state" description="No records are available for this preview." />
          <Skeleton lines={3} />
          <Loader />
        </Card>

        <Card className="gap-4 p-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal open={modalOpen} title={<h3 className="text-lg font-bold">Primitive Modal</h3>} onClose={() => setModalOpen(false)} labelledBy={`${tone}-primitive-modal`}>
            <p className="text-sm text-gray-600">Modal body using the shared primitive.</p>
          </Modal>
        </Card>
      </div>
    </section>
  );
};

export const PrimitiveGallery = () => (
  <div className="space-y-4 p-4">
    <PrimitiveSet tone="light" />
    <PrimitiveSet tone="dark" />
  </div>
);
