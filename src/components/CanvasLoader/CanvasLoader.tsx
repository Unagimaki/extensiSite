import { Html, useProgress } from '@react-three/drei'
import { FC, useEffect } from 'react'

interface CanvasLoaderProps {
  onChangeProgress?: (progress: number) => void
}

const CanvasLoader: FC<CanvasLoaderProps> = ({ onChangeProgress }) => {
  const { progress } = useProgress()

  useEffect(() => {
    onChangeProgress?.(progress)
  }, [onChangeProgress, progress])

  return (
    <Html
      as='div'
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <p
        style={{
          fontSize: 14,
          color: '#F1F1F1',
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  )
}

export default CanvasLoader
