import MemberList from "@/components/members/member-list";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_COMPONENT_BACKGROUND_COLOR } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";


const ListPage = () => {

    return (
        <View style={styles.back}>
             <MemberList />
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        padding: 20,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        height:'100%',
        borderTopColor: DEFAULT_COMPONENT_BACKGROUND_COLOR,
        borderTopWidth:3,
    }
})

export default ListPage;