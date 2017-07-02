// @flow

import React, { Component } from 'react'
import {
  StyleSheet,
  AppRegistry,
  View,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Modal,
  AsyncStorage,
  ScrollView
} from 'react-native'
import ActionButton from 'react-native-action-button'
import { Button, Text, StyleProvider, Container, Header, Content, ListItem, CheckBox, Left, Right, Body, Title, Card } from 'native-base/src'
import getTheme from './native-base-theme/components'
import Icon from 'react-native-vector-icons/FontAwesome'

dbSet('cards', [{name: 'asd', ip: '192.168.1.1', port: '7777'}, {name: 'asd2', ip: '127.0.0.1', port: '1337'}, {name: 'asd2', ip: '127.0.0.1', port: '1337'}, {name: 'asd2', ip: '127.0.0.1', port: '1337'}])

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function dbFetch (key, callback) {
  AsyncStorage.getItem(key, (error, result) => {
    if (error) throw error && console.error(error)
    result = JSON.parse(result)

    // console.log('DBFETCH > ' + result)
    if (callback) callback(result)
    else return result
  })
}

function dbSet (key, value, callback) {
  value = JSON.stringify(value)

  // console.log('DBSET > ' + value)
  AsyncStorage.setItem(key, value, (error) => {
    if (error) throw error && console.error(error)
    if (callback) callback()
  })
}

class MinerCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      version: '',
      uptime: '',
      pools: '',
      totalEthHashrate: '',
      totalEthShares: '',
      totalEthRejectedShares: '',
      totalDualHashrate: '',
      totalDualShares: '',
      totalDualRejectedShares: '',
      totalHashrate: '',
      totalShares: '',
      highestTemp: '',
      highestFanSpeed: ''
    }

    this.loadData = (callback) => {
      fetch(`http://${String('192.168.1.6')}:${String(3333)}`, {
        method: 'GET'
      })
        .then((rawRes) => { return rawRes.json() })
        .then((res) => {
          res = res.result
          let ethData = res[2].split(';')
          let dualData = res[4].split(';')
          let cardData = res[6].split(';')
          let poolData = res[8].split(';')
          let temps = []
          let fanSpeeds = []
          for (let i = 0; i < cardData.length; i++) {
            if (i % 2 !== 0) temps.push(cardData[i])
            else fanSpeeds.push(cardData[i])
          }

          this.setState({
            version: res[0],
            uptime: res[1],
            pools: res[7].split(';'),
            totalEthHashrate: ethData[0],
            totalEthShares: ethData[1],
            totalEthRejectedShares: ethData[2],
            totalEthStaleShares: poolData[0],
            totalDualHashrate: dualData[0],
            totalDualShares: dualData[1],
            totalDualRejectedShares: dualData[2],
            totalDualStaleShares: poolData[2],
            totalHashrate: ethData[0] + dualData[0],
            totalShares: ethData[1] + dualData[1],
            highestTemp: Math.max(...temps),
            highestFanSpeed: Math.max(...fanSpeeds)

          })

          console.log(this.state)
          if (callback) callback()
        })
        .catch((err) => {
          alert(err)
          console.error(err)
        })
    }
  }

  componentWillMount () {
    this.loadData()
  }

  render () {
    return (
      <TouchableNativeFeedback>
        <View style={{elevation: 4, backgroundColor: 'white', margin: 12}}>
          <View style={{marginTop: 24, marginBottom: 24, marginLeft: 16, marginRight: 16}}>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14}}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{fontSize: 24}}>{this.props.name} | </Text>
                <Text style={{fontSize: 24, color: 'green'}}>{this.props.ip}:{this.props.port}</Text>
              </View>
              <Text style={{fontSize: 24, color: 'green'}}>Online</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 14}}>
              {this.state.pools.length === 1
                ? <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.6)'}}>{this.state.pools[0]}</Text>
                : <Text style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.6)'}}>{this.state.pools[0]}; {this.state.pools[1]}</Text> }
            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <View style={{paddingBottom: 8}}>
                  <Text style={{fontSize: 22, color: 'green'}}>{(this.state.totalEthHashrate / 1000).toFixed(1)} MH/s</Text>
                </View>
              </View>

              {this.state.totalDualHashrate !== '0' ? <View>
                <View style={{paddingBottom: 8}}>
                  <Text style={{fontSize: 22, color: 'green'}}>{(this.state.totalDualHashrate / 1000).toFixed(1)} MH/s</Text>
                </View>
              </View> : <View />}

              <View>
                <View style={{paddingBottom: 8}}>
                  <Text style={{fontSize: 22, color: 'red'}}>{this.state.highestTemp}°</Text>
                </View>
              </View>

            </View>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <View style={{paddingBottom: 8}}>
                  <Text>Miner Uptime (Minutes)</Text>
                  <Text style={{color: 'blue'}}>{this.state.uptime}</Text>
                </View>

                <View style={{paddingBottom: 8}}>
                  <Text>ETH Accepted Shares</Text>
                  <Text style={{color: 'green'}}>{this.state.totalEthShares}</Text>
                </View>

                {this.state.totalDualHashrate !== '0' ? <View style={{paddingBottom: 8}}>
                  <Text>Dual Accepted Shares</Text>
                  <Text style={{color: 'green'}}>{this.state.totalEthShares}</Text>
                </View> : <View /> }
              </View>

              <View>
                <View style={{paddingBottom: 8}}>
                  <Text>Highest Fan Speed (%)</Text>
                  <Text style={{color: 'red'}}>{this.state.highestFanSpeed}</Text>
                </View>

                <View style={{paddingBottom: 8}}>
                  <Text>ETH Stale Shares</Text>
                  <Text style={{color: 'red'}}>{this.state.totalEthStaleShares}</Text>
                </View>

                {this.state.totalDualHashrate !== '0' ? <View style={{paddingBottom: 8}}>
                  <Text>Dual Stale Shares</Text>
                  <Text style={{color: 'red'}}>{this.state.totalEthStaleShares}</Text>
                </View> : <View />}
              </View>
            </View>

          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default class AppScreen extends Component {
  constructor () {
    super()

    this.modalInput = {}
    this.state = { modal: { show: false }, minerCards: [] }

    this.navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{backgroundColor: 'black', width: '100%', height: '25%'}} />
        <TouchableNativeFeedback>
          <View style={{width: '100%', height: 64}}>
            <Icon name='home' />
            <Text style={{textAlign: 'center'}}>TESTING</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )

    dbFetch('cards', (cards) => {
      let result = []
      for (let i = 0; i < cards.length; i++) {
        let e = cards[i]
        result.unshift(<MinerCard key={i} name={e.name} ip={e.ip} port={e.port} />)
      }
      this.setState({minerCards: result})
    })
  }

  render () {
    let _openDrawer = () => {
      this.drawer.openDrawer()
    }

    let _showModal = () => {
      this.setState({modal: {show: true}})
    }

    let _hideModal = () => {
      this.setState({modal: {show: false}})
    }

    let _clearModalInputs = () => {
      this.setState({modal: {name: undefined, ip: undefined, port: undefined}})
    }

    let _saveModalInputs = () => {
      if (dbFetch('cards')) dbSet('cards', dbFetch('cards').append(this.modalInput))
      else dbSet('cards', [this.modalInput])
    }

    return (
      <StyleProvider style={getTheme()} >
        <Container>
          <DrawerLayoutAndroid
            ref={_drawer => { this.drawer = _drawer }}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.left}
            renderNavigationView={() => this.navigationView} >

            <ToolbarAndroid
              style={{height: 64, backgroundColor: '#3F51B5'}}
              titleColor='white'
              title='Claymore Utility' >

            </ToolbarAndroid>

            <ScrollView>
              { this.state.minerCards }
            </ScrollView>

            <ActionButton
              buttonColor='#FFAB00'
              onPress={() => {
                _showModal()
              }}
            />

            <Modal animationType={'slide'} visible={this.state.modal.show} onRequestClose={() => { _hideModal() }}>
              <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Text style={{paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 20, fontSize: 24, fontWeight: '500'}}>Add Miner</Text>

                <View style={{paddingLeft: 24, paddingRight: 24, paddingBottom: 40}}>
                  <Text style={{color: '#9E9E9E'}}>Miner Name</Text>
                  <TextInput
                    onChangeText={(value) => { this.modalInput.name = value }}
                    placeholder='New Miner'
                    placeholderTextColor='#c9c9c9' />

                  <Text style={{color: '#9E9E9E'}}>IP Address</Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(value) => { this.modalInput.ip = value }}
                    maxLength={15}
                    placeholder='127.0.0.1'
                    placeholderTextColor='#c9c9c9'
                    keyboardType='numeric' />

                  <Text style={{color: '#9E9E9E'}}>Port</Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(value) => { this.modalInput.port = value }}
                    maxLength={5}
                    placeholder='3333'
                    placeholderTextColor='#c9c9c9'
                    keyboardType='numeric' />
                </View>

                <View style={{flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0}}>
                  <TouchableNativeFeedback onPress={() => {
                    _clearModalInputs()
                    _hideModal()
                  }}>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f44a41', height: 64}}>
                      <Text style={{color: 'white', fontWeight: '500', textShadowColor: 'rgba(0, 0, 0, 80)', textShadowRadius: 5, textShadowOffset: {width: 0.2, height: 0.2}}}>CANCEL</Text>
                    </View>
                  </TouchableNativeFeedback>

                  <TouchableNativeFeedback onPress={() => {
                    _saveModalInputs()
                    _hideModal()
                  }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5de459', height: 64}}>
                      <Text style={{color: 'white', fontWeight: '500', textShadowColor: 'rgba(0, 0, 0, 80)', textShadowRadius: 5, textShadowOffset: {width: 0.2, height: 0.2}}}>ADD</Text>
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

AppRegistry.registerComponent('ClaymoreUtility', () => AppScreen)
