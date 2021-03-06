import * as React from 'react';
import { 
  Alert,
  Image, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  View, 
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// from app
import { 
  COLOR, 
  CustomText, 
  ERROR_MESSAGE, 
  FONT, 
  Icon_Category, 
  Img_User_Avatar, 
} from '../../constants';
import { IUser, IHostDetail, IExperience } from '../../interfaces/app';
import { useExperiences, useHosts } from '../../hooks';


interface props {
  host: IUser;
  onFetchingData: (fetching: boolean) => void;
}

export const HostView: React.FC<props> = (props: props) => {

  const { navigate } = useNavigation();
  const { getHostDetail } = useHosts();
  const { getExperienceListByUserId } = useExperiences();
  const host: IUser = props.host;

  return (
    <TouchableWithoutFeedback onPress={() => goHostDetailScreen()}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={(host.avatarUrl == null || host.avatarUrl == '') ? Img_User_Avatar : {uri: host.avatarUrl}}
        />
        <CustomText style={styles.title}>{host.fullname}</CustomText>
        <View style={styles.experienceContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* {
              host.categoryIcon != null && host.categoryIcon != ''
              ? <Image style={{width: '100%', height: '100%'}} source={{uri: host.categoryIcon}} />
              : <SvgXml height={12} xml={Icon_Category} />
            } */}
            <CustomText style={styles.experience}>{host.categoryName}</CustomText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  async function goHostDetailScreen() {
    props.onFetchingData(true);
    await getHostDetail(host.randomString)
    .then(async (hostDetail: Promise<IHostDetail>) => {
      getExperienceList(await hostDetail);
    }).catch(() => {
      props.onFetchingData(false);
      Alert.alert('', ERROR_MESSAGE.GET_HOST_DETAIL_FAIL);
    });
  }

  async function getExperienceList(hostDetail: IHostDetail) {
    await getExperienceListByUserId(hostDetail.user.randomString)
    .then(async (result: Promise<IExperience[]>) => {
      props.onFetchingData(false);
      navigate('HostDetail', {hostDetail: hostDetail, experienceList: result});
    }).catch(() => {
      props.onFetchingData(false);
      navigate('HostDetail', {hostDetail: hostDetail, experienceList: []});
    });
  }
}

const styles = StyleSheet.create({
  container: {
    width: 154,
    height: 211,
    marginRight: 16,
    flexDirection: 'column',
  },
  image: { 
    width: '100%', 
    height: 154, 
    borderRadius: 77,
    resizeMode: 'cover',
  },
  title: {
    width: '100%',
    height: 17,
    lineHeight: 17,
    marginTop: 12,
    color: COLOR.systemWhiteColor,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
    textAlign: 'center',
  },
  experienceContainer: {
    marginTop: 6,
    height: 12,
    flex: 1,
    alignItems: 'center',
  },
  experience: {
    height: 12,
    lineHeight: 12,
    // marginLeft: 5,
    color: COLOR.alphaWhiteColor75,
    fontFamily: FONT.AN_Regular,
    fontSize: 12,
  },
});
