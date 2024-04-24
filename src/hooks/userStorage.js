import AsyncStorage from '@react-native-async-storage/async-storage';

const useTempos = () => {
  //Buscar Tempos Salvos
  const getTempos = async () => {
    try{
      const tempos = await AsyncStorage.getItem('tempos');
      return JSON.parse(tempos) || [];
    }catch(error){
      console.log("Erro ao buscar", error)
      return [];
    }
  }

  //Salvar um Tempo no Storage
  const saveTempo = async (tempo) => {
    try {
      let tempos = await getTempos();

      tempos.push(tempo)

      await AsyncStorage.setItem('tempos', JSON.stringify(tempos))

    } catch (error) {
      console.log("Erro ao Salvar", error)
    }
  }

  //Remover do Storage
  const removeTempo = async (tempo) => {
    try {
      let tempos = await getTempos();

      let index = tempos.indexOf(tempo);
      if (index !== -1){
        tempos.splice(index, 1);
      }

      await AsyncStorage.setItem('tempos', JSON.stringify(tempos))
      return tempos;

    } catch (error) {
      console.log("Erro ao Deletar", error)
    }
  }

  return {
    getTempos,
    saveTempo,
    removeTempo,
  }
}

export default useTempos;