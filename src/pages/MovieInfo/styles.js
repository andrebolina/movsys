const useStyles = theme => ({
    container: {
        padding: 20
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    header: {
        display: 'flex',
        paddingTop: 20
    },

    poster: {
        maxHeight: 300,
        borderRadius: 8,
        marginRight: 24
    },

    mainProps: {
        width: '100%'
    },

    title: {
        fontSize: 32,
        fontWeight: '500',
        display: 'inline-block',
        marginRight: 5
    },

    year: {
        display: 'inline-block',
        color: '#888'
    },

    icon: {
        width: 20,
        marginRight: 5
    },

    plot: {
        paddingTop: 20,
        paddingBottom: 40,
        textAlign: 'justify'
    },

    moreInfo: {
        marginRight: 10,
        marginBottom: 10
    }
});

export default useStyles;