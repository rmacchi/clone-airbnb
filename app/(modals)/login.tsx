import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth()
      console.log("createdSessionId: ", createdSessionId)

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        router.back()
      }
    } catch (err) {
      console.log("OAuth error: ", err)
    }
  }

  return (
    <>
      <View
        style={{
          borderBottomColor: "#ABABAB",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          placeholder="Brazil (+55)"
          placeholderTextColor={Colors.dark}
          style={[defaultStyles.inputField2, {
            marginTop: 5,
            marginBottom: -2,
            fontSize: 16,
            letterSpacing: 0.1
          }]}
        />

        <View style={{
          position: 'absolute',
          marginLeft: 350,
          marginTop: 42,
          flex: 1,
          width: '10%'
        }}>
          <MaterialCommunityIcons name="chevron-down" size={30} />
        </View>

        <TextInput
          autoCapitalize="none"
          placeholder="Phone number"
          placeholderTextColor="#ABABAB"
          style={[defaultStyles.inputField3, {
            marginBottom: 30,
            fontFamily: 'mon-sb',
            fontSize: 14,
            letterSpacing: -0.3
          }]}
        />

        <Text style={{
          fontFamily: 'mon',
          fontSize: 12,
          letterSpacing: -0.2,
          marginBottom: 30,
          marginTop: -15
        }}>
          We'll call or text to confirm your number. Standard message and data rates apply.
        </Text>

        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.seperatorView}>
          <View
            style={{
              flex: 1,
              borderBottomColor: '#000',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={styles.seperator}>or</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: '#000',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <View style={{ gap: 20 }}>
          <TouchableOpacity style={styles.btnOutline}>
            <MaterialCommunityIcons name="email-outline" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
            <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
            <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
            <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
})

export default Page;