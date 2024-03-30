import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'

const Page = () => {
  return (
    <SafeAreaView
      style={defaultStyles.container}
    >
      <View
        style={styles.headerContainer}
      >
        <Text
          style={styles.headerTitle}
        >Inbox</Text>
      </View>

      <View
        style={{
          padding: 24,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontFamily: 'mon-sb',
            fontSize: 20,
            letterSpacing: -0.3
          }}
        >
          Log in to see messages
        </Text>

        <Text
          style={{
            fontFamily: 'mon',
            fontSize: 15,
            lineHeight: 22,
            marginRight: 15,
            letterSpacing: -0.3
          }}
        >
          Once you login, you'll find messages from hosts here.
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 25,
          marginVertical: 25,
          paddingRight: 250,
        }}
      >
        <Link href={'/(modals)/login'} asChild>
          <TouchableOpacity
            style={styles.btn}
          >
            <Text
              style={[
                defaultStyles.btnText,
                { fontFamily: 'mon-sb' },
              ]}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'baseline',
    padding: 24,
  },
  headerTitle: {
    fontFamily: 'mon-sb',
    fontSize: 30,
    letterSpacing: -1.5,
    marginTop: 30,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Page