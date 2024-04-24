import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { Component} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component{
  constructor (props) {
    super(props);
    this.state = {
      numero: 0,
      button: 'INICIAR',
      ultimo: null,
    }

    this.timer = null;

    this.iniciar = this.iniciar.bind(this);
    this.zerar = this.zerar.bind(this);
  }

  iniciar() {

    if(this.timer != null) {
      //Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;
      this.setState({button: 'INICIAR'})
    }else{

      //Começa a girar timer
      this.timer = setInterval( () => {
        this.setState({numero: this.state.numero + 0.1 })
      }, 100);

      this.setState({button: 'PARAR'})
    }
  }

  zerar(){
    if(this.timer != null){
      clearInterval(this.timer)
      this.timer = null
    }

  const novoTempo = this.state.numero;

  AsyncStorage.getItem('tempos').then((tempos) => {
    try {
      
        const temposArray = JSON.parse(tempos) || [];

        if(novoTempo>0){
          const temposComNovo = [novoTempo, ...temposArray];
          
          AsyncStorage.setItem('tempos', JSON.stringify(temposComNovo));

          
          this.setState({ ultimo: novoTempo });
        }
        this.setState({numero: 0.0, button: 'INICIAR'});
        
      } catch (error) {
        console.error('Erro ao analisar ou salvar tempos:', error);
      }
  });
}

  render(){
    return (
      <View style={styles.container}>

        <Image style={styles.img}
        source={require('../../imagens/cronometro.png')}
        />

        <Text style={styles.timer}> {this.state.numero.toFixed(1)} </Text>

        <View style={styles.btnArea}>

          <TouchableOpacity style={styles.btn} onPress={this.iniciar}>
            <Text style={styles.btnText}>{this.state.button}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.zerar}>
            <Text style={styles.btnText}>ZERAR</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.areaTempos}>
            <Text style={styles.textTempos}>
              {this.state.ultimo > 0 ? 'Ultimo Tempo: ' + this.state.ultimo.toFixed(2) + 's' : ''}
            </Text>
          </View>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 400,
    width: 400
  },
  timer: {
    marginTop: -210,
    fontSize: 70,
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 150,
    height: 50,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000000',
    margin: 10,
    height: 60,
    borderRadius: 8
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  areaTempos: {
    marginTop: 40,
  },
  textTempos: {
    fontSize: 20,
    fontStyle: 'italic'
  }
});

export default Home;