import React from "react";

function Summary() {
  const handleProceed = () => {
    alert("Proceeding...");
  };

  const handleCancel = () => {
    alert("Cancelled");
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    width: "50%",
    marginLeft: "5.8rem",
  };

  const proceedButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#5699E0", // Green color for Proceed button
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Red color for Cancel button
    color: "white",
  };
  return (
    <>
      <div className="details-in2">
        <div style={{ width: "90%", height: "78%" }}></div>
        <button style={proceedButtonStyle} onClick={handleProceed}>
          Proceed
        </button>
        <br />
        <button style={cancelButtonStyle} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default Summary;
