import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, TouchableOpacity, Modal, TextInput, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import tempData from "../tempData";
import { SafeAreaView } from "react-navigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class AddSCheduleModal extends React.Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
    state = {
        name: "",
        type: "",
        color: "",
        room: "",
        building: "",
        teacher: "",
        once: true,
        repeats: false,
        date: "",
        stime: "",
        etime: "",
        tarih: "",

        color: this.backgroundColors[0],
        showSubjectVisible: false,
        showOccurVisible: false,
        isDatePickerVisible: false,
        isTimePickerVisible: false,
    };

    toggleSubjectModal() {
        this.setState({ showSubjectVisible: !this.state.showSubjectVisible });
    };
    toggleOccurModal() {
        this.setState({ showOccurVisible: !this.state.showOccurVisible });
    };
    createSchedule = () => {
        const { name,
            type,
            color,
            room,
            building,
            teacher,
            once,
            repeats,
            date,
            stime,
            etime,
            todos } = this.state;

        tempData.push({
            name,
            type,
            color,
            room,
            building,
            teacher,
            once,
            repeats,
            date,
            stime,
            etime,
            todos: []
        });

        this.setState({ name: "",
                        type: "",
                        color: "",
                        room: "",
                        building: "",
                        teacher: "",
                        date: "",
                        stime: "",
                        etime: "", });
        this.props.closeModal();
    };

    handleConfirm = (date) => {
        this.setState({ date:date.toDateString()});
        this.setState({ isDatePickerVisible: false});
    };
    handleDone = (time) => {
        this.setState({ stime: time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})});
        this.setState({ isTimePickerVisible: false});
    };

    render() {
        let today = new Date().toDateString().replace(/ /g,' ')
        let now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">

                <View style={[styles.header, { backgroundColor: this.state.color }]}>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <View style={styles.cancel}>
                            <Text style={styles.sideText}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.headerText}>New Class</Text>
                    </View>
                    <TouchableOpacity onPress={this.createSchedule}>
                        <View style={styles.save}>
                            <Text style={styles.sideText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    visible={this.state.showSubjectVisible}
                    onRequestClose={() => this.toggleSubjectModal()}
                >
                    <View style={[styles.header, { backgroundColor: this.state.color }]}>
                        <TouchableOpacity onPress={() => this.toggleSubjectModal()}>
                            <View style={styles.cancel}>
                                <Text style={styles.sideText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={styles.headerText}>Courses</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.toggleSubjectModal()}>
                            <View style={styles.save}>
                                <Text style={styles.sideText}>Done</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={tempData}
                        keyExtractor={item => item.name}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => 
                        
                        <TouchableOpacity
                            onPress={() => this.setState({ name: item.name, color: item.color})}
                        >
                            <View style={[styles.selectSub, { borderLeftColor: item.color }]}>
                                <Text>{item.name}</Text> 
                            </View>
                        </TouchableOpacity>
                        }
                    />
                </Modal>
                <Modal
                    animationType="slide"
                    visible={this.state.showOccurVisible}
                    onRequestClose={() => this.toggleOccurModal()}
                >
                    <View style={[styles.header, { backgroundColor: this.state.color }]}>
                        <TouchableOpacity onPress={() => this.toggleOccurModal()}>
                            <View style={styles.cancel}> 
                            <Text style={styles.sideText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={styles.headerText}>Occurs</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.toggleOccurModal()}>
                            <View style={styles.save}>
                                <Text style={styles.sideText}>Done</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({ once: true, repeats: false})}
                    >
                        <View style={styles.selectSub}>
                            <View>
                                <Text>Once</Text>
                            </View>
                            {this.state.once ? 
                            <View>
                                  <AntDesign name="check" size={20} color={this.state.color}  position='absolute' right={20}/>
                            </View> 
                            : []
                            }
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity
                        onPress={() => this.setState({ once: false, repeats: true})}
                    >
                        <View style={styles.selectSub}>
                            <View>
                                <Text>Multiple Times (Repeats)</Text> 
                            </View>
                            {this.state.repeats ? 
                            <View>
                                  <AntDesign name="check" size={20} color={this.state.color}  position='absolute' right={20}/>
                            </View> 
                            : []
                            }
                        </View>
                    </TouchableOpacity> 
                </Modal>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <TouchableOpacity onPress={() => this.toggleSubjectModal()}>
                            <View style={styles.firstInput}>
                                <View flex='1'>
                                    <Text>Subjects</Text>
                                </View>
                                <View>
                                    <Text style={styles.subtitle}>{this.state.name}</Text>
                                </View>
                                <View>
                                  <AntDesign name="right" size={20} color={colours.gray}  position='absolute' right={20}/>
                                </View> 
                            </View>
                        </TouchableOpacity>
                        <View style={styles.secondInput}>
                            <TextInput 
                                placeholder="Type"
                                onChangeText={text => this.setState({ type: text })}
                            />
                        </View>
                    </View>
                    <View style={styles.input2}>
                        <View style={styles.firstInput}>
                            <TextInput 
                                placeholder="Room"
                                onChangeText={text => this.setState({ room: text })}
                            />
                        </View>
                        <View style={styles.secondInput}>
                            <TextInput 
                                placeholder="Building"
                                onChangeText={text => this.setState({ building: text })}
                            />
                        </View>
                    </View>
                    <View style={styles.input3}>
                        <View style={styles.firstInput}>
                            <TextInput 
                                placeholder="Lecturer"
                                onChangeText={text => this.setState({ teacher: text })}
                            />
                        </View>
                    </View>
                    <View style={styles.input3}>
                        <TouchableOpacity onPress={() => this.toggleOccurModal()}>
                            <View style={styles.firstInput}>
                                <View flex='1'>
                                    <Text>Occurs</Text>
                                </View>
                                <View>
                                    {this.state.once ? 
                                    <Text style={styles.subtitle}>Once</Text>
                                    :
                                    <Text style={styles.subtitle}>Multiple Times</Text>
                                    }
                                    
                                </View>
                                <View>
                                    <AntDesign name="right" size={20} color={colours.gray}  position='absolute' right={20}/>
                                </View> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.state.once ?
                    
                    <View style={styles.input4}>
                        <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true})}>
                            <View style={styles.firstInput}>
                                <View flex='1'>
                                    <Text>Date</Text>
                                </View>
                                {this.state.date ?
                                    <View>
                                         <Text style={styles.subtitle}>{this.state.date}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.subtitle}>{today}</Text>
                                    </View>
                                        
                                }
                                <View>
                                    <DateTimePickerModal
                                        isVisible={this.state.isDatePickerVisible}
                                        mode="date"
                                        minimumDate={new Date()}
                                        onConfirm={this.handleConfirm}
                                        onCancel={() => this.setState({ isDatePickerVisible: false})}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.setState({ isTimePickerVisible: true})}>
                            <View style={styles.firstInput}>
                                <View flex='1'>
                                    <Text>Start Time</Text>
                                </View>
                                {this.state.stime ?
                                    <View>
                                         <Text style={styles.subtitle}>{this.state.stime}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.subtitle}>{now}</Text>
                                    </View>
                                        
                                }
                                <View>
                                    <DateTimePickerModal
                                        isVisible={this.state.isTimePickerVisible}
                                        mode="time"
                                        headerTextIOS="Pick a time"
                                        defaultTime={now}
                                        onConfirm={this.handleDone}
                                        onCancel={() => this.setState({ isTimePickerVisible: false})}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.firstInput}>
                                <View flex='1'>
                                    <Text>End Time</Text>
                                </View>
                                <View>
                                    <Text style={styles.subtitle}>11:45</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :[]
                }
                    {today == this.state.date ?
                        <View>
                            <Text> The selected date is Today</Text>
                        </View> :
                        <View>
                        <Text> The selected date is NOT Today</Text>
                        </View>
                    }
                    {now == this.state.stime ?
                        <View>
                            <Text> The selected time is Now</Text>
                        </View> :
                        <View>
                        <Text> The selected time is NOT Now</Text>
                        </View>
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    subtitle: {
        fontSize: 18,
        color: colors.gray,
    },
    input: {
        marginTop:6,
        backgroundColor: colours.white,
        borderTopWidth: 1,
        borderTopColor: '#fafafa',
        borderBottomWidth: 1,
        borderBottomColor: '#fafafa',
        height: 80,
        paddingStart: 16,
        fontSize: 20,
        paddingEnd:16

    },
    input2: {
        marginTop: 30,
        backgroundColor: colours.white,
        borderTopWidth: 1,
        borderTopColor: '#fafafa',
        borderBottomWidth: 1,
        borderBottomColor: '#fafafa',
        height: 80,
        paddingStart: 16,
        fontSize: 20,
        paddingEnd:16

    },
    input3: {
        marginTop: 30,
        backgroundColor: colours.white,
        borderTopWidth: 1,
        borderTopColor: '#fafafa',
        borderBottomWidth: 1,
        borderBottomColor: '#fafafa',
        height: 40,
        paddingStart: 16,
        fontSize: 20,
        paddingEnd:16

    },
    input4: {
        marginTop:30,
        backgroundColor: colours.white,
        borderTopWidth: 1,
        borderTopColor: '#fafafa',
        borderBottomWidth: 1,
        borderBottomColor: '#fafafa',
        height: 120,
        paddingStart: 16,
        fontSize: 20,
        paddingEnd:16

    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    header: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical:  10,
        backgroundColor: "#24A6D9",
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: Platform.OS === 'android' ? 45 : 80
    },
    headerText: {
        fontSize: 22,
        fontWeight: "400",
        color: colours.white
    },
    sideText: {
        fontSize: 20,
        fontWeight: "400",
        color: colours.white
    },
    title: {
        alignItems: 'center'
    },

    cancel: {
        alignItems: 'flex-start',
        marginStart: 12
    },

    save: {
        alignItems: 'flex-start',
        marginEnd: 12
    },
    form: {
        backgroundColor: '#fafafa',
        flexDirection: 'column',
    },

    textInput: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    firstInput: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor:'#fafafa',
        paddingTop: 8,    
    },
    secondInput: {
        height: 40,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    selectSub: {
        flexDirection: 'row',
        marginTop: 12,
        height: 35,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#fafafa',
        alignItems: 'center',
        paddingStart: 12,
        borderLeftWidth: 4,
        marginStart: 12
    }

});