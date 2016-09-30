/**
 * Magic The Gathering - Card Search
 * @flow
 */

import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image
} from 'react-native';

import Card from 'components/Card';
import Button from 'react-native-button';
import { MessageBar as MessageBarAlert, MessageBarManager } from 'react-native-message-bar';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardName: '',
            foundCards: []
        };
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    searchCards() {
        fetch('https://api.magicthegathering.io/v1/cards?orderBy=name&name=' + this.state.cardName)
            .then(res => res.json())
            .then(data => {
                this.setState({foundCards: data.cards});
                if (data.cards.length == 0) {
                    MessageBarManager.showAlert({
                        message: 'No cards found with that name.',
                        alertType: 'error',
                    });
                } else if (data.cards.length == 100) {
                    MessageBarManager.showAlert({
                        message: 'Found more than 100 cards.\nPlease refine search!',
                        alertType: 'warning',
                    });

                } else {
                    MessageBarManager.showAlert({
                        message: 'Found ' + data.cards.length + ' cards.',
                        alertType: 'success',
                    });
                }
            });
    }

    render() {
        let foundCardsList = this.state.foundCards.map(function (item) {
            return (
                <Card key={item.id}
                      cardName={item.name}
                      setName={item.setName}
                      imageUrl={item.imageUrl}
                />
            );
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        style={styles.logo}
                        source={require('./images/mtg-logo.png')}
                    />
                    <Text style={styles.instructions}>
                        Enter card name:
                    </Text>
                    <TextInput
                        style={styles.cardNameInput}
                        onChangeText={(text) => this.setState({cardName: text})}
                        onSubmitEditing={() => this.searchCards()}
                        autoCorrect={false}
                        autoFocus={true}
                        value={this.state.cardName}
                    />
                    <Button
                        style={styles.searchButton}
                        onPress={() => this.searchCards()}>
                        Search
                    </Button>
                    <View style={styles.cardListContainer}>
                        <View style={{paddingTop: 22}}>
                            {foundCardsList}
                        </View>
                    </View>
                </ScrollView>
                <MessageBarAlert ref="alert" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 25,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    cardListContainer: {
        alignItems: 'center',
    },
    logo: {
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        resizeMode: 'contain',
    },
    cardItem: {
        marginBottom: 25,
    },
    cardName: {
        fontSize: 20,
        marginBottom: 0,
    },
    setName: {
        fontSize: 15,
        marginBottom: 10,
    },
    cardIcon: {
        width: 226,
        height: 311,
        resizeMode: 'contain',
        borderWidth: 0,
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    cardNameInput: {
        marginBottom: 20,
        padding: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    searchButton: {
        fontSize: 20,
        backgroundColor: 'green',
        color: '#FFFFFF',
        padding: 5,
        height: 40,
        borderWidth: 1,
    },
});

AppRegistry.registerComponent('MtgCardsMobile', () => Index);
