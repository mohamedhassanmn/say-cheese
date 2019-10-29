import React from 'react'
import './Mark.css'

const Mark = (props) => (<div className="mark" style={{backgroundImage:`url(${props.image})`,backgroundSize:"cover"}} />)

export default Mark;
