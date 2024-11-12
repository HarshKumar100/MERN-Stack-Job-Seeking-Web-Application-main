import React from "react";

const Convert_Date_Time = ({ seconds, nanoseconds }) => {
  const time = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(time);

  date.setUTCHours(date.getUTCHours()+5);
  date.setUTCMinutes(date.getUTCMinutes()+30);

  const formattedDate = date.toLocaleString("en-In", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return <>{<h6>{formattedDate}</h6>}</>;
};

export default Convert_Date_Time;