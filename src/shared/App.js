import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cachedData: null,
      actMap: [],
      actTileUi: {},
      searchText: '',
      redirectHome: false,
      datesTable: {},
      actKeysReordered: [],
      endIndex: 10
    };
  }

  componentDidMount() {
    console.log('mountdata', this.props.data)
    this.setState(this.props.data)
  }

  render() {
    console.log(this.state);
    return (
      <div>
        Hello world
      </div>
    )
  }
}

export default App;
