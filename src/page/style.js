import { StyleSheet, Appearance } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginBottom: 8,
        borderRadius: 8,
    },
    news_container: {
        flex: 1,
        alignItems: 'stretch',
        marginHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        marginRight: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black'
    },
    publishedAt: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black'
    },
});