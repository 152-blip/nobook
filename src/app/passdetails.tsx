import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PassDetails() {
  // State hook to toggle the Terms and Conditions dropdown panel
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State handling visibility of the automatic success popup modal layout
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  // Hook to capture parameter messages routed backward from the validation input screen
  const params = useLocalSearchParams<{ validated?: string; busNumber?: string }>();

  // Extract the custom validated bus number string if present
  const busNumber = params.busNumber;

  // Watch for the validation parameter trigger sent back upon completing the code entry matrix
  useEffect(() => {
    if (params.validated === 'true') {
      setIsSuccessVisible(true);

      // Clean up parameter data pointers to ensure popups don't persist during standard re-renders
      router.setParams({ validated: undefined });
    }
  }, [params.validated]);

  // Helper function to format the validation timestamp dynamically
  const getFormattedDateTime = () => {
    const now = new Date();
    
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Your Bus Pass</Text>

          <Text style={styles.cancelText}>Cancel</Text>
        </View>

        {/* Top Card */}
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
              <Text style={styles.passTitle}>
                Ordinary Weekly Pass
              </Text>

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

          {/* Cleaned Route path redirection execution mapping */}
          <TouchableOpacity 
            style={styles.validateButton}
            onPress={() => router.push('./validation')} 
          >
            <Text style={styles.validateText}>Validate Pass</Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>
            ⓘ How to Validate Your Pass?
          </Text>
        </View>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.bookingTitle}>Booking Details</Text>

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
              <Text style={styles.mainText}>31 May 2026, 12:00 AM</Text>

              <Text style={styles.smallLabel}>Pass valid till</Text>
              <Text style={styles.mainText}>31 May 2026, 11:59 PM</Text>
            </View>

            <Image
              source={require('../../assets/images/WIN_20260523_22_31_49_Pro.jpg')}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.smallLabel}>Pass fare</Text>
            <Text style={styles.price}>₹ 350.0</Text>
          </View>

          <TouchableOpacity style={styles.invoiceButton}>
            <MaterialCommunityIcons name="email-open" size={18} color="#00b894" />
            <Text style={styles.invoiceText}>Generate mail receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Validation Status Card Container Element */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Last Validated</Text>
          <Text style={styles.statusValue}>{getFormattedDateTime()}</Text>

          <Text style={styles.statusLabel}>Bus Number</Text>
          <Text style={styles.statusValue}>
            {busNumber || 'BMTC BUS KA57F6108'}
          </Text>

          <Text style={styles.statusLabel}>Validated By</Text>
          <Text style={styles.statusValue}>Self</Text>
        </View>

        {/* Secure QR Code Container */}
        <View style={styles.qrCard}>
          <Image
            source={require('../../assets/images/Gemini_Generated_Image_z0wwzhz0wwzhz0ww.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        {/* Interactive Terms Card Container */}
        <View style={styles.termsCardContainer}>
          <TouchableOpacity 
            style={styles.termsButton} 
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.termsText}>Terms and Conditions</Text>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={18} 
              color="#666666" 
            />
          </TouchableOpacity>

          {/* Conditional Dropdown List Panel */}
          {isExpanded && (
            <View style={styles.dropdownContent}>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Pass is valid for travel for the services it has been purchased and until the expiry date printed on the pass</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>In case the conductor asks for your ID proof, you can either show a physical/digital copy of the ID used at the time of booking.</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Only one pass is allowed for one ID card</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Pass holders must show their passes to conductors or any authorised person on demand</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>Improper/misuse of past results in withdrawal of pass attract penalty and pass holder will be liable to legal implications</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>BMTC is not responsible if passenger/pass holder's mobile application is not working or switched off</Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>BMTC is not responsible if passenger/pass holder has entered wrong ID number in mobile pass purchased and the same cannot be accepted</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Success Modal Dialogue Overlay Container */}
      <Modal 
        visible={isSuccessVisible} 
        transparent={true} 
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successCardContainer}>
            
            <View style={styles.successDotIcon}>
              <View style={styles.innerSuccessDot} />
            </View>

            <Text style={styles.successHeadlineText}>
              Self verification done{"\n"}successfully
            </Text>

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
                <Text style={styles.metaTableValue}>24 May 2026, 11:59 PM</Text>
              </View>
              
              <View style={styles.dividerLine} />
              
              <View style={[styles.metaTableRow, { marginBottom: 0, marginTop: 8 }]}>
                <Text style={styles.fareLabelText}>Pass fare</Text>
                <Text style={styles.farePriceValue}>₹ 350.0</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.successActionButton} 
              onPress={() => setIsSuccessVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.successActionText}>Okay</Text>
            </TouchableOpacity>

          </View>
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
    fontSize: 18,
    fontWeight: '600',
  },
  cancelText: {
    color: '#00d1b2',
    fontSize: 15,
  },
  topCard: {
    backgroundColor: '#fff',
    margin: 15,
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.8,
    borderColor: '#0d47a1',
  },
  bmtcLogoImage: {
    width: '108%',
    height: '108%',
  },
  passTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  greenBadge: {
    backgroundColor: '#e9fff7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  greenBadgeText: {
    color: '#00b894',
    fontWeight: '600',
  },
  grayBadge: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  grayBadgeText: {
    color: '#555',
    fontWeight: '600',
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
    fontWeight: '600',
  },
  validateButton: {
    backgroundColor: '#24e0c2',
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
    color: '#888',
  },
  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 18,
    padding: 20,
  },
  bookingTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#222',
    marginBottom: 25,
  },
  detailsContent: {
    flexDirection: 'row',
  },
  smallLabel: {
    color: '#888',
    fontSize: 13,
    marginTop: 12,
  },
  mainText: {
    color: '#222',
    fontSize: 22,
    fontWeight: '500',
    marginTop: 4,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginLeft: 15,
    marginTop: 20,
  },
  fareRow: {
    marginTop: 25,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 42,
    fontWeight: '700',
    color: '#222',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#b2f5ea',
    paddingVertical: 14,
    borderRadius: 10,
  },
  invoiceText: {
    color: '#00b894',
    fontWeight: '600',
    marginLeft: 8,
  },
  statusCard: {
    backgroundColor: '#bbe5a3',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 12,
  },
  qrCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  qrImage: {
    width: 240,
    height: 240,
  },
  termsCardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  termsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  termsText: {
    fontSize: 15,
    color: '#555555',
    fontWeight: '500',
  },
  dropdownContent: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    paddingTop: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingRight: 10,
  },
  bulletDot: {
    fontSize: 16,
    color: '#111111',
    marginRight: 8,
    lineHeight: 20,
  },
  bulletText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
    flex: 1,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
    alignItems: 'center',
  },
  successDotIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e6f7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  innerSuccessDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00b894',
  },
  successHeadlineText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  receiptMetaTable: {
    width: '100%',
    marginBottom: 28,
  },
  metaTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaTableLabel: {
    fontSize: 13,
    color: '#718096',
  },
  metaTableValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2d3748',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#edf2f7',
    marginTop: 12,
    marginBottom: 4,
  },
  fareLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3748',
  },
  farePriceValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2d3748',
  },
  successActionButton: {
    width: '100%',
    backgroundColor: '#00b894',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  successActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});