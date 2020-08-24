import React, {Component} from 'react';
class EditCondition extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      diagnosed: '',
      typeOfPain: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.editCondition(this.props.conditionId, this.state)
    this.setState({
      name: '',
      diagnosed: '',
      typeOfPain: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Update Condition</h1>
        <div>
          <input
            className="input"
            placeholder="Update Name"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
        <br />

        <div>
          <input
            className="input"
            placeholder="Is diagnosed"
            type="text"
            name="diagnosed"
            onChange={this.handleChange}
            value={this.state.diagnosed}
          />
        </div>
        <br />

        <div>
          <input
            className="input"
            placeholder="Update Type Of Pain"
            type="text"
            name="typeOfPain"
            onChange={this.handleChange}
            value={this.state.typeOfPain}
          />
        </div>
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
}
export default EditCondition;
