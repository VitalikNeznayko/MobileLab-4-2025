import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import moment from "moment-timezone";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);

  const APP_ID = Constants.expoConfig.extra.oneSignalAppId;
  const API_KEY = Constants.expoConfig.extra.oneSignalApiKey;

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        parsedTasks.sort((a, b) => a.date - b.date);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    const notificationId = await sendNotification(task);

    if (notificationId) {
      task.id = notificationId;
      const updatedTasks = [task, ...tasks].sort((a, b) => a.date - b.date);

      setTasks(updatedTasks);
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      alert("Error sending notification. Please try again.");
    }
  };

  const toggleTaskFinished = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isFinished: !task.isFinished } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete && !taskToDelete.isFinished) {
      try {
        await cancelNotification(taskToDelete.id);
      } catch (error) {
        console.warn("Failed to cancel notification:", error);
      }
    }

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const cancelNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `https://api.onesignal.com/notifications/${notificationId}?app_id=${APP_ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data.errors ? false : true;
    } catch (error) {
      console.error("Error canceling notification:", error);
      return false;
    }
  };

  const getCurrentUserId = async () => {
    return await AsyncStorage.getItem("externalId");
  };

  const sendNotification = async (task) => {
    try {
      const externalUserId = await getCurrentUserId();
      const localDate = moment(task.date).tz("Europe/Kiev", true).toDate();
      const response = await fetch("https://api.onesignal.com/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${API_KEY}`,
        },
        body: JSON.stringify({
          app_id: APP_ID,
          target_channel: "push",
          include_aliases: {
            external_id: [externalUserId],
          },
          headings: { en: task.name },
          contents: { en: task.description },
          send_after: localDate.toISOString(),
        }),
      });

      const data = await response.json();
      return data.errors ? false : data.id;
    } catch (error) {
      console.error("Error sending notification:", error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do task</Text>
      <AddTask onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleFinished={toggleTaskFinished}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ToDo;
