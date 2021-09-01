import * as React from "react"

function RestaurantIcon(props) {
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
        d="M19.85 10.142c-1.59 1.59-3.74 2.09-5.27 1.38l-1.47 1.47 6.18 6.18a.996.996 0 11-1.41 1.41l-6.18-6.18-6.19 6.17a.996.996 0 11-1.41-1.41l9.06-9.06c-.71-1.53-.21-3.68 1.38-5.27 1.92-1.91 4.66-2.27 6.12-.81 1.47 1.47 1.1 4.21-.81 6.12zm-9.22.36l-2.83 2.83-4.19-4.18a4.016 4.016 0 01-.78-4.56c.3-.62 1.13-.75 1.61-.27l6.19 6.18z"
        fill="currentColor"
      />
    </svg>
  )
}

export default RestaurantIcon
