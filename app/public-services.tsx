import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
}

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Fornecimento de água',
    description: 'Todas as regiões da cidade estão abastecidas',
    iconName: 'water',
    iconColor: '#009688',
  },
  {
    id: '2',
    title: 'Serviço de coleta de Lixo',
    description: 'A coleta está em atividade agora na sua região',
    iconName: 'trash',
    iconColor: '#4CAF50',
  },
  {
    id: '3',
    title: 'Serviço de energia elétrica',
    description: 'Equipe realizando reparos na sua região, pode ocorrer falta de energia momentanea',
    iconName: 'flash',
    iconColor: '#FFC107',
  },
  {
    id: '4',
    title: 'Defesa Civil',
    description: 'Alerta para tempestade nas próximas horas',
    iconName: 'rainy',
    iconColor: '#2196F3',
  },
  {
    id: '5',
    title: 'Obras na Avenida Brasil',
    description: 'Fluxo lento',
    iconName: 'alert-circle',
    iconColor: '#FF9800',
  },
];

export default function PublicServicesScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Serviços Públicos</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Atualização dos Serviços Públicos em tempo real!
          </Text>
        </View>

        {/* Services List */}
        <View style={styles.servicesList}>
          {services.map((service, index) => (
            <View key={service.id}>
              <View style={styles.serviceItem}>
                <View style={[styles.serviceIconContainer, { backgroundColor: `${service.iconColor}20` }]}>
                  <Ionicons
                    name={service.iconName as any}
                    size={28}
                    color={service.iconColor}
                  />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
              </View>
              {index < services.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5ff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'left',

  },
  headerPlaceholder: {
    width: 34,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  banner: {
    backgroundColor: '#f4f3f3ff',
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  servicesList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginLeft: 80,
  },
});

