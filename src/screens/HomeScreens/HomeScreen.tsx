import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// from app
import { COLOR, FONT, Icon_Filter, Icon_Search, MARGIN_TOP } from '../../constants';
import { useExperienceCategories, useExperiences, useHosts } from '../../hooks';
import { IExperience, IExperienceCategory, IHost } from '../../interfaces/app';
import { ExperienceView, HostView } from '../../components/View';

const { width: viewportWidth } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  
  const { navigate, goBack } = useNavigation();
  const { experienceCategories } = useExperienceCategories();
  const { experiences } = useExperiences();
  const { hosts } = useHosts();

  const [searchText, setSearchText] = useState<string>('');
  const [experienceCategoryList, setExperienceCategoryList] = useState<IExperienceCategory[]>([]);
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [hostList, setHostList] = useState<IHost[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedExperienceCategoryID, setSelectedExperienceCategoryID] = useState<number>(-1);

  var fetching = false;
  var isSearchResult = false;

  useEffect(() => {
    loadExperienceCategoryList();
    loadExperienceList();
    loadHostList();
  }, [])

  async function loadExperienceCategoryList() {
    await experienceCategories()
    .then(async (result: Promise<IExperienceCategory[]>) => {
      setExperienceCategoryList(await result);
    }).catch(() => {
    });
  }

  async function loadExperienceList() {
    await experiences()
    .then(async (result: Promise<IExperience[]>) => {
      setExperienceList(await result);
    }).catch(() => {
    });
  }

  async function loadHostList() {
    await hosts()
    .then(async (result: Promise<IHost[]>) => {
      setHostList(await result);
    }).catch(() => {
    });
  }

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.search_bar}>
          <TouchableWithoutFeedback onPress={() => onSearch()}>
            <View style={styles.search_button_container}>
              <View style={styles.search_icon}>
                <SvgXml width='100%' height='100%' xml={Icon_Search} />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.search_text_container}>
            { 
              searchText == ''
              ? <View style={styles.search_text_placeholder}>
                <Text style={styles.placeholder_search}>Search</Text>
                <Text style={styles.placeholder_kloutkast}>KloutKast</Text>
              </View>
              : null
            }
            <TextInput 
              style={styles.search_text}
              onChangeText={text => setSearchText(text)}
              value={searchText} />
          </View>

          <TouchableWithoutFeedback onPress={() => onSearch()}>
            <View style={styles.filter_container}>
              <SvgXml width={14} height={14} xml={Icon_Filter} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={{width: '100%', marginTop: 16}}>
          <View style={styles.experience_category_list}>
            <TouchableWithoutFeedback onPress={() => onSelectDateFilter()}>
              {
                selectedExperienceCategoryID == 0
                ? <View style={{...experienceCategoryStyles.container, backgroundColor: COLOR.selectedExperienceCategoryBackgroudnColor}}>
                    <Text style={experienceCategoryStyles.title}>
                      { selectedDate == '' ? 'Dates' : selectedDate }
                    </Text>
                  </View>
              : <View style={{...experienceCategoryStyles.container, backgroundColor: COLOR.clearColor}}>
                  <Text style={experienceCategoryStyles.title}>
                    { selectedDate == '' ? 'Dates' : selectedDate }
                  </Text>
                </View>
              }
            </TouchableWithoutFeedback>

            <View style={{width: 1, height: '100%', backgroundColor: COLOR.whiteBorderColor}} />

            <FlatList
              style={{width: '100%', height: 40, marginLeft: 12}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={experienceCategoryList}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderExperienceCategoryView(item.id, item.title)}
            />

          </View>

          <Text style={styles.list_title}>
            {
              isSearchResult == false 
              ? 'Popular Experiences' 
              : experienceList.length + ' Experiences'
            }
          </Text>
          <FlatList
            style={{width: '100%', height: 284, marginTop: 22 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={experienceList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ExperienceView experience={item} />}
          />

          <Text style={styles.list_title}>
            {
              isSearchResult == false 
              ? 'Popular Hosts' 
              : hostList.length + ' Hosts'
            }
          </Text>
          <FlatList
            style={{width: '100%', height: 211, marginTop: 22, marginBottom: 20 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={hostList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <HostView host={item} />}
          />

        </ScrollView>
      </SafeAreaView>
    </View>
  );

  function onSearch() {
    console.log('search home');
  }

  function onSelectDateFilter() {
    setSelectedExperienceCategoryID(0);
    console.log('select date filter');
  }

  function onSelectExperneiceCategory(id: number, title: string) {
    setSelectedExperienceCategoryID(id);
    console.log('select experience filter');
  }

  function renderExperienceCategoryView(id: number, title: string) {
    return (
      <TouchableWithoutFeedback onPress={() => onSelectExperneiceCategory(id, title)}>
        {
          selectedExperienceCategoryID == id
          ? <View style={{...experienceCategoryStyles.container, backgroundColor: COLOR.selectedExperienceCategoryBackgroudnColor}}>
              <Text style={experienceCategoryStyles.title}>{ title }</Text>
            </View>
        : <View style={{...experienceCategoryStyles.container, backgroundColor: COLOR.clearColor}}>
            <Text style={experienceCategoryStyles.title}>{ title }</Text>
          </View>
        }
      </TouchableWithoutFeedback>
    );
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
    width: '100%',
    flex: 1,
  },
  search_bar: {
    marginTop: MARGIN_TOP, 
    marginLeft: 24, 
    marginRight: 24, 
    backgroundColor: COLOR.systemWhiteColor, 
    height: 44, 
    borderRadius: 22, 
    flexDirection: 'row',
  },
  search_button_container: {
    width: 40, 
    height: '100%', 
    flexDirection: 'row', 
    flex: 1, 
    alignItems: 'center',
  },
  search_icon: {
    marginLeft: 24, 
    width: 14, 
    height: 14,
  },
  search_text_container: {
    position: 'absolute', 
    left: 40, 
    right: 66, 
    height: '100%',
  },
  search_text_placeholder: {
    height: '100%', 
    flex: 1, 
    flexDirection: 'row',
  },
  placeholder_search: {
    marginLeft: 10, 
    height: 44, 
    lineHeight: 44, 
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    color: COLOR.systemBlackColor,
  },
  placeholder_kloutkast: {
    marginLeft: 5, 
    height: 44, 
    lineHeight: 44, 
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
    color: COLOR.systemRedColor,
  },
  search_text: {
    position: 'absolute', 
    width: '100%', 
    height: 44,
    paddingLeft: 10,
  },
  filter_container: {
    position: 'absolute', 
    top: 4, 
    right: 4, 
    marginLeft: 24, 
    width: 62, 
    height: 36, 
    flexDirection: 'row', 
    flex: 1, 
    alignItems: 'center', 
    borderRadius: 18, 
    justifyContent: 'space-evenly', 
    backgroundColor: COLOR.blackColor,
  },
  experience_category_list: {
    marginLeft: 24,
    height: 40,
    flexDirection: 'row',
  },
  list_title: {
    marginTop: 33,
    marginLeft: 24,
    height: 33,
    fontFamily: FONT.AN_Bold,
    fontSize: 24,
    color: COLOR.systemWhiteColor,
  }
});

const experienceCategoryStyles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: COLOR.clearColor,
    marginRight: 12,
    borderRadius: 20,
    borderColor: COLOR.whiteBorderColor,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    height: 38,
    lineHeight: 38,
    marginLeft: 21,
    marginRight: 21,
    fontFamily: FONT.AN_Regular,
    color: COLOR.systemWhiteColor,
    fontSize: 14,
  },
});
