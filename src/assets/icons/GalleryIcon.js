import * as React from "react"

function GalleryIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.417 12.667v-9.5c0-.871-.713-1.584-1.584-1.584h-9.5c-.87 0-1.583.713-1.583 1.584v9.5c0 .87.713 1.583 1.583 1.583h9.5c.871 0 1.584-.713 1.584-1.583zM9.025 9.92l1.29 1.725 2.043-2.549a.395.395 0 01.617 0l2.344 2.93a.394.394 0 01-.309.64H7.125a.396.396 0 01-.317-.633L8.392 9.92a.402.402 0 01.633 0zm-7.442 5.913V5.542c0-.436.357-.792.792-.792.435 0 .792.356.792.792v9.5c0 .435.356.791.791.791h9.5c.436 0 .792.357.792.792a.794.794 0 01-.792.792H3.167c-.871 0-1.584-.713-1.584-1.584z"
        fill="currentColor"
      />
    </svg>
  )
}

export default GalleryIcon
