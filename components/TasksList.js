import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import TaskCard from "./TaskCard";

const TasksList = ({ tasks, onDelete, onToggleFinished }) => {
  const renderTask = ({ item }) => (
    <TaskCard
      task={item}
      onDelete={onDelete}
      onToggleFinished={onToggleFinished}
    />
  );

  if (!tasks.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyMessage}>No taskers left!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.emptyMessage}>Your To-Do List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});

export default TasksList;
