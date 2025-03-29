import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdown = ({ items, value, setValue, placeholder = 'Select an option' }: any) => {
    const [open, setOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState(items);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={dropdownItems}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setDropdownItems}
                placeholder={placeholder}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.listItemLabel}
                listItemContainerStyle={styles.listItemContainer}
            />
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    container: { paddingVertical: 10, flex: 1 },
    dropdown: {
        backgroundColor: 'white',
    },
    dropdownContainer: {
    },
    listItemLabel: {
        marginLeft: 10,
        fontSize: 12,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
});
