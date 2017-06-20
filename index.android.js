import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Button,
  ToolbarAndroid,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { MaterialDialog } from 'react-native-material-dialog'
import ActionButton from 'react-native-action-button'
import DialogAndroid from 'react-native-dialogs'
import Icon from 'react-native-vector-icons/FontAwesome'

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

export default class App extends Component {
  constructor () {
    super()

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

    this.addMinerDialog = new DialogAndroid()
    this.addMinerDialog.set({
      title: 'Add Miner',
      content: 'Blah Blah Blah',
      positiveText: 'ADD'
    })
  }

  render () {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => this.navigationView}>

        <View style={{flex: 1}}>
          <ToolbarAndroid
            style={{height: 64, backgroundColor: '#1976D2'}}
            title='Claymore Miner Manager'
            titleColor='white'
          />
          <ActionButton
            buttonColor='#FFAB00'
            onPress={() => { this.addMinerDialog.show() }}
          />
        </View>
      </DrawerLayoutAndroid>
    )
  }
}

AppRegistry.registerComponent('ClaymoreUtility', () => App)
