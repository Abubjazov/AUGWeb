import { FC } from 'react'

export interface SpinnerProps {
  height?: number
  width?: number
  strokeWidth?: number
  strokeColor?: string
}

const Spinner: FC<SpinnerProps> = ({
  height = 200,
  width = 200,
  strokeWidth = 1,
  strokeColor = '#5241bf',
}) => {
  return (
    <svg
      className="small-spinner"
      height={height}
      width={width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray="42.76482137044271 42.76482137044271"
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0;256.58892822265625"
        ></animate>
      </path>
    </svg>
  )
}

export default Spinner
