import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { defaultStyles } from '@/constants/Styles'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import { TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return;

      await user?.update({
        firstName,
        lastName
      })
    } catch (error) {
      console.error(error)
    } finally {
      setEdit(false);
    }
  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
        {!isSignedIn && (
          <Text style={styles.headerSubtitle}>Log in to start planning your next trip.</Text>
        )}
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={onCaptureImage}
          >
            <Image
              source={{ uri: user?.imageUrl }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={{
            position: 'absolute',
            width: '110%',
            height: 30,
            alignItems: 'flex-end',
            marginTop: 15,
            paddingRight: 5
          }}>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={26} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', gap: 6 }}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity
                  onPress={onSaveUser}
                >
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity
                  onPress={() => setEdit(true)}
                >
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {!isSignedIn && (
        <>
          <Link href={'/(modals)/login'} asChild>
            <TouchableOpacity
              style={styles.btnLogin}
            >
              <Text style={styles.btnLoginText}>Log in</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.viewSignUp}>
            <Text style={{
              color: Colors.dark,
              fontFamily: 'mon',
              letterSpacing: -0.3
            }}>
              Don't have an account?
            </Text>
            <Link href={'/(modals)/login'} asChild>
              <Text style={styles.btnSignUp}>Sign up</Text>
            </Link>
          </View>
        </>
      )}

      <View style={[styles.card, { marginTop: 45, borderRadius: 10, alignItems: 'baseline' }]}>
        <Text style={styles.cardTitle}>Airbnb your place</Text>
        <Text style={styles.cardSubtitle}>It's simple to get set up and</Text>
        <Text style={[styles.cardSubtitle, { marginTop: -13 }]}>start earning.</Text>

        <View>
          <Image
            source={require('@/assets/images/roof_red_house.png')}
            resizeMode='contain'
            style={styles.imageCard} />
        </View>
      </View>

      {isSignedIn && <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />}

      {!isSignedIn && (
        <>
          <View style={{ padding: 24, gap: 20 }}>

            <TouchableOpacity style={styles.containerIcons}>
              <Ionicons name="settings-outline" size={24} color={Colors.dark} />
              <Text style={styles.textIcons}>Settings</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
                style={{ marginHorizontal: 345, position: 'absolute' }} />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                borderBottomColor: '#c2c2c2',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: -10,
              }}
            />

            <TouchableOpacity style={styles.containerIcons}>
              <AntDesign name="addusergroup" size={24} color={Colors.dark} />
              <Text style={styles.textIcons}>Accessibility</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
                style={{ marginHorizontal: 345, position: 'absolute' }} />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                borderBottomColor: '#c2c2c2',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: -10,
              }}
            />

            <TouchableOpacity style={styles.containerIcons}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.dark} />
              <Text style={styles.textIcons}>Get help</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
                style={{ marginHorizontal: 345, position: 'absolute' }} />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                borderBottomColor: '#c2c2c2',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: -10,
                marginBottom: -5,
              }}
            />

            <TouchableOpacity style={styles.containerIcons}>
              <MaterialCommunityIcons name="lock-outline" size={24} color={Colors.dark} />
              <Text style={styles.textIcons}>Third-party tools</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="black"
                style={{ marginHorizontal: 345, position: 'absolute' }} />
            </TouchableOpacity>

          </View>
        </>
      )}




    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 24,
    marginTop: 30,
  },
  headerTitle: {
    fontFamily: 'mon-sb',
    fontSize: 30,
    letterSpacing: -1.5,
  },
  headerSubtitle: {
    fontFamily: 'mon',
    fontSize: 18,
    marginTop: 10,
    color: Colors.grey,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editRow: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: Colors.primary,
    height: 55,
    width: '88%',
    borderRadius: 10,
    marginHorizontal: 24,
  },
  btnLoginText: {
    fontFamily: 'mon-sb',
    fontSize: 18,
    color: '#fff',
  },
  viewSignUp: {
    flexDirection: 'row',
    marginHorizontal: 26,
    marginTop: 25,
    gap: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnSignUp: {
    color: Colors.dark,
    fontFamily: 'mon-sb',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  cardTitle: {
    fontFamily: 'mon-sb',
    fontSize: 18,
  },
  cardSubtitle: {
    color: Colors.grey,
    fontFamily: 'mon',
    letterSpacing: -0.3
  },
  imageCard: {
    position: 'absolute',
    width: 120,
    height: 120,
    marginLeft: 210,
    marginTop: -103,
  },
  containerIcons: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textIcons: {
    fontFamily: 'mon',
    fontSize: 16,
    marginHorizontal: 10,
    letterSpacing: - 0.2
  },
})

export default Page
