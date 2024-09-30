import { Img, Button } from "../../components";
import { UserDatatable } from "../Datatable";
import { useNavigate } from "react-router-dom";

const columnHeading = [
  "Name", "Phone", "Role", "Status", ""
]
const table1Data = [
  {
    name: "Aliu Musa",
    phone: "+234 (801)42669901",
    role: "ADMIN",
    status: " ONLINE",
    avatar: "/images/img_ellipse_129.png",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification.svg",
  },
  {
    avatar: "/images/img_ellipse_129_48x48.png",
    name: "Adepoju Musa",
    phone: "+234 (801)42669901",
    role: "PROJECT MANAGER",
    status: "OFFLINE",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification_gray_600.svg",
  },
  {
    avatar: "/images/img_ellipse_129_1.png",
    name: "Onyeka Chukwu",
    phone: "+234 (801)42669901",
    role: "ADMIN",
    status: " ONLINE",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification_gray_600.svg",
  },
  {
    avatar: "/images/img_ellipse_129_2.png",
    name: "Mary Bliege",
    phone: "+234 (801)42669901",
    role: "LICENSE OFFICER",
    status: "OFFLINE",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification_gray_600.svg",
  },
  {
    avatar: "/images/img_ellipse_129_3.png",
    name: "Aliu Cesar",
    phone: "+234 (801)42669901",
    role: "DATA EXPORT",
    status: "OFFLINE",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification_gray_600.svg",
  },
  {
    avatar: "/images/img_ellipse_129_4.png",
    name: "Onyenye Mbah",
    phone: "+234 (801)42669901",
    role: "STANDARD",
    status: " ONLINE",
    email: "aliu.musa@yopmail.com",
    notification: "/images/img_notification_gray_600.svg",
  },
];

export const UsersList = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-end bg-white-a700 gap-2.5 px-2 ">
      <Button
        color="blue_gray_900"
        size="sm"
        rightIcon={<Img src="/images/img_add_user.svg" alt="Add_User" className="h-[30px] w-[30px]" />}
        className="mr-2 min-w-[182px] gap-3 rounded-[8px] px-1 md:mr-0 mt-5"
        buttonClicked={(e) => navigate('/app/users/_new')}
      >
        Add User
      </Button>
      <div className="mr-2 flex flex-col gap-[26px] self-stretch md:mr-0">
        <div className="mb-2.5 ml-2.5 flex items-center md:ml-0 md:flex-col">
          <div className="flex w-[100%] items-center justify-center self-end md:w-full md:self-auto">
            <UserDatatable columnHeader={columnHeading} data={table1Data} />
          </div>
        </div>
      </div>
    </div>
  );
}
