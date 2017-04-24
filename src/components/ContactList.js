import React, {Component} from 'react';
import {Text, View, ScrollView, ListView,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import ContactItem from './ContactItem';
import Spinner from './common/Spinner';
import {contactsFetch} from '../actions/';

class ContactList extends Component {
    
	state = { contacts: [] };

    componentWillMount() {
        console.log('componentWillMount');
        this.props.contactsFetch();

        this.createDataSource(this.props)
    }

    refreshData(){
        this.props.contactsFetch();

        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({contacts}) {
        const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(contacts);
    }


    renderRow(contact) {
        return <ContactItem contact={contact} />;
    }

    render() {
        if (this.props.loading) {
            console.log('loadiiinggg');
            return (
                <Spinner size="large"/>
            );
        }

        if (this.props.error === 'Cannot Load Data'){
            return (
            <TouchableOpacity onPress={() => this.refreshData()} >
                <View style={styles.errorViewStyle}>
                    <Text style={styles.errorTextStyle}>Cannot Load Data!!</Text>
                    <Text>Tap to retry</Text>
                </View>
            </TouchableOpacity>
            );
        }

        return (
            <ListView 
            enableEmptySections 
            dataSource={this.dataSource} 
            renderRow={this.renderRow}/>
        );
    }  
}

const styles = {
    scrollViewStyle : {
        paddingTop: 10
    },errorViewStyle : {
        backgroundColor:"#FF0000",
        justifyContent:'center',
        alignItems:'center',
        height:45 ,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },errorTextStyle :{
        fontSize: 15,
        color:"#0000FF",
        
    }
}

const mapStateToProps = ({contactsReducer}) => {
    console.log("contactsReducer "+ JSON.stringify(contactsReducer));
    const {contacts, error, loading} = contactsReducer;
    return {contacts,error,loading};
};

export default connect(mapStateToProps, {contactsFetch} )(ContactList);