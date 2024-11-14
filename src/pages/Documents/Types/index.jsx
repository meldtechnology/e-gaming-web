import { Heading } from "../../../ui-components";
import { DocumentNavBar } from "../../../ui-components/NavBar";
import { TypeGroup } from "../../../ui-components/TypeGroup";

export const Types = () => {
  return (
    <>
      <div>
        <header className="border-b border-solid border-blue_gray-400 bg-white-a700 gap-0 p-[18px] mb-1">
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <Heading size="headinglg" as="h3" className="mb-4 font-bold text-gray-600 md:text-[22px]">
              Categories
            </Heading>
          </div>
          <DocumentNavBar />
        </header>
        <TypeGroup />
      </div>
    </>
  )
}