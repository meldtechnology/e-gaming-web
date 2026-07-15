export const RolesModal = ({ onClick }) => {
  return (
    <>
      <div className="fixed inset-0 bg-brand/30 transition-opacity" aria-hidden="false"></div>
      <div className="fixed  inset-0 z-10 w-screen h-screen ">
        <div className="flex mt-[2%] justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative bg-opacity-15 transform overflow-hidden rounded-lg bg-surface text-left shadow-xl transition-all ">
            <div className="bg-surface px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-1 text-left sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="w-[200px] ">
                    <h3 className="text-center font-bold">User Application Role</h3>
                    <ul className="w-full">
                      <li className="flex h-[29px] cursor-pointer items-center pl-4  hover:bg-surface-raised ">
                        STANDARD
                      </li>
                      <li className="flex h-[29px] cursor-pointer items-center pl-4 hover:bg-surface-raised">
                        PROJECT MANAGER
                      </li>
                      <li className="flex h-[29px] cursor-pointer items-center pl-4  hover:bg-surface-raised">
                        LICENSE OFFICER
                      </li>
                      <li className="flex h-[29px] cursor-pointer items-center pl-4  hover:bg-surface-raised">
                        DATA EXPORT
                      </li>
                      <li className=" flex h-[29px] cursor-pointer items-center pl-4 hover:bg-surface-raised">
                        ADMIN
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-raised px-4 py-2 items-center sm:items-center sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button"
                      onClick={onClick}
                      className="ml-[70%] inline-flex rounded-md bg-danger px-3 py-2 text-sm font-semibold text-text-inverse shadow-sm ring-1 ring-inset ring-border-strong hover:bg-danger sm:mt-0 sm:w-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
