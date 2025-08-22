import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./popup.scss"

function IndexPopup() {
  const [data, setData] = useState("")

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('button clicked!', event.currentTarget);
  }

  return (
    <div className="container-fluid p-3" style={{ width: "350px" }}>
      <div className="row">
        <div className="col-12">
          <h2 className="h4 text-primary mb-3">Plant ID</h2>
          <button onClick={handleClick} className="btn btn-success w-100">
            <i className="bi bi-scissors me-2"></i>
            Take a Cutting!
          </button>

        </div>
      </div>
    </div>
  )
}



export default IndexPopup
