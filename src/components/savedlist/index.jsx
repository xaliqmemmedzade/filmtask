import React from 'react'
import { useSelector } from 'react-redux'

function SavedList() {
    const data = useSelector(state=>state)
    console.log(data);
    
  return (
    <div>SavedList</div>
  )
}

export default SavedList