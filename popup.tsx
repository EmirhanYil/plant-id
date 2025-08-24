import { useState } from "react"
import { identifyPlant } from "./api"
import "bootstrap/dist/css/bootstrap.min.css"
import "./popup.scss"

function IndexPopup() {
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePlantIdentification = async () => {
    setLoading(true)
    try {
      const placeHolderImage = "https://www.logees.com/media/catalog/product/cache/6c03d0ca4a55b77a53f63bf96ece8a1f/m/o/monstera_thai_constellation.jpg"
      const result = await identifyPlant(placeHolderImage)
      setResponse(result)
    } catch (error) {
      console.error('Error identifying plant:', error)
      setResponse('Error identifying plant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid p-3" style={{ width: "350px" }}>
      <div className="row">
        <div className="col-12">
          <h2 className="h4 text-primary mb-3">Plant ID</h2>
          {/* place holder for snipping tool image*/}
          <div className="mb-3">
            <p className="text-muted">[Image from snipping tool will go here]</p>
          </div>
          <button onClick={handlePlantIdentification} className="btn btn-success w-100">
            <i className="bi bi-scissors me-2"></i>
            Take a Cutting!
          </button>

          {/* Response display */}
          {loading && <p>Identifying Your Cutting...</p>}
          {response && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6>Plant Information:</h6>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
