import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';  
import { Feather as Icon } from '@expo/vector-icons'; 
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse{
  sigla: string,
  nome: string
}

interface IBGECityResponse{
  nome: string
}

interface PickerItem{
  label: string,
  value: string
}

const Home = () =>{
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<PickerItem[]>([]);
  const [cities, setCities] = useState<PickerItem[]>([]);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
    

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(response => {
          const ufInitials = response.data.map(uf => ({
            label: uf.sigla,
            value: uf.sigla,
          }));
          setUfs(ufInitials);
        });
    }, []);
  
    useEffect(() => {
      if (selectedUf === null) return;
  
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
          const cityNames = response.data.map(city => ({
            label: city.nome,
            value: city.nome,
          }));
          setCities(cityNames);
        });
    }, [selectedUf]);

    function handleNavigatePoints(){
      navigation.navigate('Points', {
        state: selectedUf,
        city: selectedCity,
      });
    }
    
    return (
        <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={ { width: 274, height: 368 } }>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')}/>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
            </View>

            <View style={styles.footer}>       
              <RNPickerSelect
              style={styles.pickerSelectStyles }
              onValueChange={(value) => setSelectedUf(value)}
              placeholder={{ label: "Selecione um estado", value: null }}
              items={ufs}
              Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
              />

            <RNPickerSelect
              style={styles.pickerSelectStyles}
              onValueChange={(value) => setSelectedCity(value)}
              placeholder={{ label: "Selecione uma cidade", value: null }}
              items={cities}
              disabled={cities.length === 0}
              Icon={() => <Icon name="chevron-down" size={20} color="#A0A0B2" />}
            />

              <RectButton style={styles.button} onPress={handleNavigatePoints}>
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
              </RectButton>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },

    pickerSelectStyles:{

    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });


export default Home;