import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from './Metrics';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export default function SplashScreen(props){

    const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false)

    const edges = useSafeAreaInsets()

    const startAnimation = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()
    const scaleTitle = useRef(new Animated.Value(1)).current

    const moveTitle = useRef(new Animated.ValueXY({x: 0, y:0})).current
    const moveTitle2 = useRef(new Animated.ValueXY({x: 0, y:0})).current


    useEffect(() => {

      setTimeout(() => {
        Animated.sequence([
          Animated.timing(
            startAnimation,
            {
              toValue: -Dimensions.get('window').height + (edges.top + 60),
              useNativeDriver: true
            }
          ),
          Animated.timing(
            scaleTitle,
            {
              toValue: 0.80,
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveTitle,
            {
              toValue: {
                x: (2*Dimensions.get('window').width / 4.6),
                y: verticalScale(SCREEN_HEIGHT/3)
              },
              useNativeDriver: true
            }
          ),
          Animated.timing(
            moveTitle2,
            {
              toValue: {
                x: (-2*Dimensions.get('window').width / 4.6),
                y: verticalScale(-0)
              },
              useNativeDriver: true
            }
          ),
        ])
        .start(() => {
          setHasAnimationPlayedOnce(true); navigation.navigate('Zero')
        })
      }, 200)

    },[])
    
    const LogoText = () => {
      return (
          <Animated.Text style={{
            fontSize: 48,
            fontWeight: 500,
            color: '#f0c117',
            transform: [
              {translateX: moveTitle.x},
              {translateY: moveTitle.y},
              {translateY: moveTitle2.y},
              {translateX: moveTitle2.x},
              {scale: scaleTitle},
            ]
          }}>H M D ?</Animated.Text>
      )
    }

    return (
      <View style={{
      height: SCREEN_HEIGHT * 2,
      width: SCREEN_WIDTH 
      }}>
      <Animated.View style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'black',
        transform: [
          { translateY: startAnimation}
        ]
      }}>

        <Animated.View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>

        <LogoText />

        </Animated.View>

      </Animated.View>
      </View>
    );
  }
