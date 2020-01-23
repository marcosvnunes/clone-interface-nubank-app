import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { StatusBar , Animated } from 'react-native'
import { PanGestureHandler ,State } from 'react-native-gesture-handler'
import { Container , Content ,Card,CardHeader, CardContent, Title, Description, CardFooter,Annotation } from './styles';

import Header from '~/components/Header'
import Tabs from '~/components/Tabs'
import Menu from '~/components/Menu'

export default function Main(){
  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent:{
          translationY:translateY,
        }
      }
    ],{ useNativeDriver:true }, 
  )
  let opened = false;

  function onHandlerStateChange(event){
    if(event.nativeEvent.oldState === State.ACTIVE){
      const { translationY} = event.nativeEvent;
      offset += translationY;
      opened = false;

      if( translationY >= 100){
        opened = true;
      }else{
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      
      Animated.timing(translateY,{
        toValue:opened ? 380 : 0,
        duration:200,
        useNativeDriver:true,
      }).start(()=>{
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      })

    }
  }

  

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#8B10AE' />
      <Container >
        <Header />
        <Content>
          <Menu translateY={translateY}/>
          <PanGestureHandler 
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Card style={{
              transform:[{
                translateY: translateY.interpolate({
                  inputRange:[-300, 0, 380],
                  outputRange:[-50, 0, 380],
                  extrapolate:'clamp'
                }) ,
              }]
            }}>
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666"/>
                <Icon name="visibility-off" size={28} color="#666"/>
              </CardHeader> 
              <CardContent>
                <Title>Saldo Disponivel</Title>
                <Description>R$ 197.611,65</Description>
              </CardContent>
              <CardFooter>
                <Annotation>
                  Transferência de R$ 20,00 recebida de Diego Shell Fernandes hoje às 14:00h
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
      </Container>
    </>
  )
}
 