import React from "react";

const RemoveMedication = (props) => {
  const { medication, remove } = props;

  return (
    <div>
      <button type="sumbit" onClick={() => remove(medication.id)}>
        Delete
      </button>
    </div>
  );
};

export default RemoveMedication;
