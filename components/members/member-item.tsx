import { EDIT_PAGE } from "@/constants/App";
import { DEFAULT_BORDER_COLOR } from "@/constants/Colors";
import { Member } from "@/constants/Types";
import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const MemberItem = ({member}: {member : Member}) => {

    const navigation = useNavigation();
    function getName({member}: {member : Member}) {
        if (member.is_admin) {
            return member.name + ' (admin)';
        } else {
            return member.name;
        }
    }
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(EDIT_PAGE, {member: member})}>
            <Image 
                style={{width:50, height:70}}
                source={require('../../assets/images/contact.png')}
            />  
            <View style={{padding:10}}>
                <Text style={styles.name}>{getName({member})}</Text>
                <Text style={styles.details}>{member.phone}</Text>
                <Text style={styles.details}>{member.email}</Text>
            </View>
              
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection:'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: DEFAULT_BORDER_COLOR,
        borderRadius: 10,
        marginVertical: 5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderCurve: 'continuous',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    details: {
        color: 'grey',
        padding: 1
    }
})

export default MemberItem;