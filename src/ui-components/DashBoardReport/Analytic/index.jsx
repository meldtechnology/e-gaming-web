
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Text } from "../../Text";
import { Heading } from "../../Heading";
// import { formatAmount, thousandMillion } from "../../../services";
import { formatCompactNumber } from "../../../services/formatAmount";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    responsive: true,
  },
  cutout: '50%',
  spacing: 5
}

export const Analytic = ({metric, license}) => {
  const dataDonut = {
    labels: [],
    datasets: [
      {
        data: metric,
        backgroundColor: ["#2E75F1", "#222222", "#88A6E799"],
        borderColor: ["#2E75F1", "#222222", "#88A6E799"],
        borderWidth: 2,
        dataVisibility: new Array(metric.length).fill(true),
      },
    ],
  };

  return (
    <div className="mx-5 flex flex-col items-center gap-9 self-stretch md:mx-0">
      <div className="relative h-[188px] w-[46%] content-center md:h-auto">
        <Doughnut data={dataDonut}
                  options={options} />
        <h3
          className="absolute bottom-[39%] ml-16 m-auto w-max text-[16px] font-bold text-gray-600"
        >
          <span className={'block w-full text-center'}>{license}</span>
          Licenses
        </h3>
      </div>
      <div className="flex items-center self-stretch">
        <div className="flex w-[24%] justify-center">
          <div className="flex w-full flex-col items-start">
            <Text size="textmd" as="p" className="text-[18px] font-normal text-gray-600">
              Total Paid
            </Text>
            <div className="mx-2 flex gap-1 items-center self-stretch md:mx-0">
              <div className="h-[8px] w-[8px] rounded bg-blue-a400" />
              <Heading size="headingxs" as="h2" className="text-[18px] font-bold text-black-900_01">
                {/*{formatAmount(thousandMillion(metric[0]))}*/}
                ₦ {formatCompactNumber(metric[0])}
              </Heading>
            </div>
          </div>
        </div>
        <div className="flex w-[34%] justify-center px-[26px] sm:px-5">
          <div className="flex w-full flex-col items-center">
            <Text size="textmd" as="p" className="text-[18px] font-normal text-gray-600">
              Total Unpaid
            </Text>
            <div className="flex w-[40%] gap-1 items-center justify-center md:w-full">
              <div className="h-[8px] w-[8px] rounded bg-black-900_01 " />
              <Heading size="headingxs" as="h2" className="text-[18px] font-bold text-black-900_01">
                ₦ {formatCompactNumber(metric[1])}
              </Heading>
            </div>
          </div>
        </div>
        <div className="flex-1 px-[26px] sm:px-5">
          <div className="flex flex-col items-start">
            <Text size="textmd" as="p" className="text-[18px] font-normal text-gray-600">
              Total Overdue
            </Text>
            <div className="flex w-[46%] gap-1 items-center justify-center md:w-full">
              <div className="h-[8px] w-[8px] rounded bg-indigo-a100_01" />
              <Heading size="headingxs" as="h2" className="text-[18px] font-bold text-black-900_01">
                ₦ {formatCompactNumber(metric[2])}
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}