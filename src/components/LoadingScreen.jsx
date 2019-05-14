import React from 'react'; 
import Spinner from 'react-bootstrap/Spinner'; 

const pageStyle = {
  backgroundColor: "#FFF",
  position: "absolute", 
  top: "0px", 
  left: "0px",
  width: "100vw", 
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", 
  alignItems: "center"
}

const LoadingScreen = () => {
  return (
    <div style={pageStyle} id="loading-screen">
      <Spinner style={{marginBottom: "10px"}} animation="border" variant="dark" />
      <h5>One moment please...</h5>
    </div>
  )
}

export default LoadingScreen;

