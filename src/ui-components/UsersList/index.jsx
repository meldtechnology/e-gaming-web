import { Img, Button } from "../.";
import { UserDatatable } from "../Datatable";
import { useNavigate } from "react-router-dom";
import { GetUsersService as getMetricsService } from "../../services";
import { useState } from "react";
import { Loader } from "../Loader";
import { MeldAlert } from "../Alerts";
import { AlertType } from "../Alerts/AlertType";
import { checkPermission } from "../../services/autorization";

const columnHeading = [
  "Name", "Phone", "Role", "Status", ""
]

const USER_PROFILE_URL = process.env.REACT_APP_ADMIN_USER_PROFILE_URL;
export const UsersList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { users, isLoading, isError }
    = getMetricsService(`${USER_PROFILE_URL}?page=${page}&size=5`);

  if (isLoading) return ( <Loader /> );

  if (isError) return <MeldAlert alertType={AlertType.ERROR}
                                 message={"Sorry Users profile could not be retrieved. Please try again later"} />

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    setPage(page - 1);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <div className="flex flex-col h-[700px] items-end bg-white-a700 gap-2.5 px-2 ">
      <Button
        color="blue_gray_900"
        size="sm"
        rightIcon={<Img src="/images/img_add_user.svg" alt="Add_User" className="h-[30px] w-[30px]" />}
        className={`${checkPermission('CAN_CREATE_USER')} mr-2 min-w-[182px] gap-3 rounded-[8px] px-1 md:mr-0 mt-5`}
        buttonClicked={(e) => navigate('/app/users/_new')}
      >
        Add User
      </Button>
      <div className="mr-2 flex flex-col gap-[26px] self-stretch md:mr-0">
        <div className="mb-2.5 ml-2.5 flex items-center md:ml-0 md:flex-col">
          <div className="flex w-[100%] items-center justify-center self-end md:w-full md:self-auto">
            <UserDatatable columnHeader={columnHeading}
                           data={users?.data?.results}
                           pageInfo={{
                             page: users?.data?.page,
                             previous: users?.data?.previousPage,
                             next: users?.data?.nextPage,
                             totalPages: users?.data?.totalPages
                           }}
                           nextPage={nextPage}
                           previousPage={previousPage}
                           refresh={refreshPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
