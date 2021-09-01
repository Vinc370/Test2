import * as React from "react"

function MapPinIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.214 4.714C8.214 7.464 5 9.821 5 9.821S1.786 7.464 1.786 4.714c0-.938.338-1.837.941-2.5S4.147 1.178 5 1.178c.853 0 1.67.373 2.273 1.036.603.663.941 1.562.941 2.5z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5.893c.592 0 1.071-.528 1.071-1.179 0-.65-.48-1.178-1.071-1.178-.592 0-1.071.527-1.071 1.178 0 .651.48 1.179 1.071 1.179z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MapPinIcon
