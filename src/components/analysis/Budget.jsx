import React, { useEffect } from 'react';
import { COLORS, SIZES } from '../../../styles';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AddIcon from 'react-native-vector-icons/Feather';
import RNPickerSelect from 'react-native-picker-select';
import { AddBudgetItem, DeleteBudgetItem, GetBudgetList } from '../../store/mmkv';
import { EditBudgetItem } from '../../store/mmkv';

function Budget() {
  const [budget, setBudget] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [newBudgetItem, setNewBudgetItem] = React.useState({
    key: '',
    value: null,
  });
  const [selectedItem, setSelectedItem] = React.useState({
    key: '',
    value: null,
  });

  useEffect(() => {
    const budgetList = GetBudgetList();
    budgetList.map(item => {
      item.key = item.name;
      item.value = item.budget;
    });
    budgetList.forEach(item => {
      delete item.name;
      delete item.budget;
    });
    setBudget(budgetList);
  }, [addModalVisible, editModalVisible]);

  React.useEffect(() => {
    // Calculate total when budget changes
    const newTotal = budget.reduce((acc, item) => acc + item.value, 0);
    setTotal(newTotal);
  }, [budget]);



  const handleAddIconPress = () => {
    setAddModalVisible(true);
  };

  const handlePencilIconPress = clickedItem => {
    // Set both selectedItem and newBudgetItem to the clicked item's values
    setSelectedItem(clickedItem);
    setNewBudgetItem(clickedItem);
    setEditModalVisible(true);
  };

  const emptyMethod = (value) => {

  };

  const handleDeleteBudget = (budgetName) => {
    DeleteBudgetItem(budgetName);
    setEditModalVisible(false);
  };

  const handleSaveNewBudgetItem = () => {
    // Validate if both key and value are provided
    if (!newBudgetItem.key || newBudgetItem.value === null) {
      // You can display an error message here
      return;
    }
    AddBudgetItem(newBudgetItem.key, newBudgetItem.value);

    // Update the budget state with the new item
    setBudget(prevBudget => [
      ...prevBudget,
      { key: newBudgetItem.key, value: newBudgetItem.value },
    ]);

    // Close the modal
    setAddModalVisible(false);

    // Clear the newBudgetItem state for the next entry
    setNewBudgetItem({ key: '', value: null });
  };

  const handleSaveEditItem = () => {
    // Check if key and value are provided and not null, undefined, or empty strings
    if (!selectedItem.key || !selectedItem.value) {
      // You can display an error message here
      return;
    }

    EditBudgetItem(newBudgetItem.key, newBudgetItem.value);

    setEditModalVisible(false); // Close the edit modal
    setNewBudgetItem({ key: '', value: null });
  };

  return (
    <View>
      <View style={styles.yourBudgetHeaderContainer}>
        <Text style={styles.componentTitle}>Your Budget</Text>
        <View style={styles.summaryIconView}>
          <TouchableOpacity
            onPress={handleAddIconPress}
            style={styles.iconContainer}>
            <AddIcon name="plus-circle" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {/* add new item */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}>
          <View style={styles.modalContainer}>
            {/* Dark overlay */}
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setAddModalVisible(false)}
            />

            {/* Modal content */}
            <View style={styles.modalView}>
              <View style={styles.editHeader}>
                <Text style={styles.ModalHeaderTitle}>Add Budget</Text>
              </View>
              <View style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                <RNPickerSelect
                  placeholder={{ label: 'Select budget item', value: null }}
                  onValueChange={value =>
                    setNewBudgetItem({ ...newBudgetItem, key: value })
                  }
                  items={[
                    { label: 'Bank Fees', value: 'BANK_FEES' },
                    { label: 'Entertainment', value: 'ENTERTAINMENT' },
                    { label: 'Food and drink', value: 'FOOD_AND_DRINK' },
                    { label: 'General merchandise', value: 'GENERAL_MERCHANDISE' },
                    { label: 'General services', value: 'GENERAL_SERVICES' },
                    {
                      label: 'Government and non-profit',
                      value: 'GOVERNMENT_AND_NON_PROFIT',
                    },
                    { label: 'Home improvement', value: 'HOME_IMPROVEMENT' },
                    { label: 'Loan payments', value: 'LOAN_PAYMENTS' },
                    { label: 'Medical', value: 'MEDICAL' },
                    { label: 'Personal care', value: 'PERSONAL_CARE' },
                    { label: 'Rent and utilities', value: 'RENT_AND_UTILITIES' },

                    { label: 'Transportation', value: 'TRANSPORTATION' },
                    { label: 'Travel', value: 'TRAVEL' },
                  ]}
                />
                {/* Use TextInput for entering budget item value */}
                <TextInput
                  style={{ marginLeft: SIZES.padding, marginBottom: SIZES.padding, fontSize: SIZES.h3 }}
                  placeholder="Enter budget item value"
                  keyboardType="numeric"
                  value={
                    newBudgetItem.value ? newBudgetItem.value.toString() : ''
                  }
                  onChangeText={text => {
                    const numValue = text !== '' ? parseFloat(text) : null;
                    setNewBudgetItem({ ...newBudgetItem, value: numValue });
                  }}
                />

                <View style={styles.ModalButtonContainer}>
                  <TouchableOpacity style={{ flex: 0, width: '50%', alignItems: 'center' }} onPress={handleSaveNewBudgetItem}>
                    <Text style={{ color: COLORS.green }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 0, width: '50%', alignItems: 'center' }} onPress={() => setAddModalVisible(false)}>
                    <Text style={{ color: COLORS.red }}>Cancel</Text>
                  </TouchableOpacity>
                </View>

              </View>
              {/* Replace TextInput for budget item name with RNPickerSelect */}


            </View>
          </View>
        </Modal>

        {/* edit */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}>
          <View style={styles.modalContainer}>
            {/* Dark overlay */}
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setEditModalVisible(false)}
            />

            {/* Edit modal content */}

            <View style={styles.modalView}>
              <View style={styles.editHeader}>
                <Text style={styles.ModalHeaderTitle}>Edit Budget</Text>
              </View>
              <View style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                <RNPickerSelect
                  placeholder={{
                    label: selectedItem.key,
                    value: selectedItem.key,

                  }}
                  onValueChange={value =>
                    emptyMethod(value)
                  }
                  disabled={true} // Make RNPickerSelect unclickable
                  items={budget.map(item => ({ label: item.key, value: item.key }))}
                />
                {/* Use TextInput for entering budget item value */}
                <TextInput
                  style={{ marginLeft: SIZES.padding, marginBottom: SIZES.padding, fontSize: SIZES.h3 }}
                  placeholder="Enter new budget item value"
                  keyboardType="numeric"
                  value={
                    newBudgetItem.value ? newBudgetItem.value.toString() : ''
                  }
                  onChangeText={text => {
                    const numValue = text !== '' ? parseFloat(text) : null;
                    setNewBudgetItem({ ...newBudgetItem, value: numValue });
                  }}
                />
                <View style={styles.ModalButtonContainer}>
                  <TouchableOpacity style={{ flex: 0, width: '33%', alignItems: 'center' }} onPress={handleSaveEditItem}>
                    <Text style={{ color: COLORS.green }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, width: '33%', alignItems: 'center' }} onPress={() => setEditModalVisible(false)}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, width: '33%', alignItems: 'center' }} onPress={() => handleDeleteBudget(selectedItem.key)}>
                    <Text style={{ color: COLORS.red }}>Delete</Text>
                  </TouchableOpacity>
                </View>


              </View>
              {/* Use RNPickerSelect for selecting budget item name */}


            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.box}>
        {/*Gym*/}

        {/* Rendering the state array */}
        {budget.map((item, index) => (
          <React.Fragment key={item.key}>
            <TouchableOpacity onPress={() => handlePencilIconPress(item)}>
              <View style={styles.summaryView}>
                <View style={styles.currencyLabelTextContainer}>
                  <Text style={styles.currencyLabelText}>{item.key}</Text>
                </View>
                <View style={styles.currentTextContainer}>
                  <Text style={styles.currentText}>$ {item.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {<View style={styles.divider} />}
          </React.Fragment>
        ))}

        {/*Total*/}
        <View style={[styles.summaryView, { marginTop: 25 }]}>
          <View style={styles.currencyLabelTextContainer}>
            <Text style={styles.currencyLabelText}>Total</Text>
          </View>
          <View style={styles.currentTextContainer}>
            <Text style={styles.currentText}>$ {total}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  yourBudgetHeaderContainer: {
    flexDirection: 'row',
  },
  ModalHeaderTitle: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',

  },
  headerContainer: {
    width: '100%',
    height: SIZES.height * 0.06,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: COLORS.navyBlue,
    flexDirection: 'row',
  },
  headerText: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    alignSelf: 'center',
    marginLeft: SIZES.padding,
  },
  componentTitle: {
    color: COLORS.black,
    fontSize: SIZES.h2,
    marginLeft: SIZES.padding,
  },
  box: {
    backgroundColor: '#ffffff',
    marginLeft: SIZES.padding,
    marginRight: SIZES.padding,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  summaryView: {
    flexDirection: 'row',
    borderColor: COLORS.white,
    marginBottom: 5,
  },
  summaryIconView: {
    marginRight: SIZES.padding,
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  iconContainer: {
    marginLeft: 2,

  },
  currencyLabelText: {
    verticalAlign: 'middle',
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  currentText: {
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  currencyLabelTextContainer: {
    flex: 2,
    alignItems: 'flex-start',
  },
  currentTextContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  currentIconContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  currentTextH1: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: SIZES.h1,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc', // Customize the color as needed
    marginVertical: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  barChartContainer: {
    marginLeft: 10, // Horizontal margin
    marginRight: 10,
    borderRadius: 16,
  },
  ModalButtonContainer: {
    flexDirection: 'row',

  },
  editHeader: {
    width: '100%',
    height: SIZES.height * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: COLORS.navyBlue,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
  },
});

export default Budget;
