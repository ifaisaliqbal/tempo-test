import SearchBox from "../Common/SearchBox";
import DataRows from "../Common/DataRows";
import { TeamHttpService } from "../../Services/TeamHttpService";
import React, { Component } from "react";

export default class TeamDisplay extends Component {
  state = {
    teams: [],
    filteredTeams: [],
    searchText: "",
  };

  async componentDidMount() {
    const teamsResponse = await TeamHttpService.getAllTeams();
    const teams = await teamsResponse.json();
    this.setState({
      teams,
      filteredTeams: teams,
    });
  }

  handleTeamSearch = (query) => {
    const filteredTeams = this.state.teams.filter((team) =>
      team.name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredTeams, searchText: query });
  };

  render() {
    const { filteredTeams, searchText } = this.state;
    return (
      <>
        <h1>Teams</h1>
        <SearchBox
          value={searchText}
          className="form-control"
          onChange={this.handleTeamSearch}
        />
        <DataRows data={filteredTeams} displayProp={"name"} />
      </>
    );
  }
}
