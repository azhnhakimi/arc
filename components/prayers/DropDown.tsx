import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropDownProps = {
  data: string[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
};

export default function DropDown({
  data,
  value,
  onChange,
  placeholder,
  isDisabled = false,
}: DropDownProps) {
  const { theme } = useTheme();
  const styles = useStyles();

  const [isFocus, setIsFocus] = useState(false);
  const transformedData = data.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <View>
      <Dropdown
        key={`${value}-${data.length}`}
        disable={isDisabled}
        style={[styles.dropdown, isFocus && { borderColor: theme.accent }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerSyle}
        autoScroll={false}
        renderItem={(item) => {
          const isSelected = item.value === value;

          return (
            <View
              style={{
                padding: 16,
                backgroundColor: isSelected ? theme.accent : theme.surface,
              }}
            >
              <Text
                style={{
                  color: isSelected ? theme.onAccent : theme.primaryText,
                  fontFamily: fonts.regular,
                }}
              >
                {item.label}
              </Text>
            </View>
          );
        }}
        activeColor={theme.accent}
        data={transformedData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={
          isDisabled
            ? "Select previous field first..."
            : !isFocus
              ? placeholder
                ? placeholder
                : "Select item"
              : "Selecting..."
        }
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => {
          return isDisabled ? (
            <MaterialCommunityIcons
              name="cancel"
              size={20}
              color={theme.mutedText}
            />
          ) : (
            <Entypo
              name="chevron-down"
              size={20}
              color={isFocus ? theme.accent : theme.mutedText}
              style={{
                transform: [{ rotate: isFocus ? "180deg" : "0deg" }],
              }}
            />
          );
        }}
      />
    </View>
  );
}

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: theme.border,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: theme.mutedText,
      fontFamily: fonts.regular,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.primaryText,
      fontFamily: fonts.regular,
    },

    containerSyle: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
      overflow: "hidden",
    },
    itemTextStyle: {
      color: theme.primaryText,
      fontFamily: fonts.regular,
    },
  });
};
