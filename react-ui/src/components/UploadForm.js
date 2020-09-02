import React from "react";
import { connect } from 'react-redux'


export const UploadForm = (props) => {
  const { doctors, conditions, uploadHandler, handleFileRead, handleChange } = props
  const { description, type, doctorId, conditionId } = props

  const types = ['Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']

  return (
    < form onSubmit={uploadHandler} >
      <label>Enter a short description of what this document contains:</label>
      <input
        name='description'
        type='text'
        placeholder='Description'
        value={description}
        onChange={handleChange}
      />
      <label>Select what type of document this is:
          <select
          name='type'
          value={type}
          onChange={handleChange}
        >
          {types.map((type, i) => {
            return (
              <option key={i} value={type}>{type}</option>
            )
          })
          }
        </select>
      </label>
      <label>Which doctor is this document associated with?
          <select
          name='doctorId'
          value={doctorId}
          onChange={handleChange}
        >
          <option >Select Doctor</option>
          {doctors &&
            doctors.map(doctor => {
              const { id, firstName, lastName } = doctor
              return (
                <option key={id} value={id}>{firstName} {lastName}</option>
              )
            })
          }
        </select>
      </label>
      <label>What condition does this document relate to?
          <select
          name='conditionId'
          value={conditionId}
          onChange={handleChange}
        >
          <option>Select Condition</option>
          {conditions &&
            conditions.map(condition => {
              const { id, name } = condition
              return (
                <option key={id} value={id}>{name}</option>
              )
            })
          }
        </select>
      </label>
      <label>Choose File</label>
      <input
        type='file'
        onChange={handleFileRead}
        required
      />
      <button type="submit" >Upload</button>
    </form >
  );
};


const mapState = ({ doctors, conditions }) => ({ doctors, conditions })

export default connect(mapState)(UploadForm);

