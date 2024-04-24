import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useTempos from '../../hooks/userStorage'
import { Ionicons } from '@expo/vector-icons'

export function Tempos() {
  const [listTempos, setListTempos] = useState([])
  const focused = useIsFocused();
  const { getTempos, removeTempo } = useTempos();

  useEffect( () => {
    async function loadTempos(){
      const tempos = await getTempos()
      setListTempos(tempos)
    }

    loadTempos();
  }, [focused])

  async function handleDeleteTempo(tempo) {
    const tempos = await removeTempo(tempo)
    setListTempos(tempos)
  }

  return (
    <SafeAreaView style={styles.safeHeader}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Tempos</Text>
      </View>

      <View style={styles.content}>
        <FlatList style={styles.contentArea}
          data={listTempos}
          keyExtractor={ (item, index) => String(index) }
          renderItem={ ({ item }) => (
            <View style={styles.contentList}>
              <Text style={styles.textTemp}>{item.toFixed(2)}s</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleDeleteTempo(item)}>
                <Ionicons name='trash-outline' size={20} color={'black'} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeHeader:{
    flex:1
  },
  header: {
    backgroundColor: '#000000',
      paddingtop: 58,
      paddingBottom: 14,
      paddingLeft: 14,
      paddingRight: 14,
  },
  title:{
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    paddingLeft: 5,
  },
  content: {
    flex: 1
  },
  contentList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 15
  },
  textTemp:{
    fontSize: 20,
    marginTop: 3
  },
  button: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 8,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8
  }
});

export default Tempos;