import {Text, View, StyleSheet, Page} from '@react-pdf/renderer';
import {Key} from 'react';
// import {} from 'react-pdf';

interface Props {
  text: string
  fontStyle: "normal" | "light" | "ultralight" | "bold" | "lightnormal"
  fontSize: number
  marginTop: number
  marginBottom: number
}

const PersianText: React.FC<Props> = ( props ) => {
  const styles = StyleSheet.create( {
    textWrapper: {
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      // alignContent: ''
    },
    Text: {
      flexDirection: 'row-reverse',
      marginLeft: 3,
      fontSize: props.fontSize,
      fontStyle: props.fontStyle,
    },
  } )
  return (
    <View style={styles.textWrapper}>
      {
        props.text.split( " " ).map( ( word: string, id: Key ) => {
          return (
            <Text style={styles.Text} key={id}>
              {word}
            </Text>
          );
        } )
      }
    </View>
  )
};

export default PersianText;
