import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

const TaskCard = ({ task, onDelete, onToggleFinished }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <TouchableOpacity onPress={() => onToggleFinished(task.id)}>
          <Ionicons
            name={task.isFinished ? "checkbox" : "square-outline"}
            size={30}
            color={task.isFinished ? "green" : "#ccc"}
          />
        </TouchableOpacity>

        <View>
          <Text
            style={[styles.cardTitle, task.isFinished && styles.finishedText]}
          >
            {task.name}
          </Text>
          <Text style={styles.cardDescription}>{task.description}</Text>
          <Text style={styles.cardDescription}>
            {moment(task.date).format("DD MMM, YYYY, hh:mm A")}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={26} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    marginLeft: 6,
  },
  cardDescription: {
    width: 220,
    fontSize: 15,
    color: "#777",
    marginLeft: 6,
  },
  finishedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskCard;
