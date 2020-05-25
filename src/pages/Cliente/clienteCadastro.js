import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert
} from 'react-native'
import api from "../../services/api"

export default function Cliente({ }) {
  const [user, setUser] = useState({
    nome: '',
    endereco: '',
    email: ''
  });

  salvarCliente = async () => {
    try {
      if (user.nome === '' || user.endereco === '' || user.email === '') {
        Alert.alert(
          "Atenção!",
          "Preencha todos os campos!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      } else {
        await api.post(`/cliente/insert`, user);
        Alert.alert(
          "Sucesso!",
          "Cliente cadastrado com sucesso!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
        setUser({
          nome: '',
          endereco: '',
          email: ''
        })
      }
    }
    catch (err) {
      console.log(err)
      Alert.alert(
        "Falha!",
        "Não foi possível cadastrar!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyInputs}>
        <Text style={styles.textInputBody}>Nome</Text>
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="Digite o nome"
          type={'name'}
          value={user.nome}
          onChangeText={nome => setUser({ ...user, nome })}
        />
        <Text style={styles.textInputBody}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço"
          type={'street-address'}
          value={user.endereco}
          onChangeText={endereco => setUser({ ...user, endereco })}
        />
        <Text style={styles.textInputBody}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail"
          type={'email'}
          keyboardType={"email-address"}
          value={user.email}
          onChangeText={email => setUser({ ...user, email })}
        />
      </View>
      <View style={styles.bodyButtons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => salvarCliente()}
          underlayColor='#fff'>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#353434',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  bodyInputs: {
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    paddingStart: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5
  },
  textInputBody: {
    marginTop: 20,
    fontWeight: "bold",
    color: '#FFFF'
  },
  bodyButtons: {
    paddingTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    backgroundColor: '#667581',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
});