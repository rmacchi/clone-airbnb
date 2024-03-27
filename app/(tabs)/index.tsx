import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import { Link, Stack } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/components/ListingsMap'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Page = () => {
  const [category, setCategory] = useState('Tiny homes');
  const items = useMemo(() => listingsData as any, [])
  const geoItems = useMemo(() => listingsDataGeo as any, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 80 }}>
        <Stack.Screen
          options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
          }}
        />
        {/* <Listings listings={items} category={category} /> */}
        <ListingsMap listings={geoItems} />
        <ListingsBottomSheet listings={items} category={category} />
      </View>
    </GestureHandlerRootView>
  )
}

export default Page