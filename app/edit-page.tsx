import MemberDetails from "@/components/members/member-details";
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_COMPONENT_BACKGROUND_COLOR } from "@/constants/Colors";
import { Member } from "@/constants/Types";
import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";


const EditPage = () => {
    const route = useRoute()

    const params : {member:Member} = route.params

    return (
        <ScrollView style={styles.back}>
            <MemberDetails member={params.member}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: DEFAULT_COMPONENT_BACKGROUND_COLOR
    },
    back: {
        padding: 20,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        height: '100%',
        borderTopColor: DEFAULT_COMPONENT_BACKGROUND_COLOR,
        borderTopWidth:3
    },

})

export default EditPage;