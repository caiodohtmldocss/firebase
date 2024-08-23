import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const RealMadridPlayers = () => {
  const [jogadores, setJogadores] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJogadores = async () => {
      setLoading(true);
      try {
        const jogadoresCollection = collection(db, 'real-madrid');
        const jogadoresSnapshot = await getDocs(jogadoresCollection);

        if (jogadoresSnapshot.empty) {
          console.log("Nenhum jogador encontrado na coleção 'real-madrid'.");
        } else {
          const jogadoresList = jogadoresSnapshot.docs.map(doc => {
            console.log(`Documento ${doc.id} dados: `, doc.data()); // Log para cada documento
            return {
              id: doc.id,
              ...doc.data()
            };
          });
          setJogadores(jogadoresList);
          console.log("Jogadores listados:", jogadoresList); // Log para a lista de jogadores
        }
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogadores();
  }, []);

  const handlePress = () => {
    setShowTable(!showTable);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text>Altura: {item.altura} m</Text>
      <Text>Data de Nascimento: {new Date(item.nascimento.seconds * 1000).toLocaleDateString()}</Text>
      <Text>Número: {item.numero}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title={showTable ? "Esconder Jogadores" : "Mostrar Jogadores"} onPress={handlePress} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : showTable && jogadores.length > 0 ? (
        <FlatList
          data={jogadores}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : showTable && jogadores.length === 0 ? (
        <Text>Nenhum jogador encontrado.</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RealMadridPlayers;
