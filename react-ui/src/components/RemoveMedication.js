import React from "react";

// function handleRemove(){

// }
const RemoveMedication = (props) => {
  const { medication, remove } = props;

  return (
    <div>
      <button type="sumbit" onClick={() => remove(medication.id)}>
        Delete
      </button>

      {/* <button type="sumbit" onClick={() => (remove(medication.id)
   )}>
        Delete
      </button> */}
    </div>
  );
};

export default RemoveMedication;
