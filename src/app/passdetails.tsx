import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PassDetails() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [showFare, setShowFare] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [animationToggle, setAnimationToggle] = useState(false);

  // Core web-safe Animated drivers to completely replace Moti
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const checkScaleAnim = useRef(new Animated.Value(0.96)).current;

  const params = useLocalSearchParams();
  const busNumber = params.busNumber;

  // Manage animation loops safely for web and native runtimes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSuccessVisible) {
      interval = setInterval(() => {
        setAnimationToggle((prev) => !prev);
      }, 2200);

      // Reset values before triggering loops
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0.6);
      checkScaleAnim.setValue(0.96);

      // 1. Outer Ring Pulse Animation Loop
      Animated.loop(
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.6,
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();

      // 2. Inner Checkbox Breathing Animation Loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(checkScaleAnim, {
            toValue: 1.04,
            duration: 1100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(checkScaleAnim, {
            toValue: 0.96,
            duration: 1100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();
      checkScaleAnim.stopAnimation();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSuccessVisible]);

  useEffect(() => {
    if (params.validated === 'true') {
      setIsSuccessVisible(true);
      router.setParams({
        validated: undefined,
      });
    }
  }, [params.validated]);

  const handleVerificationDone = () => {
    setIsSuccessVisible(false);
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const day = now.getDate();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Your Bus Pass</Text>
          <Text style={styles.cancelText}>Cancel</Text>
        </View>

        {/* TOP CARD */}
        <View style={styles.topCard}>
          <View style={styles.topRow}>
            <View style={styles.circle}>
              <Image
                source={require('../../assets/images/sd.jpg')}
                style={styles.bmtcLogoImage}
                resizeMode="cover"
              />
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.passTitle}>Ordinary Weekly Pass</Text>
              <View style={styles.badgeRow}>
                <View style={styles.greenBadge}>
                  <Text style={styles.greenBadgeText}>Weekly</Text>
                </View>
                <View style={styles.grayBadge}>
                  <Text style={styles.grayBadgeText}>Ordinary</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.passRow}>
            <Text style={styles.label}>Pass ID:</Text>
            <Text style={styles.value}>TPASS894642911</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.validateButton}
            onPress={() => router.push('./validation')}
          >
            <Text style={styles.validateText}>Validate Pass</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>ⓘ How to Validate Your Pass?</Text>
        </View>

        {/* COMBINED DETAILS CARD */}
        <View style={styles.detailsCard}>
          <Text style={styles.bookingTitle}>Booking Details</Text>
          <View style={styles.divider} />

          <View style={styles.detailsContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.smallLabel}>Passenger name</Text>
              <Text style={styles.mainText}>gurukiran v</Text>

              <Text style={styles.smallLabel}>Identification type</Text>
              <Text style={styles.mainText}>Aadhar Card</Text>

              <Text style={styles.smallLabel}>Identification number (Last 4 digits)</Text>
              <Text style={styles.mainText}>1553</Text>

              <Text style={styles.smallLabel}>Pass purchase date</Text>
              <Text style={styles.mainText}>24 May 2026, 07:46 AM</Text>

              <Text style={styles.smallLabel}>Pass valid from</Text>
              <Text style={styles.mainText}>24 May 2026, 12:00 AM</Text>

              <Text style={styles.smallLabel}>Pass valid till</Text>
              <Text style={styles.mainText}>30 May 2026, 11:59 PM</Text>
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={() => setShowImagePreview(true)}>
              <Image
                source={require('../../assets/images/dophamine.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.fareRow}>
            <TouchableOpacity onPress={() => setShowFare(true)}>
              <Text style={styles.fareLabelText}>Pass fare</Text>
            </TouchableOpacity>
            <Text style={styles.price}>₹ 350.0</Text>
          </View>

          <View style={styles.divider} />

<TouchableOpacity style={styles.invoiceButton}>
  <MaterialCommunityIcons 
    name="email-open-outline" 
    size={18} 
    color="#00b894" 
  />
  <Text style={styles.invoiceText}>Generate mail receipt</Text>
</TouchableOpacity>

          <View style={styles.divider} />

          {/* VALIDATION DETAILS */}
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Last Validated</Text>
            <Text style={styles.statusValue}>{getFormattedDateTime()}</Text>

            <Text style={styles.statusLabel}>Bus Number</Text>
            <Text style={styles.statusValue}>{busNumber || 'BMTC BUS KA57F6108'}</Text>

            <Text style={styles.statusLabel}>Validated By</Text>
            <Text style={styles.statusValue}>Self</Text>
          </View>

          {/* QR CODE */}
          <View style={styles.qrContainer}>
            <Image
              source={require('../../assets/images/qr.png')}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* TERMS AND CONDITIONS */}
        <View style={styles.termsCardContainer}>
          <TouchableOpacity style={styles.termsButton} onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.termsText}>Terms and Conditions</Text>
            <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#666" />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.dropdownContent}>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Pass is valid for travel until expiry date printed on the pass.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Show ID proof used during booking whenever asked.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Only one pass is allowed per ID card.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Improper misuse of pass may result in penalty.</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* SUCCESS MODAL */}
      <Modal visible={isSuccessVisible} transparent={true} animationType="fade">
        <View style={styles.successModalOverlay}>
          <View style={styles.successCardContainer}>
            <View style={styles.iconContainerWrapper}>
              
              {/* Outer Pulsing Glow Ring using pure Animated.View */}
              <Animated.View
                style={[
                  styles.pulsingGlowRing,
                  {
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              />

              {/* Inner Checkmark Container using pure Animated.View */}
              <Animated.View
                style={[
                  styles.successDotIconAnimation,
                  {
                    backgroundColor: animationToggle ? '#0066ff' : '#00cc66',
                    transform: [{ scale: checkScaleAnim }],
                  },
                ]}
              >
                <Ionicons name="checkmark" size={26} color="#ffffff" />
              </Animated.View>
            </View>

            <Text style={styles.successHeadlineText}>Self verification done{"\n"}successfully</Text>

            <View style={styles.receiptMetaTable}>
              <View style={styles.metaTableRow}>
                <Text style={styles.metaTableLabel}>Pass number</Text>
                <Text style={styles.metaTableValue}>TPASS894642911</Text>
              </View>
              <View style={styles.metaTableRow}>
                <Text style={styles.metaTableLabel}>Pass type</Text>
                <Text style={styles.metaTableValue}>weekly</Text>
              </View>
              <View style={styles.metaTableRow}>
                <Text style={styles.metaTableLabel}>Pass valid till</Text>
                <Text style={styles.metaTableValue}>30 May 2026, 11:59 PM</Text>
              </View>
              <View style={styles.dividerLine} />
              <View style={[styles.metaTableRow, { marginBottom: 0, marginTop: 8 }]}>
                <Text style={styles.fareLabelfare}>Pass fare</Text>
                <Text style={styles.farePriceValue}>₹ 350.0</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.successActionButton} onPress={handleVerificationDone}>
              <Text style={styles.successActionText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FARE DETAILS POPUP MODAL */}
      <Modal transparent={true} visible={showFare} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.farePopup}>
            <Text style={styles.popupTitle}>Pass fare</Text>
            <View style={styles.row}>
              <Text style={styles.popupLabel}>Base Price</Text>
              <Text style={styles.popupValue}>₹ 350.0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.popupLabel}>GST</Text>
              <Text style={styles.popupValue}>₹ 0.0</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.popupLabel}>Toll Price</Text>
              <Text style={styles.popupValue}>₹ 0.0</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.row}>
              <Text style={styles.totalText}>Total Amount</Text>
              <Text style={styles.totalValue}>₹ 350.0</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* IMAGE PREVIEW MODAL */}
      <Modal visible={showImagePreview} transparent={true} animationType="fade">
        <View style={styles.imageModalContainer}>
          <Pressable style={styles.imageBackdrop} onPress={() => setShowImagePreview(false)} />
          <TouchableOpacity style={styles.closePreviewButton} onPress={() => setShowImagePreview(false)}>
            <Ionicons name="close" size={34} color="#fff" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/dophamine.jpg')}
            style={styles.fullPreviewImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#111',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  cancelText: {
    color: '#00d1b2',
    fontSize: 15,
  },
  topCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 15,
    borderRadius: 18,
    padding: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bmtcLogoImage: {
    width: '90%',
    height: '70%',
  },
  passTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  greenBadge: {
    backgroundColor: '#cffebb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  greenBadgeText: {
    color: '#7be07c',
    fontWeight: '400',
  },
  grayBadge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  grayBadgeText: {
    color: '#555',
    fontWeight: '500',
  },
  passRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  label: {
    color: '#777',
    marginRight: 10,
  },
  value: {
    color: '#222',
    fontWeight: '400',
  },
  validateButton: {
    backgroundColor: 'rgb(36, 224, 194)',
    marginTop: 25,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  validateText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'rgb(36, 224, 194)',
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 18,
    padding: 20,
  },
  bookingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  detailsContent: {
    flexDirection: 'row',
  },
  smallLabel: {
    color: '#645b4b',
    fontSize: 11,
    marginTop: 10,
  },
  mainText: {
    color: '#222',
    fontSize: 15,
    marginTop: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 48,
    marginLeft: 15,
    marginTop: 6,
  },
  fareRow: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  fareLabelText: {
    fontSize: 16,
    color: '#645b4b',
    textDecorationLine: 'underline',
    marginTop:-57,
  },
  price: {
    fontSize: 27,
    fontWeight: '500',
    color: '#222',
    marginTop:-40,
  },
invoiceButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 7,
  borderWidth: 2,
  borderColor: '#47af9d',
  
  // 1. Shrink the height/thickness
  paddingVertical: 8,       // Reduced from 12 to 8 for a sleeker profile
  paddingHorizontal: 20,    // Adds comfortable breathing room on the sides
  
  // 2. Shrink the width
  alignSelf: 'center',      // Forces the button to only be as wide as its content
  borderRadius: 8,          // Slightly smaller radius matches the smaller size better
  gap: 8, 
},
  invoiceText: {
    color: '#40c4aa',
    marginLeft: 8,
    fontSize: 14,
  },
  statusCard: {
    backgroundColor: '#c8df8b',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 20,
  },
  statusLabel: {
    fontSize: 13,
    color: '#544c49',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 16,
    color: '#000000',   
    marginBottom: 12,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  qrImage: {
    width: 260,
    height: 260,
  },
  termsCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  termsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  dropdownContent: {
    marginTop: 18,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  bulletDot: {
    marginRight: 10,
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    color: '#555',
    lineHeight: 20,
    fontSize: 13,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCardContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
  },
  successHeadlineText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  receiptMetaTable: {
    width: '100%',
    marginBottom: 25,
  },
  metaTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaTableLabel: {
    fontSize: 14,
    color: '#666',
  },
  metaTableValue: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
  },
  dividerLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 2,
  },
  farePriceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  successActionButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  successActionText: {
    color: '#fff',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  farePopup: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  popupLabel: {
    fontSize: 18,
    color: '#555',
  },
  popupValue: {
    fontSize: 18,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#bdbdbd',
    borderStyle: 'dashed',
    marginVertical: 20,
    width: '100%',
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.82)',
  },
  fullPreviewImage: {
    width: '68%',
    height: '58%',
    borderRadius: 18,
  },
  closePreviewButton: {
    position: 'absolute',
    top: 55,
    right: 25,
    zIndex: 10,
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 15,
    position: 'relative',
  },
  pulsingGlowRing: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#00cc66',
  },
  successDotIconAnimation: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0066ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  fareLabelfare:{
    fontSize: 16,
    color: '#43403a',
  },
});