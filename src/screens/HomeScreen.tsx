import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AvatarCart from '../components/AvatarCard';
import ButtonCustom from '../components/ButtonCustom';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchInput />

      <View style={styles.filterWrap}>
        <ScrollView horizontal>
          <ButtonCustom customStyle={{ marginRight: 8 }} text="Dates" />
          <View style={styles.borderHorizontal} />
          <ButtonCustom customStyle={{ marginHorizontal: 8 }} text="Music" />
          <ButtonCustom customStyle={{ marginHorizontal: 8 }} text="Cooking" />
          <ButtonCustom customStyle={{ marginHorizontal: 8 }} text="Sport" />
        </ScrollView>
      </View>

      <ScrollView>
        <Text style={styles.title}>Popular Experiences</Text>
        <View style={styles.experiencesWrap}>
          <ScrollView horizontal>
            <Card
              urlMainImage={require('../assets/images/card1.png')}
              urlIcon={require('../assets/images/chef_259874.png')}
            />
            <Card
              urlMainImage={require('../assets/images/card2.png')}
              urlIcon={require('../assets/images/music.png')}
            />
            <Card
              urlMainImage={require('../assets/images/card1.png')}
              urlIcon={require('../assets/images/chef_259874.png')}
            />
            <Card
              urlMainImage={require('../assets/images/card2.png')}
              urlIcon={require('../assets/images/music.png')}
            />
          </ScrollView>
        </View>

        <Text style={styles.title}>Popular Hosts</Text>
        <View style={styles.hostsWrap}>
          <ScrollView horizontal>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Cooking"
                  urlIcon={require('../assets/images/music.png')}
                />
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Music"
                  urlIcon={require('../assets/images/music.png')}
                />
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Music"
                  urlIcon={require('../assets/images/music.png')}
                />
              </View>

              <View style={styles.secondHost}>
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Cooking"
                  urlIcon={require('../assets/images/music.png')}
                />
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Music"
                  urlIcon={require('../assets/images/music.png')}
                />
                <AvatarCart
                  url={require('../assets/images/avatar.png')}
                  name="Lindsay Wyatt"
                  job="Music"
                  urlIcon={require('../assets/images/music.png')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A29',
  },
  title: {
    textAlign: 'left',
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    paddingTop: 32,
    paddingBottom: 24,
    marginLeft: 24,
  },
  hostsWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 24,
    marginBottom: 50,
  },
  secondHost: { flexDirection: 'row', marginVertical: 20 },
  experiencesWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 24,
    marginBottom: 30,
  },
  filterWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  borderHorizontal: {
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
