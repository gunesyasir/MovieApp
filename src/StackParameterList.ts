import { Movie } from "./RequestManager";

export type StackParameterList = {
  DetailScreen: {movie: Movie};
  DiscoverScreen: undefined;
  FriendScreen: {friend: string};
  HomeScreen: undefined;
  ProfileScreen: undefined;
  TabScreen: undefined;
  ReviewScreen: {movieID: string, userName: string};
};
