import React from "react";

const RemoveMedication = (props) => {
  // let medication = props.medication;
  async function handleRemove(event) {
    event.preventDefault();
    await this.props.remove(this.props.medication);
  }

  return (
    <div>
      <button type="button" onClick={(e) => handleRemove(e)}>
        Delete
      </button>
    </div>
  );
};

export default RemoveMedication;
