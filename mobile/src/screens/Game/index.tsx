import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";
import { RootStackScreenProps } from "../../@types/navigation";
import { styles } from "./styles";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { Duo, DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game({ navigation, route }: RootStackScreenProps<"game">) {
  const [duos, setDuos] = useState<Duo[]>([]);
  const [discordDuoSelected, setDiscordSelected] = useState("");

  const { id, title, bannerUrl } = route.params;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.8:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.15.8:3333/games/${id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              marginRight: "auto",
            }}
            onPress={handleGoBack}
          >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
        </View>
        <Image source={{ uri: bannerUrl }} style={styles.cover} />
        <Heading title={title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={
            duos.length > 0 ? styles.listContent : styles.emptyListContent
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo
            </Text>
          )}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
        />
        <DuoMatch
          discord={discordDuoSelected}
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
