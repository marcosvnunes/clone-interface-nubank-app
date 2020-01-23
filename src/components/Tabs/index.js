import React from 'react';

import { Container, TabsContainer, TabItem, TabText } from './styles';


import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Tabs({translateY}) {
  return (
    <Container style={{
        opacity: translateY.interpolate({
            inputRange:[0,250],
            outputRange:[1,0.3],
            extrapolate:'clamp'
        }),
        transform:[{
            translateY:translateY.interpolate({
                inputRange:[0,380],
                outputRange:[0,30],
                extrapolate:'clamp'
            })
        }]
    
    }}>
        <TabsContainer>
            <TabItem>
                <Icon name="person-add" size={24} color="#FFF" />
                <TabText>Indicar Amigo</TabText>
            </TabItem>
            <TabItem>
                <Icon name="chat-bubble-outline" size={24} color="#FFF" />
                <TabText>cobrar</TabText>
            </TabItem>
            <TabItem>
                <Icon name="arrow-downward" size={24} color="#FFF" />
                <TabText>Depositar</TabText>
            </TabItem>
            <TabItem>
                <Icon name="arrow-upward" size={24} color="#FFF" />
                <TabText>Transferir</TabText>
            </TabItem>
            <TabItem>
                <Icon name="lock" size={24} color="#FFF" />
                <TabText>Bloquear cartão</TabText>
            </TabItem>
        </TabsContainer>
    </Container>
  );
}
