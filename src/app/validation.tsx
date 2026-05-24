import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  UIManager,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ValidatePassScreen() {
  const [busDigits, setBusDigits] = useState(['', '', '', '']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState('Select bus number prefix');

  // References to handle jumping focus automatically across input fields
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const prefixes = [
    'KA57F',
    'KA01F',
    'KA53F',
    'KA42F',
    'KA51AK',
    'KA51AJ',
    'KA41D',
    'KA42FA',
    'KA01FA',
  ];

  const handleDigitChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, ''); 
    const newDigits = [...busDigits];
    newDigits[index] = cleanText.slice(-1);
    setBusDigits(newDigits);

    if (cleanText && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const updatedCode = newDigits.join('');
    if (updatedCode.length === 4) {
      inputRefs[index].current?.blur();
      
      // Fallback to a default prefix if they didn't select one explicitly
      const finalPrefix = selectedPrefix !== 'Select bus number prefix' ? selectedPrefix : 'KA57F';
      const formattedBusNumber = `BMTC BUS ${finalPrefix}${updatedCode}`;

      // AUTOMATIC REDIRECTION: Pass both validation state and the combined bus number string
      router.replace({
        pathname: './passdetails', 
        params: { 
          validated: 'true',
          busNumber: formattedBusNumber // <--- Passing the final string here
        }
      });
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // If the backspace key is hit on an empty box, shift cursor backwards
    if (e.nativeEvent.key === 'Backspace' && !busDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSelectPrefix = (prefix: string) => {
    setSelectedPrefix(prefix);
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Half: Camera Live Scanner Area */}
      <View style={styles.cameraContainer}>
        <View style={styles.mockCameraView}>
          
          <View style={styles.toastOverlay}>
            <Ionicons name="bus-outline" size={18} color="#1c3d5a" />
            <Text style={styles.toastText}>Enter bus number or Scan QR to validate</Text>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.cameraControlsRow}>
            <View style={styles.zoomSliderContainer}>
              <Ionicons name="search" size={16} color="#ffffff" />
              <View style={styles.zoomTrack} />
              <View style={styles.zoomThumb} />
            </View>
            
            <TouchableOpacity style={styles.actionIconButton}>
              <Ionicons name="flash-off" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {/* Bottom Half: Form Entry Panel */}
      <View style={styles.bottomSheetContainer}>
        <View style={styles.dragHandle} />
        
        <Text style={styles.sheetTitle}>Enter bus number</Text>

        <TouchableOpacity 
          style={styles.dropdownSelector} 
          activeOpacity={0.7}
          onPress={() => setIsDropdownOpen(true)}
        >
          <Text style={[
            styles.dropdownPlaceholderText, 
            selectedPrefix !== 'Select bus number prefix' && styles.dropdownSelectedText
          ]}>
            {selectedPrefix}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#555555" />
        </TouchableOpacity>

        {/* Input Character Boxes Row */}
        <View style={styles.inputMatrixRow}>
          {busDigits.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.digitBox}
              keyboardType="number-pad" // Enforces standard layout number pad keyboard on focus
              maxLength={1}
              textAlign="center"
              value={digit}
              onChangeText={(text) => handleDigitChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholderTextColor="#bbbbbb"
              selectTextOnFocus={true}
            />
          ))}
        </View>
      </View>

      {/* Prefix Selection Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownCard}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderTitle}>Select bus number prefix</Text>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={true}>
              {prefixes.map((prefix, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.prefixOption,
                    index === prefixes.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={() => handleSelectPrefix(prefix)}
                >
                  <Text style={styles.prefixOptionText}>{prefix}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  mockCameraView: {
    flex: 1,
    backgroundColor: '#3a474a', 
    justifyContent: 'space-between',
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  toastOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  toastText: {
    color: '#1967d2',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 8,
  },
  backButton: {
    position: 'absolute',
    top: 58,
    left: 20,
    zIndex: 10,
  },
  cameraControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  zoomSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginRight: 20,
  },
  zoomTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 10,
    position: 'relative',
  },
  zoomThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: '25%',
    top: -4,
  },
  actionIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT * 0.40,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f2942',
    marginBottom: 20,
    textAlign: 'left',
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  dropdownPlaceholderText: {
    fontSize: 15,
    color: '#757575',
  },
  dropdownSelectedText: {
    color: '#111111',
    fontWeight: '500',
  },
  inputMatrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  digitBox: {
    width: '22%',
    height: 56,
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
    fontSize: 22,
    fontWeight: '600',
    color: '#111111',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  dropdownCard: {
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.55,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  dropdownHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f2942',
  },
  prefixOption: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  prefixOptionText: {
    fontSize: 16,
    color: '#0f2942',
    fontWeight: '500',
  },
});