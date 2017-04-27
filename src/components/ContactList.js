// ContactList.js

import React, {Component} from 'react';
import {Text, View, ScrollView, ListView,TouchableOpacity} from 'react-native';
import ContactItem from './ContactItem';
import Spinner from './common/Spinner';

class ContactList extends Component {

    componentWillMount() {
        this._createDataSource()
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps list '+JSON.stringify(this.props));
        this.dataSource = this.dataSource.cloneWithRows(nextProps.contacts);
    }

    _createDataSource = () => {
        const { contacts } = this.props;
        console.log('contacts '+ this.props.contacts);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(contacts);
    }


    _renderRow = (contact) => {
        console.log('contact => '+ contact)
        return <ContactItem contact={contact} />
    }

    _renderRetryButton = () => (
        <TouchableOpacity onPress={() => this.refreshData()} >
            <View style={styles.errorViewStyle}>
                <Text style={styles.errorTextStyle}>Cannot Load Data!!</Text>
                <Text style={styles.smallErrorTextStyle}>Tap to retry</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { loading, error, contacts } = this.props;

        console.log(this.props)
        console.log(this.dataSource);

        if (this.props.loading) {
            console.log('loading')
            return <Spinner size="large"/>
        }

        if (this.props.error === 'Cannot Load Data'){
            console.log('error view')
            return this._renderRetryButton()
        }
        return (
            <ListView 
                enableEmptySections 
                dataSource={this.dataSource} 
                renderRow={this._renderRow}
            />
        );
    }  
}

const styles = {
    scrollViewStyle : {
        paddingTop: 10
    },errorViewStyle : {
        backgroundColor:"#8b0000",
        justifyContent:'center',
        alignItems:'center',
        height:45 ,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },errorTextStyle :{
        fontSize: 15,
        color:"#d3d3d3",
    },smallErrorTextStyle: {
        color:"#9c9b9b"
    }
}

export default ContactList;