import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  closeButton: {
    position: 'absolute',
    marginTop: 20,
    marginStart: 20,
    padding: 5
  },
  closeImage: {
    width: 30, 
    height: 30, 
    tintColor: 'white'
  },
  genre: {
    color: 'white',
    marginTop: 10,
    marginStart: 10,
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.5,
  },
  heartIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginEnd: 15,
  },
  image: {
    flex: 1,
  },
  movieInfoContainer: {
    flex: 1,
  },
  movieScoreContainer: {
    width: 100,
    height: 30,
    backgroundColor: '#F8D458',
    borderRadius: 5,
    marginTop: 5,
    marginStart: 10,
  },
  overview: {
    color: 'white',
    marginTop: 14,
    marginStart: 10,
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.5,
  },
  scoreContainer: {
    flexDirection: 'row',
  },
  scoreText: {
    marginStart: 10,
    color: 'white',
    fontWeight: '800',
  },
  starIcon: {
    height: 20,
    width: 20,
    marginStart: 10,
    fontSize: 15,
  },
  title: {
    color: 'white',
    marginTop: 20,
    marginStart: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  view: {
    flex: 1,
    backgroundColor: '#17181B',
  },
  voteCount: {
    marginStart: 4,
    marginTop: 3,
    fontSize: 10,
    color: 'white',
  },
});
