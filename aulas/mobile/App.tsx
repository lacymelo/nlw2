import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/Routes/AppStack';

export default function App() {

  //fontes utilizadas no projeto
  let [fontsLoaded] = useFonts({
      Archivo_400Regular,
      Archivo_700Bold,
      Poppins_400Regular,
      Poppins_600SemiBold
  })

  if(!fontsLoaded){
    //carrega a tela de loading enquanto a fontes não forem carregadas
    return <AppLoading />
  }else{
    return (
      <>
        <StatusBar
          style='light'
        />
  
        <AppStack />
      </>
    );
  }
}
