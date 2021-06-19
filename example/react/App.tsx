import React, { useState } from 'react'
import DonutChart from './components/DonutChart'
import { css } from '@emotion/react'

const App: React.FC = () => {
  const options = {
    radius: 100,
    thickness: 20
  }

  const [percent, setPercent] = useState<number>(30)

  const clickHandler = (percent: number) => {
    setPercent(percent)
  }

  return (
    <div>
      <h1>Chart Sample</h1>

      <div css={buttonGroupStyle}>
        <button css={buttonStyle} onClick={() => clickHandler(50)}>
          50%
        </button>
        <button css={buttonStyle} onClick={() => clickHandler(75)}>
          75%
        </button>
        <button css={buttonStyle} onClick={() => clickHandler(100)}>
          100%
        </button>
      </div>

      <DonutChart data={percent} options={options} />
    </div>
  )
}

export default App

const buttonGroupStyle = css`
  padding: 5px 10px;
  text-align: center;
  display: flex;

  > button {
    margin: 0 5px;
  }
`

const buttonStyle = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  height: 56px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: #ffffff;
  background-color: #5089ca;
  border: 1px solid #5089ca;
  border-radius: 10px;
  vertical-align: middle;
  padding: 0 5px;
  overflow: hidden;
`
