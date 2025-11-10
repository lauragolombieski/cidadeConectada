import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function UserScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cpf: '',
    cep: '',
    fullAddress: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implementar lógica de salvamento
    console.log('Save profile:', formData);
    // Mostrar mensagem de sucesso ou navegar
  };

  const handleChangePassword = () => {
    // TODO: Implementar navegação para alterar senha
    console.log('Change password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} disabled>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity style={styles.userIconButton}>
            <Ionicons name="person" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número de Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de Telefone"
              placeholderTextColor="#999"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço de E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* CPF Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#999"
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
              keyboardType="numeric"
              maxLength={11}
            />
          </View>

          {/* CEP Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              placeholder="CEP"
              placeholderTextColor="#999"
              value={formData.cep}
              onChangeText={(value) => handleInputChange('cep', value)}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>

          {/* Full Address Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Rua, Av, Trav..."
              placeholderTextColor="#999"
              value={formData.fullAddress}
              onChangeText={(value) => handleInputChange('fullAddress', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Change Password Link */}
          <TouchableOpacity onPress={handleChangePassword} style={styles.changePasswordContainer}>
            <Text style={styles.changePasswordText}>Modificar minha senha</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          {/* Logo at Bottom */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/image-login.png')}
              style={styles.logoImage}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FE',
  },
  keyboardView: {
    flex: 1,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  userIconButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  changePasswordContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  changePasswordText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
});
