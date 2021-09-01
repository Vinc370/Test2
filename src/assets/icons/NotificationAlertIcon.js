import * as React from "react"

function NotificationAlertIcon({string, outer=24, background="#EF0000", textColor="#fff", className, fontRatio=2}) {
  return (
    <svg width={outer} height={outer} className={className}>
      <circle cx={outer/2} cy={outer/2} r={outer/3} fill={background} />
      <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize={outer/fontRatio} dy=".3em" color={textColor}>{string}</text>
    </svg>
  )
}

export default NotificationAlertIcon