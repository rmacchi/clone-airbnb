import React, { useEffect } from 'react'
import { Text, View } from "react-native"

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings, category }: Props) => {
  useEffect(() => {
    console.log('RELOAD LISTINGS', listings.length)
  }, [category])


  return (
    <View>
      <Text>Listings</Text>
    </View>
  )
}

export default Listings;