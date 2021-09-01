import * as React from "react"

function FilterIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M6.97 17.461l3.582-1.742v-4.566l5.617-5.886c.212-.22.331-.523.331-.84V3.138c0-.65-.494-1.176-1.103-1.176H2.603c-.61 0-1.103.526-1.103 1.176v1.318c0 .3.106.587.298.805l5.172 5.892v6.308z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default FilterIcon
