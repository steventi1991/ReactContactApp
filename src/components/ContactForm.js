import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { contactUpdate } from '../actions';
import CardSection from './common/CardSection';
import Input from './common/Input';

class ContactForm extends Component {

    render(){
        return (
            <View>
                <CardSection>
                    <Input label='Firstname' 
                        placeholder="Steven" 
                        value={this.props.firstName}
                        onChangeText={value => this.props.contactUpdate({ prop: 'firstName', value })}
                        />
                </CardSection>

                <CardSection>
                    <Input label='Lastname' 
                    placeholder="tio" 
                    value={this.props.lastName}
                    onChangeText={value => this.props.contactUpdate({ prop: 'lastName', value })}
                    />
                </CardSection>

                <CardSection>    
                    <Input label='Age' 
                    placeholder="26" 
                    value={this.props.age}
                    onChangeText={value => this.props.contactUpdate({ prop: 'age', value })}
                    />
                </CardSection>

                <View style={styles.errorAlertStyle}>
                    <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                </View>
                
            </View>
        );
    }

}

const styles = {
    errorAlertStyle : {
        paddingTop:10,
        alignItems:'center'
    },
    errorTextStyle: {
        color:'#FF0000',
        fontSize: 22,
        fontWeight:'bold'
    }

}

const mapStateToProps = (state) => {
  const { id, firstName, lastName, age, error } = state.contactForm;

  return { id, firstName, lastName, age, error };
};

export default connect(mapStateToProps, { contactUpdate })(ContactForm);
