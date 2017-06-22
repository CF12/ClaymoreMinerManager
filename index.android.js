import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Modal
} from 'react-native'
import ActionButton from 'react-native-action-button'
// import Modal from 'react-native-modal'
import { MKButton, MKColor } from 'react-native-material-kit'

import { Button, Text, StyleProvider, Container, Header, Content, ListItem, CheckBox, Left, Right, Body, Title, Icon, } from 'native-base/src'
import getTheme from './native-base-theme/components'

function getMinerStats() {
  fetch(`http://192.168.1.6:3333`, {
    method: 'GET'
  })
  .then((res) => { return res.json() }).then((res) => {
    console.log(JSON.stringify(res))
    alert(res)
  })
  .catch((err) => {
    alert(err)
    console.error(err)
  })
}

class FlatButton extends Component {
  constructor (props) {
    super(props)

    console.log(this.props)
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: this.props.buttonColor, width: 200, height: 64}} onPress={this.props.onPress}>
        <Text> {this.props.text}asdhsdakjh </Text>
      </View>
    )
  }
}

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      showModal: false
    }

    this.navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{backgroundColor: 'black', width: '100%', height: '25%'}} />
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={{width: '100%', height: '10%'}}>
            <Text style={{textAlign: 'center'}}>TESTING</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    let openDrawer = () => {
      this.drawer.openDrawer()
    }

    let showModal = () => {
      this.setState({showModal: true})
    }

    let hideModal = () => {
      this.setState({showModal: false})
    }

    return (
      <StyleProvider style={getTheme()} >
        <Container>
          <DrawerLayoutAndroid
            ref={_drawer => { this.drawer = _drawer }}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.left}
            renderNavigationView={() => this.navigationView}>

            <Header>
              <Left>
                <Button transparent onPress={() => { openDrawer() }}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title> Claymore Utility </Title>
              </Body>
              <Right />
            </Header>

            <ActionButton
              buttonColor='#FFAB00'
              onPress={() => {
                showModal()
              }}
            />

            <Modal animationType={'slide'} visible={this.state.showModal} onRequestClose={() => { hideModal() }}>
              <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Text style={{paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 20, fontSize: 24, fontWeight: '500'}}>Add Miner</Text>

                <View style={{paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                  <Text style={{color: '#9E9E9E'}}> Miner Name </Text>
                  <TextInput autoCorrect={false} />
                  <Text style={{color: '#9E9E9E'}}> IP Address </Text>
                  <TextInput autoCorrect={false} />
                  <Text style={{color: '#9E9E9E'}}> Port </Text>
                  <TextInput autoCorrect={false} />
                </View>

                <View style={{flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0}}>
                  <TouchableNativeFeedback onPress={() => { hideModal() }}>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f44a41', height: 64}}>
                      <Text style={{color: 'white', fontWeight: '500', textShadowColor: 'rgba(0, 0, 0, 80)', textShadowRadius: 5, textShadowOffset: {width: 0.2, height: 0.2}}}> CANCEL </Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5de459', height: 64}}>
                      <Text style={{color: 'white', fontWeight: '500', textShadowColor: 'rgba(0, 0, 0, 80)', textShadowRadius: 5, textShadowOffset: {width: 0.2, height: 0.2}}}> ADD </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>

              </View>
            </Modal>

          </DrawerLayoutAndroid>
        </Container>
      </StyleProvider>
    )
  }
}

AppRegistry.registerComponent('ClaymoreUtility', () => App)
