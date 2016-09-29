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

import Button from 'react-native-button';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardName: '',
            foundCards: []
        };
    }

    searchCards() {
        fetch('https://api.magicthegathering.io/v1/cards?orderBy=name&name=' + this.state.cardName)
            .then(res => res.json())
            .then(data => this.setState({foundCards: data.cards}));
    }

    render() {
        let foundCardsList = this.state.foundCards.map(function (item) {
            return (
                <View key={item.id} style={styles.cardItem}>
                    <Text style={styles.cardName}>
                        {item.name}
                    </Text>
                    <Text style={styles.setName}>
                        {item.setName}
                    </Text>
                    <Image
                        style={styles.cardIcon}
                        defaultSource={require('./images/mtg-logo-bw.png')}
                        source={{uri: item.imageUrl}}
                    />
                </View>
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
