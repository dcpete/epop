import React, { useEffect, useRef, useState } from "react"
import { Button } from "reactstrap"

export default function DrawScreen(props) {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const containerRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const { isDisabled } = props

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context
    
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const canvas = canvasRef.current
      canvas.width = containerRef.current.offsetWidth
      canvas.height = containerRef.current.offsetHeight
      canvas.style.width = `${containerRef.current.offsetWidth}px`
      canvas.style.height = `${containerRef.current.offsetHeight}px`
    }
  }, [containerRef, window.innerWidth])

  const startDrawing = ({ nativeEvent }) => {
    if (isDisabled) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (isDisabled) {
      return
    }
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  
  return (
    <div style={{ border: "1px solid #ced4da", backgroundColor: isDisabled ? "#e9ecef" : "#ffffff", borderRadius: ".25rem" }} ref={containerRef}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}
