import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { Container } from 'native-base';
import { useEffect, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import Moment from 'moment';

// from app
import { API_CONFIG, COLOR, FONT, Icon_Filter, Icon_Search, MARGIN_TOP } from '../../constants';
import { useCategories, useExperiences, useHosts } from '../../hooks';
import { ICategory, IExperience, IHost, IHostList } from '../../interfaces/app';
import { ExperienceView, FiltersView, HostView, SelectDatesView } from '../../components/View';


export const HomeScreen: React.FC = () => {
  
  const { getCategoryList } = useCategories();
  const { getExperienceList } = useExperiences();
  const { getHostList } = useHosts();

  const [searchText, setSearchText] = useState<string>('');
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [hostList, setHostList] = useState<IHost[]>([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSelectDates, setShowSelectDates] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  var isSearchResult = false;

  useEffect(() => {
    loadCategoryList();
    loadExperienceList();
    loadHostList();
  }, [API_CONFIG])

  async function loadCategoryList() {
    await getCategoryList('')
    .then(async (result: Promise<ICategory[]>) => {
      setCategoryList(await result);
    }).catch(() => {
    });
  }

  async function loadExperienceList() {
    await getExperienceList()
    .then(async (result: Promise<IExperience[]>) => {
      setExperienceList(await result);
    }).catch(() => {
    });
  }

  async function loadHostList() {
    await getHostList()
    .then(async (result: Promise<IHostList>) => {
      setHostList((await result).results);
    }).catch(() => {
    });
  }

  function onSearch() {
    console.log('search home');
  }

  function onSelectDateFilter() {
    // setSelectedExperienceCategoryID(0);
    // navigate('SelectDates');
    setShowSelectDates(true);
  }

  function onSelectDate(selectedDate: string,) {
    setSelectedDate(selectedDate);
    setShowSelectDates(false);
  }

  function getVisibleDate() {
    var visibleDateString = 'Dates';
    if (selectedDate != '') {
      const date = Moment(selectedDate, 'YYYY-MM-DD', true).format();
      visibleDateString = Moment(date).format('MMMM D');
    }
    return visibleDateString;
  }

  function onSelectCategory(category: ICategory) {
    setSelectedCategoryID(category.id);
  }

  function renderCategoryView(category: ICategory) {
    return (
      <TouchableWithoutFeedback onPress={() => onSelectCategory(category)}>
        <View style={{...experienceCategoryStyles.container, backgroundColor: selectedCategoryID == category.id ? COLOR.selectedCategoryBackgroundColor : COLOR.clearColor}}>
          <Text style={experienceCategoryStyles.title}>{ category.name }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Container style={styles.background}>
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
          { searchText == '' && (
            <View style={styles.search_text_placeholder}>
              <Text style={styles.placeholder_search}>Search</Text>
              <Text style={styles.placeholder_kloutkast}>KloutKast</Text>
            </View>
          )}
            <TextInput 
              style={styles.search_text}
              onChangeText={text => setSearchText(text)}
              value={searchText} />
          </View>

          <TouchableWithoutFeedback onPress={() => setShowFilters(true)}>
            <View style={styles.filter_container}>
              <SvgXml width={14} height={14} xml={Icon_Filter} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={{width: '100%', marginTop: 16}}>
          <View style={styles.experience_category_list}>
            <TouchableWithoutFeedback onPress={() => onSelectDateFilter()}>
              <View style={{...experienceCategoryStyles.container, backgroundColor: selectedCategoryID == '' ? COLOR.selectedCategoryBackgroundColor : COLOR.clearColor}}>
                <Text style={experienceCategoryStyles.title}>
                  { getVisibleDate() }
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={{width: 1, height: '100%', backgroundColor: COLOR.whiteBorderColor}} />

            <FlatList
              style={{width: '100%', height: 40, marginLeft: 12}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={categoryList}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderCategoryView(item)}
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
            renderItem={({item}) => <ExperienceView experience={item} white_color={true} />}
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

        <Modal animationType = {"slide"} transparent = {true}
          visible = {showSelectDates}
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <SelectDatesView selectedDate={selectedDate} onCloseView={setShowSelectDates} onSelectDate={onSelectDate} />
        </Modal>
       
        <Modal animationType = {"slide"} transparent = {true}
          visible = {showFilters}
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <FiltersView onCloseView={setShowFilters} />
        </Modal> 
      </SafeAreaView>
    </Container>
  );
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
