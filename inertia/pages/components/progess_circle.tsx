import { useEffect, useState } from 'react'

interface ProgressCircleProps {
  progressVal: number
  totalPercentageVal: number
  color: string
  goalValue: number
  goalUnit: string
  value: number
}

export default function ProgressCircle({
  progressVal,
  totalPercentageVal = 100,
  color,
  goalValue,
  goalUnit,
  value,
}: ProgressCircleProps) {
  const [strokeVal, setStrokeVal] = useState<number>(0)

  useEffect(() => {
    const calculateStrokeVal = () => {
      return (4.64 * 100) / totalPercentageVal
    }

    const updateProgressBar = () => {
      const x = document.querySelector('.progress-circle-prog') as SVGElement | null
      if (x) {
        const strokeValue = progressVal * (strokeVal / 100)
        x.style.strokeDasharray = `${strokeValue} 999`
      }
    }

    setStrokeVal(calculateStrokeVal())
    updateProgressBar()
  }, [progressVal, totalPercentageVal, strokeVal])

  return (
    <>
      <div className="relative progress">
        <svg
          className="progress-circle"
          width="200px"
          height="200px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="progress-circle-back"
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#B2B2B2"
            strokeWidth="15"
          ></circle>
          <circle
            className="progress-circle-prog"
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="15"
          ></circle>
        </svg>
      </div>
      <div className="absolute flex justify-center items-center text-center text-xl gap-2">
        <p>
          {value} <span style={{ color: color }}>{' / ' + goalValue + ' ' + goalUnit}</span>
        </p>
      </div>
    </>
  )
}
