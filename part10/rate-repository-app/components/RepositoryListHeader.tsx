import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { ThemedView } from "./ThemedView";
import { Picker } from "@react-native-picker/picker";
import { Filter } from "@/types";

interface RepositoryListHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function RepositoryListHeader({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: RepositoryListHeaderProps) {
  const styles = StyleSheet.create({
    pickerContainer: {
      width: "100%",
      backgroundColor: "transparent",
    },
    picker: {
      backgroundColor: "transparent",
      borderWidth: 0,
      color: "#000",
      fontSize: 16,
      padding: 15,
    },
    pickerItem: {
      fontSize: 16,
    },
    searchBar: {
      margin: 10,
      borderRadius: 10,
      elevation: 2,
    },
  });

  return (
    <ThemedView>
      <Searchbar
        placeholder="Search Repositories"
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ThemedView style={styles.pickerContainer}>
        <Picker
          selectedValue={filter}
          onValueChange={onFilterChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          dropdownIconColor="#000"
        >
          <Picker.Item label="Latest Repositories" value={Filter.LATEST} />
          <Picker.Item
            label="Highest Rated Repositories"
            value={Filter.HRATED}
          />
          <Picker.Item
            label="Lowest Rated Repositories"
            value={Filter.LRATED}
          />
        </Picker>
      </ThemedView>
    </ThemedView>
  );
}
