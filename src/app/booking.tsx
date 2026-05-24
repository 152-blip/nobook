import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';
import { router } from 'expo-router';


const BookingScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Bookings</Text>

                    <Text style={styles.ticketText}>Trips/Tickets</Text>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={styles.activeTab}>
                        <Text style={styles.activeTabText}>Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab}>
                        <Text style={styles.tabText}>Expired</Text>
                    </TouchableOpacity>
                </View>

                {/* Pass Card */}
                <View style={styles.card}>
                    <View style={styles.cardTopRow}>
                        <View style={styles.badgeRow}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Ordinary</Text>
                            </View>

                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Weekly</Text>
                            </View>
                        </View>

                        <Text style={styles.price}>₹ 350.0</Text>
                    </View>

                    <Text style={styles.passTitle}>
                        Ordinary Weekly Pass
                    </Text>

                    <Text style={styles.validText}>
                        Pass valid till
                    </Text>

                    <Text style={styles.dateText}>
                        31 May 2026, 11:59 PM
                    </Text>

                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => router.push('/passdetails' as any)}>
                        <Icon
                            name="chevron-forward"
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                {/* Renewal Section */}
                {/*
        <View style={styles.renewContainer}>
          <Text style={styles.expiryText}>
            Your pass is expiring in 1 days ⚠️
          </Text>

          <TouchableOpacity style={styles.renewButton}>
            <Text style={styles.renewButtonText}>
              Renew
            </Text>
          </TouchableOpacity>
        </View>
        */}

                {/* Book Button */}
                <TouchableOpacity style={styles.bookButton}>
                    <Icon
                        name="ticket-outline"
                        size={18}
                        color="#fff"
                    />

                    <Text style={styles.bookButtonText}>
                        {' '}Book a new pass
                    </Text>
                </TouchableOpacity>

                {/* Bottom Banner */}
                <View style={styles.banner}>
                    <View>
                        <Text style={styles.bannerTitle}>
                            ZOMATO DELIVERY PARTNER
                        </Text>

                        <Text style={styles.bannerSub}>
                            Join and earn more
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.joinButton}>
                        <Text style={styles.joinButtonText}>
                            JOIN NOW
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
export default BookingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 12,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        flex: 1,
        marginLeft: 15,
    },

    ticketText: {
        fontSize: 15,
        color: '#666',
    },

    tabContainer: {
        flexDirection: 'row',
        marginTop: 25,
        paddingHorizontal: 20,
    },

    activeTab: {
        marginRight: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#11c5a3',
        paddingBottom: 8,
    },

    activeTabText: {
        color: '#11c5a3',
        fontSize: 16,
        fontWeight: '600',
    },

    tab: {
        paddingBottom: 8,
    },

    tabText: {
        color: '#666',
        fontSize: 16,
    },

    card: {
        marginHorizontal: 20,
        marginTop: 25,
        backgroundColor: '#0f8b8d',
        borderRadius: 18,
        padding: 18,
        position: 'relative',
    },

    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    badgeRow: {
        flexDirection: 'row',
    },

    badge: {
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
    },

    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    price: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
    },

    passTitle: {
        marginTop: 22,
        fontSize: 28,
        color: '#fff',
        fontWeight: '700',
    },

    validText: {
        marginTop: 20,
        color: '#d9f5ef',
        fontSize: 14,
    },

    dateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
    },

    arrowButton: {
        position: 'absolute',
        right: 18,
        bottom: 20,
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    //   renewContainer: {
    //     marginHorizontal: 20,
    //     marginTop: 18,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //   },

    //   expiryText: {
    //     color: '#777',
    //     fontSize: 14,
    //   },

    //   renewButton: {
    //     backgroundColor: '#76f2d1',
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     borderRadius: 10,
    //   },

    //   renewButtonText: {
    //     color: '#fff',
    //     fontWeight: '700',
    //   },

    bookButton: {
        marginHorizontal: 20,
        marginTop: 35,
        backgroundColor: '#6ef0d4',
        paddingVertical: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    banner: {
        marginHorizontal: 20,
        marginTop: 40,
        backgroundColor: '#e9e9e9',
        borderRadius: 12,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bannerTitle: {
        fontWeight: '700',
        fontSize: 15,
        color: '#444',
    },

    bannerSub: {
        marginTop: 4,
        color: '#666',
    },

    joinButton: {
        backgroundColor: '#d7fff3',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
    },

    joinButtonText: {
        color: '#00a884',
        fontWeight: '700',
    },
});