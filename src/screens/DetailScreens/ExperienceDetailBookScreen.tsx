import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Platform,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';

// from app
import { 
  COLOR, 
  FONT, 
  Icon_Back_Black,
  Icon_Camera,
  Icon_Category,
  Icon_Guest_Minus,
  Icon_Guest_Plus,
  Icon_Normal_Profile,
  Icon_Search_Black,
  Icon_Share_Black,
  Img_Category,
  MARGIN_TOP,
} from '../../constants';
import { ColorButton } from '../../components/Button';
import { useGlobalState } from '../../redux/Store';
import { IExperience, IFile, IUser } from '../../interfaces/app';
import { ExperienceDetailBookView, SelectDatesView } from '../../components/View';
import GlobalStyle from '../../styles/global';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const ExperienceDetailBookScreen: React.FC = () => {

  const { goBack, navigate } = useNavigation();

  const profile: IUser = useGlobalState('userInfo');

  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showSelectDates, setShowSelectDates] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<number>(0)

  useEffect(() => {
  }, []);

  return (
    <Container style={{...styles.background, backgroundColor: COLOR.whiteColor}}>

      <SafeAreaView style={styles.safe_area}>
        <View style={styles.navigation_bar}>
          <Text style={styles.title}>Select Date & Time</Text>

          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.back_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Back_Black} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => onShare()}>
            <View style={styles.share_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Share_Black} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.tab_bar}>
          <TouchableWithoutFeedback onPress={() => setShowSelectDates(true)}>
            <View style={styles.tab_bar_date_container}>
              <Text style={styles.tab_bar_text}>{getVisibleDate()}</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.tab_bar_count_container}>
            <Text style={styles.tab_bar_text}>{guestCount + ' guest'}</Text>

            <TouchableWithoutFeedback onPress={() => onDecreaseGuestCount()}>
              <View style={styles.increase_count}>
                <SvgXml width='100%' height='100%' xml={Icon_Guest_Minus} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => onIncreaseGuestCount()}>
              <View style={styles.decrease_count}>
                <SvgXml width='100%' height='100%' xml={Icon_Guest_Plus} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={experienceList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ExperienceDetailBookView experience={item} onChooseDate={onChooseDate} />}
        />
      </SafeAreaView>

      <Modal animationType = {"slide"} transparent = {true}
        visible = {showSelectDates}
        onRequestClose = {() => { console.log("Modal has been closed.") } }>
        <SelectDatesView selectedDate={selectedDate} onCloseView={setShowSelectDates} onSelectDate={onSelectDate} />
      </Modal>
    </Container>
  );

  function onShare() {

  }

  function onChooseDate(experience: IExperience, time: string) {
    navigate('ExperienceDetailConfirmPay', {experience: experience, time: time});
  }

  function getVisibleDate() {
    var visibleDateString = 'Select Date';
    if (selectedDate != '') {
      const date = Moment(selectedDate, 'YYYY-MM-DD', true).format();
      visibleDateString = Moment(date).format('MMMM D');
    }
    return visibleDateString;
  }

  function onSelectDate(selectedDate: string) {
    setSelectedDate(selectedDate);
    setShowSelectDates(false);
  }

  function onDecreaseGuestCount() {
    if (guestCount < 1) {
      setGuestCount(0);
    } else {
      setGuestCount(guestCount - 1);
    }
  }

  function onIncreaseGuestCount() {
    setGuestCount(guestCount + 1);
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
    color: COLOR.systemBlackColor,
  },
  back_icon: {
    position: 'absolute',
    marginLeft: 24,
    width: 20,
    height: '100%',
  },
  share_icon: {
    position: 'absolute',
    right: 24,
    width: 20,
    height: '100%',
  },
  tab_bar: {
    marginLeft: 24,
    marginTop: 33,
    height: 40,
    flexDirection: 'row',
  },
  list: {
    marginTop: 5,
    flex: 1,
  },
  tab_bar_date_container: {
    width: 130,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.blackColor,
  },
  tab_bar_text: {
    width: '100%',
    height: 14, 
    lineHeight: 14,
    marginTop: 14,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    textAlign: 'center',
    color: COLOR.systemBlackColor,
  },
  tab_bar_count_container: {
    width: viewportWidth - 190,
    marginLeft: 12,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR.blackColor,
  },
  increase_count: {
    position: 'absolute',
    marginLeft: 3,
    marginTop: 3,
    width: 34,
    height: 34,
  },
  decrease_count: {
    position: 'absolute',
    right: 3,
    marginTop: 3,
    width: 34,
    height: 34,
  },
});
