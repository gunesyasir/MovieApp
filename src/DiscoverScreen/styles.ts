import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#17181B',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center',
      backgroundColor: 'whitesmoke',
      width: '95%',
      borderRadius: 25,
      paddingLeft: 10,
    },
    searchText: {
      color: 'black',
      fontWeight: 'bold',
      width: '95%',
      fontSize: 12,
    },
  });