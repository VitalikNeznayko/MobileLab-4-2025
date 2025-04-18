import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";

const AddTask = ({ onAddTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate) => {
    const userTimeZone = moment.tz.guess();
    const localDate = moment(selectedDate).tz(userTimeZone, true).toDate();
    setDate(localDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!name || !date) {
      Alert.alert("Error", "Please provide all required fields.");
      return;
    }

    const newTask = {
      name,
      description,
      date,
      isFinished: false,
    };

    onAddTask(newTask);

    setName("");
    setDescription("");
    setDate(null);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.inputField}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.inputField}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <Pressable onPress={showDatePicker} style={styles.datePickerBtn}>
        <Text style={styles.datePickerText}>
          {date
            ? `Scheduled for: ${date.toLocaleString()}`
            : "Select Date & Time"}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      <Button title="Add Reminder Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    marginVertical: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  datePickerBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 14,
    backgroundColor: "#f4f4f4",
    marginBottom: 12,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AddTask;
