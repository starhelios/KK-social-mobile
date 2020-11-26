import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back,
  Img_Experience_2,
  MARGIN_TOP,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { IBooking } from '../../interfaces/app';
import { ConfirmedBookingHostInfoView, ConfirmedBookingMainInfoView, ConfirmedBookingRatingInfoView } from '../../components/View';
import GlobalStyle from '../../styles/global';

const { width: viewportWidth } = Dimensions.get('window');

export const ConfirmedBookingDetailScreen: React.FC = ({route}) => {

  const { navigate, goBack } = useNavigation();

  const booking: IBooking = route.params.booking;
  const isCompleted: boolean = route.params.isCompleted;

  useEffect(() => {
  }, [])

  return (
    <Container style={styles.background}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>{isCompleted == true ? 'Completed' : 'Upcoming'}</Text>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={(booking.image == null || booking.image == '') ? Img_Experience_2 : {uri: booking.image}}
            />
            {
              isCompleted == true
              ? <View style={{...styles.content_container, height: 209}}>
                  <ConfirmedBookingMainInfoView booking={booking} isCompleted={isCompleted} />
                  <ConfirmedBookingRatingInfoView booking={booking} isCompleted={isCompleted} />
                </View>
              : (
                booking.is_joined == true
                ? <View style={{...styles.content_container, height: 209}}>
                    <ConfirmedBookingMainInfoView booking={booking} isCompleted={isCompleted} />
                    <ConfirmedBookingHostInfoView booking={booking} isCompleted={isCompleted} />
                  </View>
                : <View style={{...styles.content_container, height: 300}}>
                    <ConfirmedBookingMainInfoView booking={booking} isCompleted={isCompleted} />
                    <ConfirmedBookingHostInfoView booking={booking} isCompleted={isCompleted} />

                    <View style={styles.join_container}>
                      <TouchableWithoutFeedback onPress={() => onJoinExperience()}>
                        <View style={styles.join_button_container}>
                          <ColorButton title={'Join Experience'} backgroundColor={COLOR.redColor} color={COLOR.systemWhiteColor} />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
              )
            }
          </View>

          <View style={styles.bottom_container}>
            <Text style={styles.bottom_content_title}>{booking.host?.username + ' Paid'}</Text>
            <Text style={styles.bottom_content_info}>{'$ ' + booking.paid}</Text>
            <View style={{...GlobalStyle.auth_line, marginTop: 22}} />
            <Text style={styles.bottom_content_title}>You Received</Text>
            <Text style={styles.bottom_content_info}>{'$ ' + booking.receive}</Text>
          </View>

        </View>
      </SafeAreaView>
    </Container>
  );

  function onJoinExperience() {
  }
};

const styles = StyleSheet.create({
  background: {
    width: '100%', 
    flex: 1, 
    backgroundColor: COLOR.blackColor, 
    alignItems: 'center',
  },
  safe_area: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  navigation_bar: {
    marginTop: MARGIN_TOP,
    width: '100%',
    height: 33,
    flexDirection: 'row',
  },
  title: {
    width: '100%',
    height: 33, 
    lineHeight: 33,
    fontFamily: FONT.AN_Bold, 
    fontSize: 24, 
    textAlign: 'center',
    color: COLOR.systemWhiteColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  image_container: {
    marginLeft: 24,
    width: viewportWidth - 48,
    marginTop: 33,
    marginBottom: 200,
    flexDirection: 'column',
    borderRadius: 22,
  },
  image: { 
    width: '100%', 
    height: '100%',
    borderRadius: 22,
  },
  content_container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOR.alphaBlackColor20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  join_container: {
    width: '100%',
    position: 'absolute',
    height: 91,
    bottom: 0,
    backgroundColor: COLOR.whiteColor,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  join_button_container: {
    marginLeft: 24,
    marginTop: 24,
    marginRight: 24,
    height: 44,
  },
  bottom_container: {
    position: 'absolute',
    marginLeft: 24,
    marginRight: 24,
    width: viewportWidth - 48,
    bottom: 33,
  },
  bottom_content_title: {
    marginTop: 22,
    marginLeft: 24,
    height: 18, 
    lineHeight: 18,
    fontFamily: FONT.AN_Regular, 
    fontSize: 12, 
    color: COLOR.alphaWhiteColor75,
  },
  bottom_content_info: {
    marginTop: 16,
    marginLeft: 24,
    height: 16, 
    lineHeight: 16,
    fontFamily: FONT.AN_Regular, 
    fontSize: 16, 
    color: COLOR.systemWhiteColor,
  },
});
