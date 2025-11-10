import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Employee {
  id: string;
  role: string;
  salary: string;
}

interface DepartmentData {
  title: string;
  logoText: string;
  employees: Employee[];
}

const departmentData: Record<string, DepartmentData> = {
  prefeitura: {
    title: 'Prefeitura',
    logoText: 'FORTALEZA PREFEITURA',
    employees: [
      { id: '1', role: 'Prefeito', salary: 'R$ 12.500,00' },
      { id: '2', role: 'Vice-Prefeita', salary: 'R$ 8.500,00' },
      { id: '3', role: 'Secretária', salary: 'R$ 3.250,00' },
      { id: '4', role: 'Auxiliar Geral', salary: 'R$ 2.150,00' },
      { id: '5', role: 'Auxiliar Geral', salary: 'R$ 2.150,00' },
    ],
  },
  camara: {
    title: 'Câmara',
    logoText: 'CÂMARA MUNICIPAL DE FORTALEZA',
    employees: [
      { id: '1', role: 'Presidente da Câmara', salary: 'R$ 8.500,00' },
      { id: '2', role: 'Analista de Tesouraria', salary: 'R$ 6.500,00' },
      { id: '3', role: 'Secretária', salary: 'R$ 2.250,00' },
      { id: '4', role: 'Auxiliar Geral', salary: 'R$ 1.550,00' },
      { id: '5', role: 'Estagiário', salary: 'R$ 900,00' },
    ],
  },
  colegios: {
    title: 'Colégios Municipais',
    logoText: 'Secretaria Municipal de Educação de Fortaleza',
    employees: [
      { id: '1', role: 'Professor de Artes', salary: 'R$ 8.500,00' },
      { id: '2', role: 'Professora de Ciências', salary: 'R$ 6.500,00' },
      { id: '3', role: 'Professor de Física', salary: 'R$ 2.250,00' },
      { id: '4', role: 'Professora de Matemática', salary: 'R$ 1.550,00' },
      { id: '5', role: 'Professor de Português', salary: 'R$ 900,00' },
    ],
  },
  saude: {
    title: 'Saúde',
    logoText: 'Prefeitura de Fortaleza Secretaria Municipal da Saúde',
    employees: [
      { id: '1', role: 'Médico Cardiologista', salary: 'R$ 13.500,00' },
      { id: '2', role: 'Médico Geral', salary: 'R$ 9.500,00' },
      { id: '3', role: 'Enfermeira Chefe', salary: 'R$ 5.325,00' },
      { id: '4', role: 'Enfermeira', salary: 'R$ 3.400,00' },
      { id: '5', role: 'Assistente de Enfermagem', salary: 'R$ 2.000,00' },
    ],
  },
};

export default function TransparencyDetailScreen() {
  const params = useLocalSearchParams();
  const department = params.department as string;
  const data = departmentData[department] || departmentData.prefeitura;
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    router.back();
  };

  const filteredEmployees = data.employees.filter((employee) =>
    employee.role.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Transparência</Text>
          <Text style={styles.headerSubtitle}>
            Verifique a transparência dos órgãos municipais cadastrados de Fortaleza
          </Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/image-login.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>{data.logoText}</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText('')}
                style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Employees List */}
        <View style={styles.employeesList}>
          {filteredEmployees.map((employee, index) => (
            <View key={employee.id}>
              <View style={styles.employeeItem}>
                <View style={styles.employeeIconContainer}>
                  <Ionicons name="person" size={24} color="#0a7ea4" />
                </View>
                <View style={styles.employeeContent}>
                  <Text style={styles.employeeRole}>{employee.role}</Text>
                  <Text style={styles.employeeLabel}>Funcionário Público</Text>
                </View>
                <View style={styles.employeeSalary}>
                  <Text style={styles.salaryLabel}>Salário:</Text>
                  <Text style={styles.salaryValue}>{employee.salary}</Text>
                </View>
              </View>
              {index < filteredEmployees.length - 1 && <View style={styles.divider} />}
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 5,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  headerRightPlaceholder: {
    width: 34,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  searchSection: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  employeesList: {
    backgroundColor: '#FFFFFF',
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
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  employeeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  employeeContent: {
    flex: 1,
  },
  employeeRole: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  employeeLabel: {
    fontSize: 14,
    color: '#666',
  },
  employeeSalary: {
    alignItems: 'flex-end',
  },
  salaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  salaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginLeft: 68,
  },
});

