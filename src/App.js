import React, { Component } from 'react';
import FixerContent from './FixerContent';
import FixerItemSidebar from './FixerItemSidebar';
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFeed: {},
      dataRetrieved: false,
      selectedFixer: "align_multiline_comment"
    };
  }

  isActive(fixerId) {
    return this.state.selectedFixer === fixerId;
  }

  setActiveTab(fixerId) {
    this.setState({ selectedFixer: fixerId });
  }

  componentDidMount() {
    fetch(`json/php-cs-fixer-data-2.9.0.json`)
      .then(response => response.json())
      .then(response => {
        const dataFeed = response;

        this.setState({ dataFeed, dataRetrieved: true });
      });
  }

  render() {
    return (
      this.state.dataRetrieved ? this.getHtmlOnceDataRetrieved()
      : <Loading
        isLoading={!this.props.dataRetrieved}
        loadingClassName='loading' />
    );
  }

  getHtmlOnceDataRetrieved() {
    var fixers = this.state["dataFeed"]["fixers"];
    return (
      <div className="row">
        {this.getSideBar(fixers)}
        {this.getMain(fixers)}
      </div>
    );
  }

  getSideBar(fixers) {
    return (
      <div className="col-3 col-xs-12">
        <div className="sidebar-nav-fixed">
          <ul className="list-group">
            {Object.keys(fixers).map((fixer) => {
              var configurable = this.state["dataFeed"]["fixers"][fixer]["configurable"];
              var risky = this.state["dataFeed"]["fixers"][fixer].hasOwnProperty('riskyDescription');

              return <FixerItemSidebar key={fixer} fixer={this.state["dataFeed"]["fixers"][fixer]}
                fixerName={fixer} isConfigurable={configurable} isRisky={risky}
                isActive={this.isActive(fixer)}
                onActiveTab={this.setActiveTab.bind(this, fixer)}
              />;
            })}
          </ul>
        </div>
      </div>
    );
  }

  getMain(fixers) {
    return (
      <div className="col-9 col-xs-12" id="main">
        <FixerContent
          fixer={fixers[this.state.selectedFixer]}
          fixerName={this.state.selectedFixer}
          isConfigurable={fixers[this.state.selectedFixer]["configurable"]}
        />
      </div>
    );
  }
}

export default App;
