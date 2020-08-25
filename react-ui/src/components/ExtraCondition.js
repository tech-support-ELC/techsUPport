import React from 'react';

const ExtraCondition = (props) => {
    const condition = props.condition;
    console.log('aaaaaa', props)
    return (
      <div>
        <div>
          Condition name:
          <br/>
          {condition.name}
        </div>
        <div>
          Is it diagnosed?
          <br/>
          {condition.diagnosed}
        </div>
        <div>
          Type of pain
          {condition.typeOfPain}
        </div>
      </div>
    )
}

export default ExtraCondition
