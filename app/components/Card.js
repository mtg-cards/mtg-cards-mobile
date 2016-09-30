import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default ({ id, cardName, setName, imageUrl }) => {
    return (
        <View key={id} style={styles.cardItem}>
            <Text style={styles.cardName}>
                {cardName}
            </Text>
            <Text style={styles.setName}>
                {setName}
            </Text>
            <Image
                style={styles.cardIcon}
                defaultSource={require('images/mtg-logo-bw.png')}
                source={{uri: imageUrl}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});