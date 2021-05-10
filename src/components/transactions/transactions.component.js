import React, { Component } from "react";
import TransactionDataService from "./transaction.service";
// import './transactions.css';
import moment from 'moment'

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.transactionsList = this.transactionsList.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      transactions: [],
    //   searchTitle: ""
    };
  }

  componentDidMount() {
    this.transactionsList();
  }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

  transactionsList() {
    TransactionDataService.getAll()
      .then(response => {
        this.setState({
            transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TransactionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /**
   * 
   * @returns:
   * Comment: Make the table listing for the transaction
   */
  renderTableData() {
      if (this.state.transactions.length > 0) {
        return this.state.transactions.map((trans, index) => {
        return (
            <tr key={trans.id}>
                <td>{moment(trans.date).format('YYYY-MM-DD')}</td>
                <td>{trans.description}</td>
                <td>{trans.transaction_type === 'credit' ? trans.amount : '-'}</td>
                <td>{trans.transaction_type === 'debit' ? trans.amount : '-'}</td>
                
                <td>{trans.balance}</td>
            </tr>
        )
        });
    } else {
        return <tr key="1">
            <td colSpan="5">No transaction found</td>
        </tr>
    }
 }
  render() {
    // const { searchTitle } = this.state;    
    return (
      <div className="list row">
        {/* <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by description"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}

        <div className="col-md-8">
          <h4 className="transaction">Transactions List</h4>
          <button
            className="btn btn-sm btn-danger"
            onClick={this.transactionsList}
          >
            Refresh list
          </button>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Credit</td>
                        <td>Debit</td>
                        <td>Running Balance</td>
                    </tr>
                </thead>
                <tbody>{this.renderTableData()}</tbody>
            </table>
        </div>        
      </div>
    );
  }
}