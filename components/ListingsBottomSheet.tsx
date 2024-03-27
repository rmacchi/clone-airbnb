import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Listings from '@/components/Listings';
import BottomSheet from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: any[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const showMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      enablePanDownToClose={false}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: '#c2c2c2', width: 40 }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings
          listings={listings}
          category={category}
          refresh={refresh}
        />
      </View>

      <View style={styles.absoluteBtn}>
        <TouchableOpacity
          onPress={showMap}
          style={styles.btn}
        >
          <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
          <Ionicons name="map" size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
}


const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 30,
    width: 95,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    }
  },
})

export default ListingsBottomSheet