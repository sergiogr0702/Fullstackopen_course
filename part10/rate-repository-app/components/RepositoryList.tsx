import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Filter, RepositoriesData, Repository, RepositoryEdge } from "@/types";
import { RepositoryItem } from "./RepositoryItem";
import { RepositoryListHeader } from "./RepositoryListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface Props {
  onEndReach: () => void;
  repositoriesData: RepositoryEdge[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export class RepositoryList extends Component<Props> {
  // Define renderHeader as a class property
  renderHeader = () => {
    const { searchQuery, onSearchChange, filter, onFilterChange } = this.props;

    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    );
  };

  renderItem = ({ item }: { item: RepositoryEdge }) => {
    return <RepositoryItem repository={item.node} />;
  };

  render() {
    const { repositoriesData, onEndReach } = this.props;

    return (
      <FlatList
        ListHeaderComponent={this.renderHeader} // Use class property here
        data={repositoriesData}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.contentContainer}
        renderItem={this.renderItem}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryList;
