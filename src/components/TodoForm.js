import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.textInput.focus();
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref={(input) => { this.textInput = input; }}
          value={this.state.value}
          onChange={this.handleChange}
          type="text"></input>
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default TodoForm;
