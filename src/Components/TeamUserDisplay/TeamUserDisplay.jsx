import React, { Component } from "react";
import SearchBox from "../Common/SearchBox";
import { TeamHttpService } from "../../Services/TeamHttpService";
import { UserHttpService } from "../../Services/UserHttpService";
import DataRows from "../Common/DataRows";

export default class TeamUserDisplay extends Component {
  state = {
    teamDetail: {},
    filteredUsers: [],
    teamUsers: [],
    searchText: "",
  };
  async componentDidMount() {
    const teamUsers = [];
    const id = this.props.location.pathname.replace("/", "");
    let teamDetail = await TeamHttpService.getTeamById(id);
    teamDetail = await teamDetail.json();

    for (let id of teamDetail.teamMemberIds) {
      let member = await UserHttpService.getUserById(id);
      member = await member.json();
      teamUsers.push(member);
    }

    this.setState({ teamUsers, teamDetail, filteredUsers: teamUsers });
  }

  handleUserSearch = (query) => {
    const filteredUsers = this.state.teamUsers.filter((user) =>
      user.displayName.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredUsers, searchText: query });
  };

  render() {
    const { filteredUsers, searchText } = this.state;
    const { name } = this.state.teamDetail;

    return (
      <>
        <h2>{name} : Users</h2>
        <SearchBox value={searchText} onChange={this.handleUserSearch} />
        <DataRows
          data={filteredUsers}
          displayProp={"displayName"}
          displayButton={false}
        />
      </>
    );
  }
}
