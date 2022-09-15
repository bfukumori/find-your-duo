import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 28,
  },
  logo: {
    width: 72,
    height: 40,
    marginRight: "auto",
  },
  cover: {
    width: 311,
    height: 160,
    borderRadius: 8,
    marginTop: 32,
    resizeMode: "contain",
  },
  listContent: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: "flex-start",
  },
  emptyListText: {
    color: THEME.COLORS.CAPTION_300,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
  },
  emptyListContent: {
    alignItems: "center",
  },
});
