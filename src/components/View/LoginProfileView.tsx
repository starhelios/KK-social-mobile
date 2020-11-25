import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import PageControl from 'react-native-page-control';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Detail_Right_Arrow, 
  Icon_Normal_Profile, 
  Img_Avatar_2, 
  MARGIN_TOP, 
} from '../../constants';
import { TitleArrowButton } from '../Button';
import { IProfileHelp, IUser } from '../../interfaces/app';
import { useProfileHelps } from '../../hooks';
import { SvgXml } from 'react-native-svg';

interface props {
  profile: IUser;
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const LoginProfileView: React.FC<props> = (props: props) => {

  const { navigate } = useNavigation();
  const { profileHelps } = useProfileHelps();

  const [profileHelpList, setProfileHelpList] = useState<IProfileHelp[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const profile: IUser = props.profile;

  useEffect(() => {
    loadProfileList();
  }, []);

  async function loadProfileList() {
    await profileHelps()
    .then(async (result: Promise<IProfileHelp[]>) => {
      setProfileHelpList(await result);
    });
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={styles.profile_container}>
          <View style={styles.avatar}>
            {
              profile.image != ''
              ? <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={{uri: profile.image}} />
              : <View style={styles.profile_icon}>
                  <View style={{width: 20, height: 25}}>
                    <SvgXml width='100%' height='100%' xml={Icon_Normal_Profile} />
                  </View>
                </View>
            }
          </View>

          <TouchableWithoutFeedback onPress={() => navigate('BecomeAHost')}>
            <View style={styles.profile_info}>
              <Text style={styles.user_name}>{'Hello, ' + profile.username}</Text>

              <View style={styles.view_profile_container}>
                <Text style={styles.view_profile_title}>View Profile</Text>
                <View style={styles.view_profile_arrow}>
                  <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.content_container}>
          <Text style={{...styles.content_title, marginTop: 33}}>Account Settings</Text>
          <TouchableWithoutFeedback onPress={() => navigate('EditProfile')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Edit Profile'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigate('PaymentOptions')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Payment Methods'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>

          <Text style={{...styles.content_title, marginTop: 44}}>Hosting</Text>
          <TouchableWithoutFeedback onPress={() => navigate('Experiences') }>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Host An Experience'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigate('PaymentOptions')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Confirmed Bookings'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigate('Withdrawal')}>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Withdrawal Options'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>

          <Text style={{...styles.content_title, marginTop: 44}}>Legal</Text>
          <TouchableWithoutFeedback onPress={() => onTermsOfService() }>
            <View style={{width:'100%', marginTop: 22}}>
              <TitleArrowButton title={''} name={'Terms of Service'} showArrow={true} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
  
  function onTermsOfService() {
    console.log('Terms of Service');
  }
}

const styles = StyleSheet.create({
  profile_container: {
    marginTop: MARGIN_TOP,
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
    height: 66,
    flexDirection: 'row',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_icon: {
    width: '100%',
    height: '100%',
    borderRadius: 33,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profile_info: {
    marginTop: 8,
    marginLeft: 16,
  },
  user_name: {
    height: 24, 
    lineHeight: 24,
    fontFamily: FONT.AN_Bold, 
    fontSize: 24, 
    color: COLOR.systemWhiteColor,
  },
  view_profile_container: {
    marginTop: 12,
    height: 14,
    flexDirection: 'row',
  },
  view_profile_title: {
    height: 14, 
    lineHeight: 14,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    color: COLOR.alphaWhiteColor50,
  },
  view_profile_arrow: {
    marginTop: 3,
    marginLeft: 7,
    width: 4,
    height: 8, 
    lineHeight: 14,
  },
  content_container: {
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
  },
  content_title: {
    height: 12, 
    lineHeight: 12,
    fontFamily: FONT.AN_Regular, 
    fontSize: 12, 
    color: COLOR.alphaWhiteColor75,
  },
});
