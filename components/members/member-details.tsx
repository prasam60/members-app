import { ADMIN_VALUE, INDEX_PAGE, MEMBERS_URL, REGULAR_VALUE } from "@/constants/App";
import { DEFAULT_BORDER_COLOR, DEFAULT_COMPONENT_BACKGROUND_COLOR } from "@/constants/Colors";
import { Member } from "@/constants/Types";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";


const MemberDetails = ({member}: {member : Member| null}) => {

    const navigation = useNavigation()

    const [id, setId] = useState(0);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setIsAdmin] = useState(false);
    const [is_edit_page, setIsEditPage] = useState(false);
    const [loadMember, setLoadMember] = useState(true);


    useEffect(() => {
        
        if(member != null && loadMember) {
            setId(member.id)
            setFirstName(member.first_name);
            setLastName(member.last_name);
            setPhone(member.phone);
            setEmail(member.email);
            setIsAdmin(member.is_admin);
            setIsEditPage(true);
            setLoadMember(false);
        }
    }), [];


    const handleSaveEvent = async() => {

        if(first_name.length == 0 || last_name.length == 0 || email.length == 0 || phone.length == 0) {
            Alert.alert('Missing required fields');
            return 
        }

        const payload = {
            first_name,
            last_name,
            email,
            phone,
            is_admin
        }

        if(is_edit_page) {
            const response = await fetch(MEMBERS_URL + id + '/',  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        } else {
            const response = await fetch(MEMBERS_URL,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
        }
    
        navigation.navigate(INDEX_PAGE);
    }

    const handleDeleteEvent = async() => {
        const response = await fetch(MEMBERS_URL + id + '/',  {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        navigation.navigate(INDEX_PAGE);
    }

    const handleRadioChange = (value: string) => {
        setIsAdmin(value == ADMIN_VALUE);
    }
    
    const getRadioValue = () : string => {
        if (is_admin) {
            return ADMIN_VALUE;
        } else {
            return REGULAR_VALUE;
        }
    }

    const adminRadioLabelProps = {
        labelStyle : {
            color: is_admin ? 'black' : '#B1AEAE'
        }
    }

    const regularRadioLabelProps = {
        labelStyle : {
            color: is_admin ? '#B1AEAE' : 'black'
        }
    }

    const titleText = is_edit_page ? 'Edit' : 'Add a'
    const subTitleText = is_edit_page ? 'Edit contact info' : 'Set email'

    return (
        <View style={styles.screen}>
            <View>
            <Text style={styles.title}>{titleText} team member</Text>
            <Text style={styles.description}>{subTitleText}, location and role.</Text>
            </View>
            <View style={styles.border}/>
            <View style={{paddingTop:15,}}>
                <Text style={styles.subtitle}>Info</Text>
                <TextInput
                    value={first_name}
                    onChangeText={setFirstName}
                    placeholder='first name'
                    style={styles.input}
                />
                <TextInput
                    value={last_name}
                    onChangeText={setLastName}
                    placeholder='last name'
                    style={styles.input}
                />
                <TextInput
                    value={email}
                    inputMode='email'
                    onChangeText={setEmail}
                    placeholder='email@email.com'
                    style={styles.input}
                />
                <TextInput
                    value={phone}
                    inputMode='tel'
                    onChangeText={setPhone}
                    placeholder='555-555-5555'
                    style={styles.input}
                />
                <Text style={styles.subtitle}>Role</Text>
                <RadioButton.Group onValueChange={value => handleRadioChange(value)} value={getRadioValue()}>
                    <RadioButton.Item 
                        label="Regular - Can't delete members" 
                        value={REGULAR_VALUE}
                        color='blue' 
                        style={styles.radio} 
                        uncheckedColor='lightgrey'
                        {...regularRadioLabelProps}
                    />
                    <RadioButton.Item 
                        label='Admin - Can delete members' 
                        value={ADMIN_VALUE}
                        color='blue'  
                        style={styles.radio} 
                        uncheckedColor='lightgrey'
                        {...adminRadioLabelProps}
                    />
                </RadioButton.Group>
                <View style={styles.buttons}>
                    <Pressable style={styles.saveButton} onPress={handleSaveEvent}>
                        <Text style={styles.saveText}>Save</Text>
                    </Pressable>
                    {is_edit_page ? 
                        <Pressable style={styles.deleteButton}>
                            <Text style={styles.deleteText} onPress={handleDeleteEvent}>Delete</Text>
                        </Pressable>
                    :
                        null
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: DEFAULT_COMPONENT_BACKGROUND_COLOR
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        borderColor: DEFAULT_BORDER_COLOR
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
    border: {
        borderWidth: 0,
        borderColor: DEFAULT_BORDER_COLOR,
        borderBottomWidth: 1,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 5,
        paddingTop: 10
    },
    radio: {
        paddingLeft: 0,
        borderBottomColor: DEFAULT_BORDER_COLOR,
        borderBottomWidth: 1,
        paddingRight: 0,
    },
    buttons: {
        paddingTop: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderWidth: 1,
        backgroundColor: 'white',
      },
    deleteText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#CB5757',
      },
      saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        // borderRadius: 4,
        borderWidth: 1,
        backgroundColor: '#4A4AFB',
      },
    saveText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },

})

export default MemberDetails;