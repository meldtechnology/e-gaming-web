import { env } from "../../config/env";
import { UserDatatable } from "../Datatable";
import { useNavigate } from "react-router-dom";
import { GetUsersService as getMetricsService } from "../../services";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";
import { checkPermission } from "../../services/autorization";
import { Button, Card, EmptyState } from "../primitives";

const columnHeading = [
  "Name", "Phone", "Role", "Status", ""
]

const USER_PROFILE_URL = env.ADMIN_USER_PROFILE_URL;
export const UsersList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { users, isLoading, isError }
    = getMetricsService(`${USER_PROFILE_URL}?page=${page}&size=${pageSize}`) as {
      users?: {
        data?: {
          results?: unknown[];
          page?: number;
          previousPage?: number;
          nextPage?: number;
          totalPages?: number;
          total?: number;
          totalElements?: number;
        };
      };
      isLoading?: boolean;
      isError?: unknown;
    };

  if (isError) return <MeldAlert alertType={AlertType.ERROR}
                                 message={"Sorry Users profile could not be retrieved. Please try again later"}
                                 show />

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page - 1);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {checkPermission('CAN_CREATE_USER') ? (
        <div className="flex justify-end">
          <Button
            leftIcon={<PlusIcon className="h-5 w-5" />}
            buttonClicked={() => navigate('/app/users/_new')}
          >
            Add User
          </Button>
        </div>
      ) : null}
      {users?.data?.results?.length || isLoading ? (
        <div role={isLoading ? "status" : undefined} aria-live={isLoading ? "polite" : undefined}>
          {isLoading ? <span className="sr-only">Loading users...</span> : null}
          <UserDatatable
            columnHeader={columnHeading}
            data={users?.data?.results ?? []}
            pageInfo={{
              page: users?.data?.page ?? page,
              previous: users?.data?.previousPage,
              next: users?.data?.nextPage,
              totalPages: users?.data?.totalPages,
            }}
            nextPage={nextPage}
            previousPage={previousPage}
            refresh={refreshPage}
            isLoading={isLoading}
            pageSize={pageSize}
            onPageSize={changePageSize}
            onPageChange={setPage}
            totalEntries={users?.data?.totalElements ?? users?.data?.total ?? (users?.data?.totalPages ? users.data.totalPages * pageSize : undefined)}
            currentPageCount={users?.data?.results?.length}
          />
        </div>
      ) : (
        <Card padded>
          <EmptyState title="No users available" description="Invite a team member to get started." />
        </Card>
      )}
    </div>
  );
}
