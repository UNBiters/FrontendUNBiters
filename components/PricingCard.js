"use client";

import { Button } from "flowbite-react";

export default function PricingCard({
  precio,
  name,
  description,
  color,
  features,
  btnText,
  link
}) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex min-h-[428px] w-[380px] flex-col rounded-3xl p-8 transform transition-transform hover:scale-110"
    >
      <h2 className="mb-5 text-xl font-medium">{name}</h2>
      <div className="mb-5 flex items-end text-4xl font-black">{precio}</div>
      <p className="mb-5 flex font-medium">{description}</p>
      <ul className="mb-10 flex flex-col gap-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="mr-3 w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="#D63447"
              viewBox="0 0 20 20"

            >
              <path
                fillRule="evenodd"
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        href={link}
        style={{ background: "#D63447" }}
        className="px-5 mx-1 shadow-xl"
      >
        {btnText}
      </Button>
    </div>
  );
}