import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

import {COLORS, FONTS, SIZES, icons, images, dummy} from '../constants';

const Setting = () => {
  const [profile, setProfile] = React.useState(dummy.ProfileData);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [onChangeText, setChagneText] = React.useState();

  function renderSettingHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Image
            source={icons.person}
            resizeMode="contain"
            style={{width: 60, height: 60, tintColor: COLORS.white}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{width: 200, alignItems: 'center'}}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>
              {profile.name}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <TextInput
              onChangeText={value => setChagneText(value)}
              style={{
                width: 200,
                height: 60,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.white,
                marginBottom: 10,
                paddingHorizontal: SIZES.base,
                color: COLORS.white,
                ...FONTS.h2,
              }}
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 60,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                setModalVisible(!modalVisible),
                  setProfile({...profile, name: onChangeText});
              }}>
              <Text> 저장 </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <View>{renderSettingHeader()}</View>
    </View>
  );
};

export default Setting;
