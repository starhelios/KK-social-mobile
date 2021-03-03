import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

// from app
import { 
  COLOR, 
  CustomText, 
  FONT, 
  GetDurationString, 
  Icon_Detail_Right_Arrow_White, 
} from '../../constants';
import { ISpecificExperience, IUser } from '../../interfaces/app';
import { useUsers } from '../../hooks';


interface props {
  specificExperience: ISpecificExperience;
  isCompleted: boolean;
}

export const ConfirmedBookingView: React.FC<props> = (props: props) => {

  const { navigate } = useNavigation();
  const { getUserInformation } = useUsers();

  const specificExperience: ISpecificExperience = props.specificExperience;
  const isCompleted: boolean = props.isCompleted;
  const isShowDate: boolean = (specificExperience.show_date != null && specificExperience.show_date == true) ? true : false

  const [userInfo, setUserInfo] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    if (specificExperience.user_id == undefined) {
      return;
    }
    
    await getUserInformation(specificExperience.user_id)
    .then(async (user: IUser) => {
      setUserInfo(await user);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {} }>
      <View style={styles.container}>
        { isShowDate == true
          && <CustomText style={styles.date}>{specificExperience.day}</CustomText>
        }
        <View style={{...styles.info_container, marginTop: (specificExperience.show_date != null && specificExperience.show_date == true) ? 16 : 22}}>
          <View style={{height: isShowDate == true ? 60 : 40}}>
            <CustomText style={styles.name}>{specificExperience.startTime + ' w/ ' + (userInfo == null ? '' : userInfo?.fullname) }</CustomText>
            <CustomText style={styles.experience}>{specificExperience.experience.title + ' • ' + GetDurationString(specificExperience.experience.duration)}</CustomText>
          </View>
          
          <View style={styles.arrow}>
              <SvgXml width='100%' height='100%' xml={Icon_Detail_Right_Arrow_White} />
          </View>
        </View>

        <View style={styles.info_line} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginRight: 24,
  },
  date: {
    marginTop: 33,
    height: 18,
    marginLeft: 1,
    lineHeight: 18,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    color: COLOR.alphaWhiteColor75,
  },
  info_container: {
    marginLeft: 1,
    marginRight: 1,
    marginTop: 22,
    height: 40,
    flexDirection: 'row',
  },
  name: {
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 16,
    color: COLOR.systemWhiteColor,
  },
  experience: {
    marginTop: 8,
    height: 16,
    lineHeight: 16,
    fontFamily: FONT.AN_Regular,
    fontSize: 14,
    color: COLOR.alphaWhiteColor50,
  },
  arrow: {
    position: 'absolute',
    width: 5,
    height: 10,
    right: 0,
    top: 15,
  },
  info_line: {
    marginTop: 22,
    width: '100%',
    height: 1,
    borderRadius: 0.5,
    backgroundColor: COLOR.alphaWhiteColor20,
  },
});