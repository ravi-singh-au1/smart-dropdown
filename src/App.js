import React from "react";
import SearchBar from "./components/SearchBar";
import DisplayCountries from "./components/DisplayCountries";

class App extends React.Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countryList: null,
      search: "",
      filteredCountries: [],
    };

    this.getSearchWord = this.getSearchWord.bind(this);
  }

  // fetch country list
  async componentDidMount() {
    const url = "http://13.57.235.126:5000/countries";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ countryList: data.countries, isLoading: false });
  }

  // get search keyword
  getSearchWord(e) {
    this.setState({
      search: e.target.value,
    });
    this.filterCountries();
  }

  // filter
  filterCountries() {
    const { countryList, search } = this.state;

    let matches = countryList.filter((country) => {
      const regex = new RegExp(`^${search}`, "gi");
      return country.match(regex);
    });

    if (search.length === 0) {
      console.log(search.length);
      this.setState({
        filteredCountries: [],
      });
    }
    this.setState({
      filteredCountries: matches,
    });
  }

  render() {
    const { filteredCountries } = this.state;
    return (
      <div>
        {this.state.isLoading || !this.state.countryList ? (
          <div>Loading...</div>
        ) : (
          <div>
            <p>{this.state.countryList[0]}</p>
          </div>
        )}
        <SearchBar getWord={this.getSearchWord} />
        <DisplayCountries />
        {filteredCountries.map((country) => (
          <p>{country}</p>
        ))}
      </div>
    );
  }
}

export default App;
