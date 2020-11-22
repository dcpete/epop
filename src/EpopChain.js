import React, { useEffect, useRef, useState } from "react"
import { Button, Col } from 'reactstrap'
import DrawScreen from './DrawScreen'
import TitleEntry from "./TitleEntry"

export default function EpopChain() {
  const [title, setTitle] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const containerRef = useRef(null)

  const onChangeMode = () => {
    return () => setIsDrawing(!isDrawing)
  }

  return (
    <div>
      <Col xs="10" style={{alignSelf: "center"}} ref={containerRef}>
        <TitleEntry isDisabled={isDrawing} title={title} setTitle={setTitle} onSubmit={onChangeMode} />
        <Button onClick={onChangeMode()}>Submit</Button>
        <DrawScreen isDisabled={!isDrawing} onSubmit={onChangeMode} parentRef={containerRef} />
      </Col>
    </div>
  )
}