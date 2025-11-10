import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ServicesScreen() {
  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    router.replace('/(tabs)/index');
  };

  const handleServicePress = (serviceName: string) => {
    console.log(`Service pressed: ${serviceName}`);
    if (serviceName === 'Atendimento ao cidadão') {
      router.push('/citizen-service');
    } else if (serviceName === 'Serviços públicos') {
      router.push('/public-services');
    } else if (serviceName === 'Suas solicitações') {
      router.push('/my-requests');
    } else if (serviceName === 'Transparência') {
      router.push('/transparency');
    }
    // TODO: Implementar navegação para outras telas de serviços
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Serviços oferecidos</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/images/image-login.png')}
          style={styles.logoImage}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Opções Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Opções</Text>
            <TouchableOpacity>
              <Ionicons name="list" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.serviceGrid}>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => handleServicePress('Atendimento ao cidadão')}>
              <Image
                source={require('../../assets/images/public-help.png')}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>Atendimento ao cidadão</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => handleServicePress('Serviços públicos')}>
              <Image
                source={require('../../assets/images/public-services.png')}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>Serviços públicos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => handleServicePress('Transparência')}>
              <Image
                source={require('../../assets/images/transparency.png')}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>Transparência</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Solicitações Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solicitações</Text>
          
          <View style={styles.serviceGrid}>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => handleServicePress('Suas solicitações')}>
              <Image
                source={require('../../assets/images/mi-solicitations.png')}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceText}>Suas solicitações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    fontSize: 16,
    color: '#0a7ea4',
    fontWeight: '600',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
  },
  serviceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  serviceText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
    fontWeight: '500',
  },
});

