
import './style.scss'
import './uppy.min.css'
import React from "react"
import ReactDOM from "react-dom"
import UppyView from "./features/uppy/components/UppyView.jsx"

ReactDOM.render(
    <div>
        <UppyView />
    </div>,
    document.querySelector(".wrapper")
)

