import React, { useState } from 'react'
import {InputGroup, Input, Button} from 'reactstrap'

export default function TitleEntry(props) {
  const { title, setTitle, onSubmit, isDisabled } = props

  return (
    <div>
      <InputGroup>
        <Input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          disabled={isDisabled}
        />
      </InputGroup>
    </div>
  )
}