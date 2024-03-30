import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'

const Page = () => {
  const [text, setText] = useState(false);

  const toggleText = () => {
    setText(!text);
  }

  return (
    <SafeAreaView
      style={defaultStyles.container}
    >
      <View
        style={styles.headerContainer}
      >
        <TouchableOpacity
          onPress={toggleText}
        >
          <Text
            style={{
              marginLeft: 320,
              textDecorationLine: 'underline',
              fontFamily: 'mon-sb',
              fontSize: 16,
            }}
          >
            {text ? 'Done' : 'Edit'}
          </Text>

        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
        >
          Wishlists
        </Text>

      </View>

      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 47,
          gap: 5
        }}
      >
        <Text
          style={{
            fontFamily: 'mon-sb',
            fontSize: 19,
            letterSpacing: -0.3,
          }}
        >
          Log in to view your wishlists
        </Text>

        <Text
          style={{
            fontFamily: 'mon',
            fontSize: 15,
            letterSpacing: -0.2,
            lineHeight: 22,
          }}
        >
          You can create, view, or edit wishlists once you've logged in.
        </Text>
      </View>

      <View style={{
        marginHorizontal: 55,
        marginVertical: 60,
        paddingRight: 195,
      }}>
        <Link href={'/(modals)/login'} asChild>
          <TouchableOpacity
            style={styles.btn}
          >
            <Text
              style={[
                defaultStyles.btnText,
                { fontFamily: 'mon-sb' }
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
    marginTop: 14,
    marginBottom: 25,
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