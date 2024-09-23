import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [clientes, setClientes] = useState<any[]>([]); // Estado para los clientes

  const url = 'http://192.168.1.1/customers'; // Reemplaza con tu IP local

  // Obtener la lista de clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(url);
        console.log('Datos obtenidos:', response.data); // Añade este log
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };
  
    fetchClientes();
  }, []);

  // Renderizar cada cliente en la lista
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>{item.name} {item.lastName}</Text>
      <Text>{item.address}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      
      <FlatList
        data={clientes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    width: 1000,
    borderRadius: 5,
    height: 50,
    color: '#000',
  },
});
