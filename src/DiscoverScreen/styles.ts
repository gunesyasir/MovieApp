import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  addButton: {
    paddingVertical: 6, 
    paddingStart: 6,
  },
  addIcon: {
    width: 25, 
    height: 25, 
    marginEnd: 20
  },
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
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#cbe9bf',
    marginVertical: 2,
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    marginStart: 20,
  },
});
