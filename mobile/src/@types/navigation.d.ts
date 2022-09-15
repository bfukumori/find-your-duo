import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  home: undefined;
  game: {
    id: string;
    title: string;
    bannerUrl: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamsList extends RootParamsList {}
  }
}
