import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Member } from "@/constants/Types";
import MemberItem from "./member-item";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useIsFocused} from "@react-navigation/native";
import { ADD_PAGE, MEMBERS_URL } from "@/constants/App";
import { DEFAULT_BORDER_COLOR, DEFAULT_COMPONENT_BACKGROUND_COLOR } from "@/constants/Colors";

const MemberList = () => {

    const navigation = useNavigation()

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    const handleRefresh = () => {
        setRefresh(prevState => !prevState)
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        fetchData()
    }, [refresh, isFocused])

    const fetchData = async() => {
        const response = await fetch(MEMBERS_URL)
        const responseData = await response.json();
        setData(responseData)
    }

    const renderItem = ({item}: {item: Member}) => {
        return  <MemberItem member={item} />
    }
    return (
        <View style={styles.screen}>
            <View style={styles.add} >
            <Text style={styles.plus} onPress={()=> navigation.navigate(ADD_PAGE)}>+</Text>
            </View>
            
            <View style={styles.main}>
                <Text style={styles.title}>Team members</Text>
                <Text style={styles.description}>You have {data.length} team members.</Text>
            </View>
            <View style={styles.border}></View>
            <View>
            <FlatList 
                 data={data}
                 renderItem={renderItem}
                 keyExtractor={item=> item.id}
                 style={styles.list}
                 refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={handleRefresh}
                    />  
                 }
                 ListEmptyComponent={<Text style={styles.empty}>List is empty.</Text>}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        paddingTop: 0,
        backgroundColor: DEFAULT_COMPONENT_BACKGROUND_COLOR,
    },
    main: {
        paddingLeft: 10,
    },
    border: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0,
        borderColor: DEFAULT_BORDER_COLOR,
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25
    },
    description: {
        color: 'grey',
        paddingBottom: 25,
        fontSize: 15,
        
    },
    add: {
        paddingTop: 2,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    plus: {
        color: '#CBE7F3',
        fontSize: 35,
        includeFontPadding: false
    },
    list: {
        height: '80%'
    },
    empty: {
        textAlign:'center',
        paddingTop: 20
    }
})

export default MemberList; 