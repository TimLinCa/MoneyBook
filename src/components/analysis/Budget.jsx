import React from 'react';
import {COLORS, SIZES, FONTS} from '../../../styles';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AddIcon from 'react-native-vector-icons/Feather';
import PencilIcon from 'react-native-vector-icons/EvilIcons';
import TrashIcon from 'react-native-vector-icons/EvilIcons';

function Budget() {
  const [budget, setBudget] = React.useState([
    {key: 'Gym', value: 50},
    {key: 'Food', value: 100},
    {key: 'House', value: 200},
    {key: 'Food and Grocery', value: 400},
    {key: 'Hosing or Rent', value: 1000},
    {key: 'Bills', value: 200},
    {key: 'Insurance', value: 250},
    {key: 'Transportation', value: 200},
    {key: 'Entertainment', value: 100},
    {key: 'Personal Spending', value: 100},
  ]);

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    // Calculate total when budget changes
    const newTotal = budget.reduce((acc, item) => acc + item.value, 0);
    setTotal(newTotal);
  }, [budget]);

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
  const [selectedIcon, setSelectedIcon] = React.useState('');

  const handleAddIconPress = () => {
    setAddModalVisible(true);
    setSelectedIcon('add');
  };

  const handlePencilIconPress = clickedItem => {
    setSelectedItem(clickedItem); // Set the clicked item as selectedItem

    setEditModalVisible(true);
    setSelectedIcon('pencil');
  };

  const handleTrashIconPress = clickedItem => {
    // Filter out the clicked item and update the state
    const updatedBudget = budget.filter(
      budgetItem => budgetItem.key !== clickedItem.key,
    );
    setBudget(updatedBudget);
  };
  const handleCloseModal = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setSelectedIcon('');
  };
  const handleSaveNewBudgetItem = () => {
    // Validate if both key and value are provided
    if (!newBudgetItem.key || newBudgetItem.value === null) {
      // You can display an error message here
      return;
    }

    // Update the budget state with the new item
    setBudget(prevBudget => [
      ...prevBudget,
      {key: newBudgetItem.key, value: newBudgetItem.value},
    ]);

    // Close the modal
    setAddModalVisible(false);

    // Clear the newBudgetItem state for the next entry
    setNewBudgetItem({key: '', value: null});
  };

  const handleSaveEditItem = () => {
    // Check if key and value are provided and not null, undefined, or empty strings
    if (!selectedItem.key || !selectedItem.value) {
      // You can display an error message here
      return;
    }

    setBudget(prevBudget => {
      return prevBudget.map(item => {
        if (item.key === selectedItem.key) {
          // Replace the existing item with the updated one
          return {key: newBudgetItem.key, value: newBudgetItem.value};
        }
        return item; // Return the original item if the key doesn't match
      });
    });

    setEditModalVisible(false); // Close the edit modal
    setNewBudgetItem({key: '', value: null});
  };

  return (
    <View>
      <Text style={styles.componentTitle}>Your Budget</Text>
      <View style={styles.summaryIconView}>
        <TouchableOpacity
          onPress={handleAddIconPress}
          style={styles.iconContainer}>
          <AddIcon name="plus-circle" size={30} color="#000" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handlePencilIconPress}
          style={styles.iconContainer}>
          <PencilIcon name="pencil" size={30} color="#000" />
        </TouchableOpacity> */}

        {/* old */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter budget item name"
              value={newBudgetItem.key}
              onChangeText={text =>
                setNewBudgetItem({...newBudgetItem, key: text})
              }
            />
            <TextInput
              placeholder="Enter budget item value"
              keyboardType="numeric"
              value={newBudgetItem.value ? newBudgetItem.value.toString() : ''}
              onChangeText={text => {
                const numValue = text !== '' ? parseFloat(text) : null;
                setNewBudgetItem({...newBudgetItem, value: numValue});
              }}
            />
            <TouchableOpacity onPress={handleSaveNewBudgetItem}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}

        {/* add new item */}
        <Modal
          animationType="fade" // You can change animationType to achieve different effects
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
              <TextInput
                placeholder="Enter budget item name"
                value={newBudgetItem.key}
                onChangeText={text =>
                  setNewBudgetItem({...newBudgetItem, key: text})
                }
              />
              <TextInput
                placeholder="Enter budget item value"
                keyboardType="numeric"
                value={
                  newBudgetItem.value ? newBudgetItem.value.toString() : ''
                }
                onChangeText={text => {
                  const numValue = text !== '' ? parseFloat(text) : null;
                  setNewBudgetItem({...newBudgetItem, value: numValue});
                }}
              />
              <TouchableOpacity onPress={handleSaveNewBudgetItem}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
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
              <TextInput
                placeholder="Enter new budget item name"
                // value={selectedItem.key}
                onChangeText={text => setNewBudgetItem({key: text})}
              />
              <TextInput
                placeholder="Enter new budget item value"
                keyboardType="numeric"
                // value={selectedItem.value ? selectedItem.value.toString() : ''}
                onChangeText={text => {
                  const numValue = text !== '' ? parseFloat(text) : null;
                  setNewBudgetItem({...newBudgetItem, value: numValue});
                }}
              />
              <TouchableOpacity onPress={handleSaveEditItem}>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.box}>
        {/*Gym*/}

        {/* Rendering the state array */}
        {budget.map((item, index) => (
          <React.Fragment key={item.key}>
            <TouchableOpacity>
              <View style={styles.summaryView}>
                <View style={styles.currencyLabelTextContainer}>
                  <Text style={styles.currencyLabelText}>{item.key}</Text>
                </View>
                <View style={styles.currentTextContainer}>
                  <Text style={styles.currentText}>$ {item.value}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handlePencilIconPress(item)}
                  style={styles.iconContainer}>
                  <PencilIcon name="pencil" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTrashIconPress(item)} // Pass item as an argument
                  style={styles.iconContainer}>
                  <TrashIcon name="trash" size={30} color="#000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {<View style={styles.divider} />}
          </React.Fragment>
        ))}

        {/*Total*/}
        <View style={[styles.summaryView, {marginTop: 25}]}>
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
    padding: 20,
    width: '80%',
    alignItems: 'center',
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
    fontSize: SIZES.h1,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});

export default Budget;
