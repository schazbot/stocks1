import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    options: {
      filter: "All",
      sort: "Default"
    }
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(data => this.setState({ stocks: data }));
  }

  buyStock = stockId => {
    this.setState({
      portfolio: [...this.state.portfolio, stockId]
    });
  };

  sellStock = stockIndex => {
    this.setState({
      portfolio: this.state.portfolio.filter(
        (stockId, idx) => idx !== stockIndex
      )
    });
  };

  getPortfolioStocks = () => {
    return this.state.portfolio.map(stkId =>
      this.state.stocks.find(s => s.id === stkId)
    );
  };

  changeSortType = sortType => {
    this.setState({
      options: {
        ...this.state.options,
        sort: sortType
      }
    });
  };

  changeFilterType = filterType => {
    this.setState({
      options: {
        ...this.state.options,
        filter: filterType
      }
    });
  };

  sortStocks = (stocks, sortType) =>
    sortType === "Default"
      ? stocks
      : [...stocks].sort((a, b) => {
          if (sortType === "Alphabetically") {
            return a.name.localeCompare(b.name);
          }
          if (sortType === "Price") {
            return a.price - b.price;
          }
        });

  getUniqueStockTypes = () => {
    return [...new Set(this.state.stocks.map(stock => stock.type))];
  };

  filterStocks = (stocks, filterType) => {
    return filterType === "All"
      ? stocks
      : stocks.filter(s => s.type === filterType);
  };

  render() {
    const portfolio = this.getPortfolioStocks();
    
    const filteredStocks = this.filterStocks(
      this.state.stocks,
      this.state.options.filter
    );
    const sortedStocks = this.sortStocks(
      filteredStocks,
      this.state.options.sort
    );


    return (
      <div>
        <SearchBar
          filterTypes={["All", ...this.getUniqueStockTypes()]}
          changeFilterType={this.changeFilterType}
          changeSortType={this.changeSortType}
          currentSortType={this.state.options.sort}
          sortTypes={["Default", "Alphabetically", "Price"]}
        />
        <div className="row">
          <div className="col-8">
            <StockContainer stocks={sortedStocks} buyStock={this.buyStock} />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolio={portfolio}
              sellStock={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
