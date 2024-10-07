import { Heading, Text, Img } from "./..";
import React from "react";

export default function AgentProfile({
  userName = "Bet365",
  userEmail = "info@bet365.com",
  userPrice = "NGN 200 K",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex justify-center items-start p-1.5 bg-gray-100 flex-1`}>
      <Img
        src="/images/img_rectangle_4184.png"
        alt="Ngn 200 K"
        className="h-[36px] self-end rounded-[5px] object-cover"
      />
      <div className="ml-[26px] flex flex-1 flex-col items-start gap-0.5 self-center">
        <Heading as="h6" className="text-[16px] font-bold text-gray-600">
          {userName}
        </Heading>
        <Text size="textxs" as="p" className="text-[12px] font-normal text-gray-600">
          {userEmail}
        </Text>
      </div>
      <Heading as="h6" className="ml-[18px] text-[16px] font-bold text-gray-600">
        {userPrice}
      </Heading>
    </div>
  );
}
