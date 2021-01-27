import * as React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Container } from 'native-base';
import { SvgXml } from 'react-native-svg';
import Spinner from 'react-native-loading-spinner-overlay';

// from app
import { 
  API_CONFIG, 
  COLOR, 
  CustomText, 
  CustomTextInput, 
  ERROR_MESSAGE, 
  FONT, 
  GetVisibleDateString, 
  Icon_Filter, 
  Icon_Search, 
  MARGIN_TOP, 
} from '../../constants';
import { useCategories, useExperiences, useHosts, useSearch } from '../../hooks';
import { ICategory, IExperience, IUser, IHostList, ISearchHome } from '../../interfaces/app';
import { ExperienceView, FiltersView, HostView, SelectDateRangeView } from '../../components/View';
import { useDispatch, useGlobalState } from '../../redux/Store';
import { ActionType } from '../../redux/Reducer';


export const HomeScreen: React.FC = () => {
  
  const dispatch = useDispatch();
  const filter = useGlobalState('filter');
  const needReloadData = useGlobalState('needReloadData');

  const { getCategoryList } = useCategories();
  const { getExperienceList } = useExperiences();
  const { getHostList } = useHosts();
  const { searchHome } = useSearch();

  const [searchText, setSearchText] = useState<string>('');
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [popularExperienceList, setPopularExperienceList] = useState<IExperience[]>([]);
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [popularHostList, setPopularHostList] = useState<IUser[]>([]);
  const [hostList, setHostList] = useState<IUser[]>([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<ICategory[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSelectDates, setShowSelectDates] = useState<boolean>(false);
  const [selectedFromDate, setSelectedFromDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [fetchingExperienceList, setFetchingExperienceList] = useState<boolean>(false);
  const [fetchingHostList, setFetchingHostList] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);


  useEffect(() => {
    loadCategoryList();
    loadExperienceList();
    loadHostList();
  }, [API_CONFIG])

  useEffect(() => {
    if (needReloadData == false) {
      return;
    }
    dispatch({
      type: ActionType.SET_NEED_RELOAD_DATA,
      payload: false,
    });

    loadCategoryList();
    loadExperienceList();
    loadHostList();
  }, [needReloadData])

  useEffect(() => {
    onSearch();
  }, [filter])

  async function loadCategoryList() {
    await getCategoryList('')
    .then(async (result: Promise<ICategory[]>) => {
      setCategoryList(await result);
      dispatch({
        type: ActionType.SET_CATEGORY_LIST,
        payload: (await result),
      })
    }).catch(() => {
    });
  }

  async function loadExperienceList() {
    setFetchingExperienceList(true);
    await getExperienceList()
    .then(async (result: Promise<IExperience[]>) => {
      setPopularExperienceList(await result);
      dispatch({
        type: ActionType.SET_EXPERIENCE_LIST,
        payload: await result,
      });
      setFetchingExperienceList(false);
    }).catch(() => {
      setFetchingExperienceList(false);
    });
  }

  async function loadHostList() {
    setFetchingHostList(true);
    await getHostList()
    .then(async (result: Promise<IHostList>) => {
      setPopularHostList((await result).results);
      dispatch({
        type: ActionType.SET_HOST_LIST,
        payload: (await result).results,
      });
      setFetchingHostList(false);
    }).catch(() => {
      setFetchingHostList(false);
    });
  }

  const onSearch = async () => {
    if ((filter.minPrice == null || filter.minPrice == 0) 
      && (filter.maxPrice == null || filter.maxPrice == 1000 || filter.maxPrice == 0)
      && (filter.startDay == null || filter.startDay == '') 
      && (filter.endDay == null || filter.endDay == '') 
      && (filter.location == null || filter.location == '') 
      && filter.categoryName.length == 0
      && searchText == '') {
      setFiltering(false);
    } else {
      setFiltering(true);

      let filterMinPrice = filter.minPrice;
      let filterMaxPrice = filter.maxPrice;
      if (filterMinPrice == 0) {
        if (filterMaxPrice == 1000) {
          filterMaxPrice = 0;
        } else {
          filterMinPrice = 1;
        }
      }  

      // setFetchingData(true);
      await searchHome(filterMinPrice, filterMaxPrice, filter.startDay, filter.endDay, filter.categoryName, searchText.toLowerCase(), filter.location)
      .then(async (result: Promise<ISearchHome>) => {
        if ((await result).experiences.length == 0 && (await result).hosts.length == 0) {
          Alert.alert(ERROR_MESSAGE.UPDATE_SEARCH_CONDITION);
        }

        setExperienceList((await result).experiences);
        setHostList((await result).hosts);
        
        // setFetchingData(false);
      }).catch(() => {
        setExperienceList([]);
        setHostList([]);
        Alert.alert(ERROR_MESSAGE.UPDATE_SEARCH_CONDITION);
        // setFetchingData(false);
      });
    }
  }

  function onFilterExperience(lowPrice: number, highPrice: number, location: string) {
    let minPrice = lowPrice;
    var maxPrice = highPrice;
    
    dispatch({
      type: ActionType.SET_FILTER,
      payload: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        startDay: filter.startDay,
        endDay: filter.endDay,
        categoryName: filter.categoryName,
        location: location,
      },
    });
    setShowFilters(false);
  }

  function onFilterSelectDate(fromDate: string, endDate: string) {
    setSelectedFromDate(fromDate);
    setSelectedEndDate(endDate);
    dispatch({
      type: ActionType.SET_FILTER,
      payload: {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        startDay: fromDate,
        endDay: endDate,
        categoryName: filter.categoryName,
        location: filter.location,
      },
    });
    setShowSelectDates(false);
  }

  function onSelectCategory(category: ICategory) {
    var location = checkSelectedCategory(category);
    var list = [...selectedCategoryList];
    if (location == -1) {
      list.push(category);
    } else {
      list.splice(location, 1);
    }

    var categoryName: string[] = [];
    for (let i = 0; i < list.length; i++) {
      categoryName.push(list[i].name);
    }

    dispatch({
      type: ActionType.SET_FILTER,
      payload: {
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice,
        startDay: filter.startDay,
        endDay: filter.endDay,
        categoryName: categoryName,
        location: filter.location,
      },
    });
    setSelectedCategoryList(list);
  }

  function checkSelectedCategory(category: ICategory) {
    for (let i = 0; i < selectedCategoryList.length; i++) {
      if (selectedCategoryList[i].id == category.id) {
        return i;
      }
    }
    return -1;
  }

  function renderCategoryView(category: ICategory) {
    return (
      <TouchableWithoutFeedback onPress={() => onSelectCategory(category)}>
        <View style={{...experienceCategoryStyles.container, backgroundColor: checkSelectedCategory(category) != -1 ? COLOR.selectedCategoryBackgroundColor : COLOR.clearColor}}>
          <CustomText style={experienceCategoryStyles.title}>{ category.name }</CustomText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Container style={styles.background}>
      <SafeAreaView style={styles.safe_area}>
        <View style={styles.search_bar}>
          <View style={styles.search_button_container}>
            <View style={styles.search_icon}>
              <SvgXml width='100%' height='100%' xml={Icon_Search} />
            </View>
          </View>

          <View style={styles.search_text_container}>
            { searchText == '' && (
              <View style={styles.search_text_placeholder}>
                <CustomText style={styles.placeholder_search}>Search</CustomText>
                <CustomText style={styles.placeholder_kloutkast}>KloutKast</CustomText>
              </View>
            )}
            <CustomTextInput 
              style={styles.search_text}
              onChangeText={text => setSearchText(text)}
              autoCapitalize='none'
              value={searchText} 
              onSubmitEditing={onSearch} />
          </View>

          <TouchableWithoutFeedback onPress={() => setShowFilters(true)}>
            <View style={styles.filter_container}>
              <SvgXml width={14} height={14} xml={Icon_Filter} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={{width: '100%', marginTop: 16}}>
          <View style={styles.experience_category_list}>
            <TouchableWithoutFeedback onPress={() => setShowSelectDates(true)}>
              <View style={{...experienceCategoryStyles.container, backgroundColor: selectedFromDate != '' ? COLOR.selectedCategoryBackgroundColor : COLOR.clearColor}}>
                <CustomText style={experienceCategoryStyles.title}>
                  { GetVisibleDateString('Dates', selectedFromDate, selectedEndDate) }
                </CustomText>
              </View>
            </TouchableWithoutFeedback>

            <View style={{width: 1, height: '100%', backgroundColor: COLOR.whiteBorderColor}} />

            <FlatList
              style={{width: '100%', height: 40, marginLeft: 12}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={categoryList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => renderCategoryView(item)}
            />
          </View>

          <CustomText style={styles.list_title}>
            { filtering == false ? 'Popular Experiences' : experienceList.length + ' Experiences' }
          </CustomText>
          <FlatList
            style={{width: '100%', height: 284, marginTop: 22 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={filtering == false ? popularExperienceList : experienceList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ExperienceView experience={item} white_color={true} onFetchingData={setFetchingData} />}
          />

          <CustomText style={styles.list_title}>
            { filtering == false ? 'Popular Hosts' : hostList.length + ' Hosts' }
          </CustomText>
          <FlatList
            style={{width: '100%', height: 211, marginTop: 22, marginBottom: 20 }}
            contentContainerStyle={{paddingHorizontal: 24}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={filtering == false ? popularHostList : hostList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <HostView host={item} onFetchingData={setFetchingData} />}
          />
        </ScrollView>

        <Modal animationType = {"slide"} transparent = {true}
          visible = {showSelectDates}
          onRequestClose = {() => { } }>
          <SelectDateRangeView selectedFromDate={selectedFromDate} selectedEndDate={selectedEndDate} onCloseView={setShowSelectDates} onSelectDate={onFilterSelectDate} />
        </Modal>
       
        <Modal animationType = {"slide"} transparent = {true}
          visible = {showFilters}
          onRequestClose = {() => { } }>
          <FiltersView onCloseView={setShowFilters} onFilter={onFilterExperience} />
        </Modal> 
      </SafeAreaView>

      <Spinner
        visible={fetchingHostList || fetchingExperienceList || fetchingData}
        textContent={''}
        textStyle={{color: COLOR.systemWhiteColor}}
      />
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
    // lineHeight: 44,
    lineHeight: 16,
    paddingLeft: 10,
    fontFamily: FONT.AN_Regular, 
    fontSize: 14, 
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
    fontFamily: FONT.AN_Regular,
    fontWeight: '600',
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
