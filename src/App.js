import React from "react";
import CardNews from "./Lifecycle/CardNews";
import NavbarNews from "./Lifecycle/NavbarNews";
import SearchNews from "./Lifecycle/SearchNews";
import { BallTriangle } from "react-loader-spinner";

export default class NewsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      keyword: "",
      isLoading: false,
    };
    //console.log("CONSTRUCTOR");
    this.apiKey = process.env.REACT_APP_API;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    //console.log("DID MOUNT");
    fetch(`https://newsapi.org/v2/everything?q=Apple&from=2022-04-11&sortBy=popularity&apiKey=229fa3df3d624ffb835d2a51ec7779c9`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          news: response.articles,
          isLoading: false,
        });
      });
  }

  handleChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    fetch(`https://newsapi.org/v2/everything?q=${this.state.keyword}&apiKey=229fa3df3d624ffb835d2a51ec7779c9`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          news: [...response.articles],
          isLoading: false,
        });
        //console.log(this.state.news);
      });
  };

  render() {
    const style = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };

    return (
      <div>
        <NavbarNews />
        <SearchNews handleClick={this.handleClick} handleChange={this.handleChange} />
        {this.state.isLoading ? (
          <div style={style}>
            <BallTriangle color="green" height={80} width={80} />
          </div>
        ) : (
          <CardNews news={this.state.news} />
        )}
      </div>
    );
  }
}
