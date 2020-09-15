import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const HomeScreen = (props) => {
  const { navigation } = props
  const [username, setUsername] = useState('Hello')
  const saveCallBack = (val) => setUsername(val)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Username: {username}</Text>
      <Button
        title="Change Username"
        onPress={() =>
          navigation.navigate('Profile', {
            username,
            saveCallBack
          })
        }
      />
    </View>
  )
}

const ProfileScreen = ({ route, navigation }) => {
  const { username, saveCallBack } = route.params
  const [name, setName] = useState(username)
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }}>
      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10
        }}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Button
        title="Save"
        onPress={() => {
          saveCallBack(name)
          navigation.navigate('Home')
        }}
      />
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
})
