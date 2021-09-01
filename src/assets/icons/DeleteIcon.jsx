import * as React from "react"

function DeleteIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 4H18c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1h2.5l.71-.71c.18-.18.44-.29.7-.29h4.18c.26 0 .52.11.7.29l.71.71zM8 21c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H8z"
        fill="currentColor"
      />
    </svg>
  )
}

export default DeleteIcon
