import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontsConst } from '@app/assets/assets';
import { Divider, Menu } from 'react-native-paper';
import { CustomIcon } from '@app/components';
import { ICON_TYPE } from '@app/components/CustomIcon';

const Filter = ({ modalVisible, setModalVisible, handleFilterChange }) => {
    return (
        <Menu
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            anchor={
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        flexDirection: 'row',
                    }}>
                    <CustomIcon
                        origin={ICON_TYPE.ANT_ICON}
                        name={'filter'}
                        size={16}
                        color={'#00958C'}
                        style={{
                            marginTop: 3,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: FontsConst.OpenSans_Bold,

                            fontSize: 16,
                            color: '#00958C',
                            marginLeft: 5,
                            marginRight: 10,
                        }}>
                        Filter
                    </Text>
                </TouchableOpacity>
            }>
            <Menu.Item
                onPress={() => {
                    handleFilterChange();
                    setModalVisible(false);
                }}
                title="All"
            />
            <Divider />
            <Menu.Item
                onPress={() => {
                    handleFilterChange('unread');
                    setModalVisible(false);
                }}
                title="Unread"
            />
            <Divider />
            <Menu.Item
                onPress={() => {
                    handleFilterChange('read');
                    setModalVisible(false);
                }}
                title="Read"
            />

            <Divider />
        </Menu>
    );
};

export default Filter;
