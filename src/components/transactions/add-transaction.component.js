import React, { Component } from "react";
import TransactionDataService from "./transaction.service";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeFields = this.onChangeFields.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);

    this.state = {
      id: null,
      amount: 0,
      description: "", 
      transaction_type: "",
      submitDisabled: true,
      showErrorMsg: ''
    };
  }

  /**
   * 
   * @param: Event event
   * Comment: Set the value for the input fields 
   */
  onChangeFields(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
    this.checkButtonDisable();
  }

  /**
   * @param: null
   * @returns:
   * Comment: Set the submit button enable or disable
   */
  checkButtonDisable() {
    let enbDisValue = true;
    if (parseFloat(this.state.amount) > 0 && this.state.description !== '' && this.state.transaction_type !== '') {
      enbDisValue = false;
    }
    this.setState({submitDisabled: enbDisValue});
  }

  /**
   * 
   * @returns
   * Comment: Save the final transaction to database
   */
  saveTransaction() {
    var data = {
      transaction_type: this.state.transaction_type,
      amount: this.state.amount,
      description: this.state.description
    };
    this.setState({
      showErrorMsg: ''
    });
    TransactionDataService.create(data)
      .then(response => {
        // this.setState({
        //   submitted: true
        // });
        this.props.history.push('/transactions');
      }, error => {
        console.log(error.response);
        if (error.response.data.message) {
          this.setState({
            showErrorMsg: error.response.data.message
          });
        }
      });
      // .catch(e => {
      //   console.log(e.message)
      //   console.log('yes it is her');
      //   console.log(e);
      // });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            {this.state.showErrorMsg !== '' ? (
              <div className="err-class">
              <h4 >{this.state.showErrorMsg}</h4>
            </div>) : ''}


            <div className="form-group">
              <label htmlFor="transaction_type">Transaction Type</label>
              <select className="form-control" id ="transaction_type" name="transaction_type" required onChange={(e) => this.onChangeFields(e)}>
                  <option value="">Select Transaction Type</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="Amount"
                required
                value={this.state.title}
                onChange={(e) => this.onChangeFields(e)}
                // onChange={this.onChangeFields($event, 'amount')}
                name="amount"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={(e) => this.onChangeFields(e)}
                // onChange={this.onChangeFields($event, 'description')}
                name="description"
              />
            </div>

            <button onClick={this.saveTransaction} disabled={this.state.submitDisabled} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}