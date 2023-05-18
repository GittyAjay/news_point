import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginBottom: 8,
        borderRadius: 8,
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
    },
    publishedAt: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
});