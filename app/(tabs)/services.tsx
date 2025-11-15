import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authAPI } from '../../services/api';

export default function ServicesScreen() {
  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await authAPI.logout();
              router.replace('/');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              router.replace('/');
            }
          },
        },
      ],
      { cancelable: true }
    );
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
        <View style={styles.sectionHeaderFullWidth}>
          <Text style={styles.sectionTitleFullWidth}>Opções</Text>
        </View>
        <View style={styles.section}>
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
        <View style={styles.solicitationHeaderFullWidth}>
          <Text style={styles.sectionTitleFullWidth}>Solicitações</Text>
        </View>
        <View style={styles.section}>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  logoImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeaderFullWidth: {
    borderBottomWidth: 1,
    borderBottomColor: '#5b585818',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  sectionTitleFullWidth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  solicitationHeaderFullWidth: {
    borderTopWidth: 1,
    borderTopColor: '#5b585818',
    borderBottomWidth: 1,
    borderBottomColor: '#5b585818',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
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
    gap: 15,
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

