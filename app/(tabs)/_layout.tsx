import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SplashScreen, Tabs } from 'expo-router';
import { TouchableOpacity, View, StyleSheet, Platform, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];
type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>['name'];
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

type IconProps = 
  | { theme: 'feather'; name: FeatherIconName; color: string }
  | { theme: 'material'; name: MaterialIconName; color: string }
  | { theme?: 'fontawesome'; name: FontAwesomeIconName; color: string };

/**
 * 아이콘을 탭바에 렌더링하기 위한 컴포넌트
 *
 * @param props - 사용할 아이콘 라이브러리와 이름, 색상 지정
 * @param props.theme - 아이콘 테마 ('feather', 'material', 'fontawesome'), 기본값은 'fontawesome'
 * @param props.name - 아이콘 이름 (각 라이브러리에 따라 다름)
 * @param props.color - 아이콘 색상
 *
 * @returns React 요소로 아이콘을 렌더링함
 */
export function TabBarIcon(props: IconProps) {
  if (props.theme === 'feather') {
    return <Feather size={24} style={{ marginBottom: -3 }} name={props.name} color={props.color} />;
  }
  if (props.theme === 'material') {
    return <MaterialIcons size={24} style={{ marginBottom: -3 }} name={props.name} color={props.color} />;
  }
  return <FontAwesome size={24} style={{ marginBottom: -3 }} name={props.name} color={props.color} />;
}

/**
 * 커스텀 탭 바 버튼 컴포넌트.
 * 
 * - 'Start' 라우트일 경우, 중앙에 뜨는 플로팅 버튼 형태로 렌더링됩니다.
 * - 그 외 라우트는 기본 `TouchableOpacity` 버튼으로 렌더링됩니다.
 * 
 * @param {object} props - 탭 바 버튼에 전달되는 props.
 * @param {string} props.routeName - 현재 라우트 이름.
 * @param {() => void} props.onPress - 버튼이 눌렸을 때 실행되는 콜백.
 * @param {object} props.accessibilityState - 접근성 상태 객체.
 * @param {string} [props.accessibilityLabel] - 접근성 라벨.
 * @param {string} [props.testID] - 테스트 식별자.
 * @param {number} [props.delayLongPress] - 롱프레스 딜레이(ms).
 * @param {object} [props.style] - 커스텀 스타일.
 * 
 * @returns {JSX.Element} 탭 버튼 UI.
 */
function CustomTabBarButton(props: any & { routeName: string }) {
  const { routeName, ...restProps } = props;
  const { onPress, accessibilityState, accessibilityLabel, testID, delayLongPress, style } = restProps;

  if (routeName === 'Start') {
    return (
      <View style={styles.floatingButtonWrapper} pointerEvents="box-none">
        <TouchableOpacity
          onPress={onPress}
          accessibilityState={accessibilityState}
          accessibilityLabel={accessibilityLabel}
          testID={testID}
          delayLongPress={delayLongPress ?? undefined}
          style={[style, styles.floatingButton]}
          activeOpacity={0.7}
        >
          <FontAwesome name="play-circle" size={32} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return <TouchableOpacity {...(restProps as React.ComponentProps<typeof TouchableOpacity>)} />;
}

// 탭 레벨의 스플래시 제어는 제거하여 온보딩으로 자연 전환
// SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  // 탭 로드 지연 제거

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerTitleAlign: 'left',
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        tabBarButton: (props) => <CustomTabBarButton {...props} routeName={route.name} />
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: '#353743' },
          headerTintColor: '#fff',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 32, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ color: '#567cf9', fontSize: 12, fontWeight: '500' }}>Pro</Text>
              </View>
              <Feather name="bell" size={24} color="#fff" />
            </View>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} theme="feather" />, 
        }}
      />
      <Tabs.Screen
        name="Mywork"
        options={{
          title: '나의 운동',
          tabBarIcon: ({ color }) => <TabBarIcon name="fitness-center" color={color} theme="material" />,
        }}
      />
      <Tabs.Screen
        name="Start"
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          title: '운동 시작',
          headerLeft: () =>
            navigation.canGoBack() ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <TabBarIcon name="chevron-left" color="black" theme="feather" />
              </TouchableOpacity>
            ) : undefined,
        })}
      />
      <Tabs.Screen
        name="Community"
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} theme="feather" />,
        }}
      />
      <Tabs.Screen
        name="Menu"
        options={{
          title: '전체',
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} theme="feather" />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingButtonWrapper: {
    position: 'absolute',
    left: '50%',
    marginLeft: -30,
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    zIndex: 1,
  },
  floatingButton: {
    backgroundColor: '#3478f6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
