import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Button, Text } from '@rneui/themed';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../../env';  

const botavatar = require('../assets/flower.jpg');

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: botavatar
};

class Chatbot extends Component {
  state = {
    messages: [
      {_id: 2, text:'Sou a Bot Rosa, no que posso ajudar?', createdAt: new Date().getTime(),  user: BOT_USER},
      {_id: 1, text:'olá', createdAt: new Date().getTime(),  user:BOT_USER},
    ],
    
   id: 1,
  name: 'FAQ Bot',
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg;
    if (text === 'ajuda') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Você está precisando\n de ajuda?',
        image: 'http://nosmulheresdaperiferia.com.br/wp-content/uploads/2020/07/ajuda-violencia-domestica-mulher-1024x402.png',
        createdAt: new Date().getTime(),
        user: BOT_USER
      };
    } else if (text === 'aperte o botão') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Aperte o botão você será direcionada a um especialista',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isOptions: true,
        data: [{
          title: 'Especialistas',
          image: 'https://blog.portalpos.com.br/app/uploads/2022/06/como-se-tornar-um-especialista.jpg',
        }],
      };
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date().getTime(),
        user: BOT_USER
      };
    }

    if (msg) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [msg])
      }));
    }
  }

  onQuickReply(quickReply) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, quickReply)
    }));

    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }
  renderBubble = (props) => {
    if (props.currentMessage.isOptions) {
      return(
        <ScrollView style={{}}>
          {props.currentMessage.data.map((item) => {
            return (
              <Card
              containerStyle ={{
                width: 220,
                padding:0,
                borderRadius: 15,
                paddingBottom: 7,
                overflow: 'hidden',
              }} 
                key={item.title}>
                <Card.Image 
                  style={{}}
                  resizeMode='cover'
                  source={{ uri: item.image }}></Card.Image>
                <Card.Divider/>
                <Text>aperte para ser direcionada a um especialista</Text>
                <Card.Divider/>
                <Button
                style={{ height: 35}}
                  title="ir"
                  onPress={() => this.props.navigation.navigate('Ajuda')}  />
              </Card>
            );
          })}
        </ScrollView>
      )
      
    }
    return <Bubble{...props}/>
  }

  render() {
    console.log(this.state.messages);
    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onQuickReply={quickReply => this.onQuickReply(quickReply)}
          renderBubble={this.renderBubble}
          user={{ _id: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Chatbot;
