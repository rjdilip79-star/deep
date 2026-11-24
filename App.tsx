import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, Switch, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GAMES, Lang } from './src/data';
import { EXTRA } from './src/strings';
import { Provider, Screen, Btn, Back, ResultCard, useApp, useAward, panel, ACH, INIT, St } from './src/core';
import MemoryRush from './src/games/MemoryRush';
import SpeedBrain from './src/games/SpeedBrain';
import ImagineLab from './src/games/ImagineLab';
import Daily from './src/games/Daily';

const lvl = (xp: number) => ({ l: Math.floor(xp / 100) + 1, p: xp % 100 });

function GameCard({ ic, c, name, desc, onPress }: { ic: string; c: string; name: string; desc: string; onPress: () => void }) {
  const { c: p, fx } = useApp();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={() => { fx('tap'); onPress(); }}
      style={({ pressed }) => [st.card, { borderColor: c, backgroundColor: c + '33', shadowColor: c, transform: [{ scale: pressed ? 0.96 : 1 }] }]}>
      <Text style={{ fontSize: 30 }}>{ic}</Text>
      <Text style={{ color: p.tx, fontWeight: '800', marginTop: 6 }}>{name}</Text>
      <Text style={{ color: p.mu, fontSize: 12 }}>{desc}</Text>
    </Pressable>
  );
}

function Home({ navigation }: any) {
  const { s, t, L, c } = useApp(); const { l, p } = lvl(s.xp);
  const doneToday = s.dailyDate === new Date().toDateString();
  return (
    <Screen>
      <View style={panel(c)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={[st.av, { backgroundColor: c.ac }]}><Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>{(s.name || 'P')[0].toUpperCase()}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: c.mu }}>{t('hi')}</Text>
            <Text style={{ color: c.tx, fontSize: 22, fontWeight: '800' }}>{s.name}</Text>
          </View>
        </View>
        <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: p }} style={[st.bar, { backgroundColor: c.bd }]}><View style={{ height: 10, width: `${p}%`, backgroundColor: c.ac }} /></View>
        <Text style={{ color: c.mu, fontSize: 12 }}>{p}/100 {t('xp')}</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          {([[s.xp, t('xp')], [l, t('level')], ['🔥 ' + s.streak, t('streak')]] as [string | number, string][]).map(([v, k], i) => (
            <View key={i} style={[st.stat, { borderColor: c.bd }]}><Text style={{ color: c.tx, fontSize: 20, fontWeight: '800' }}>{v}</Text><Text style={{ color: c.mu, fontSize: 12 }}>{k}</Text></View>
          ))}
        </View>
      </View>
      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Daily')} style={[panel(c), { marginTop: 14, borderColor: doneToday ? c.ok : c.ac2 }]}>
        <Text style={{ color: c.tx, fontWeight: '800' }}>🌅 {t('daily')}</Text>
        <Text style={{ color: doneToday ? c.ok : c.mu }}>{doneToday ? t('dailyDone') : t('dailyReady')}</Text>
      </Pressable>
      <Text style={[st.h2, { color: c.tx }]}>{t('games')}</Text>
      <View style={st.grid}>
        {GAMES.map(g => <GameCard key={g.id} ic={g.ic} c={g.c} name={L(g.n)} desc={L(g.d)} onPress={() => navigation.navigate('Quiz', { id: g.id })} />)}
        {EXTRA.map(e => <GameCard key={e.route} ic={e.ic} c={e.c} name={L(e.n)} desc={L(e.d)} onPress={() => navigation.navigate(e.route)} />)}
      </View>
    </Screen>
  );
}

function Quiz({ route, navigation }: any) {
  const { t, L, c, fx } = useApp(); const award = useAward();
  const g = GAMES.find(x => x.id === route.params?.id);
  const [i, setI] = useState(0); const [sc, setSc] = useState(0); const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState(false); const [xp, setXp] = useState(0); const [fresh, setFresh] = useState<string[]>([]);
  if (!g) return <Screen><Back onPress={() => navigation.goBack()} /><Text style={{ color: c.bad }}>{t('notFound')}</Text></Screen>;
  const q = g.qs[i]; const n = g.qs.length;
  const finish = () => { const x = sc * 10 + (sc === n ? 20 : 0); setXp(x); setFresh(award(x, sc === n)); setDone(true); fx('win'); };
  const restart = () => { setI(0); setSc(0); setPick(null); setDone(false); setFresh([]); };
  return (
    <Screen>
      <Back onPress={() => navigation.goBack()} />
      {done ? (
        <ResultCard title={L(g.n)} big={`${sc}/${n}`} lines={[`${t('earned')}: +${xp}`]} tip={L(g.tip)} fresh={fresh} onAgain={restart} onBack={() => navigation.goBack()} />
      ) : (
        <View style={panel(c)}>
          <Text style={{ color: c.mu }}>{L(g.n)} · {t('q')} {i + 1}/{n}</Text>
          <View style={[st.bar, { backgroundColor: c.bd }]}><View style={{ height: 10, width: `${(i / n) * 100}%`, backgroundColor: c.ac2 }} /></View>
          <Text accessibilityRole="header" style={{ color: c.tx, fontSize: 22, fontWeight: '800', marginVertical: 10 }}>{L(q.q)}</Text>
          {q.o.map((o, k) => {
            const col = pick === null ? c.bd : k === q.a ? c.ok : k === pick ? c.bad : c.bd;
            return <Pressable key={k} disabled={pick !== null} accessibilityRole="button" onPress={() => { setPick(k); const ok = k === q.a; if (ok) setSc(x => x + 1); fx(ok ? 'ok' : 'bad'); }}
              style={{ borderWidth: 2, borderColor: col, borderRadius: 14, padding: 14, marginTop: 10 }}><Text style={{ color: c.tx, fontSize: 16 }}>{L(o)}</Text></Pressable>;
          })}
          {pick !== null && (
            <View accessibilityLiveRegion="polite" style={{ marginTop: 12 }}>
              <Text style={{ color: c.tx, fontWeight: '800' }}>{pick === q.a ? t('right') : t('wrong')}</Text>
              <Text style={{ color: c.mu }}>{L(q.e)}</Text>
              <Btn label={i + 1 < n ? t('next') : t('finish')} onPress={() => (i + 1 < n ? (setI(i + 1), setPick(null)) : finish())} />
            </View>
          )}
        </View>
      )}
    </Screen>
  );
}

function Awards() {
  const { s, L, t, c } = useApp();
  const bests: [string, number | undefined][] = [['🧠 Memory Rush', s.best.memory], ['🎨 Imagine Lab', s.best.imagine], ['⚡ Speed Brain', s.best.speed]];
  return (
    <Screen>
      <View style={panel(c)}>
        <Text style={{ color: c.tx, fontWeight: '800' }}>{t('progress')}</Text>
        {bests.map(([n, v]) => <Text key={n} style={{ color: c.mu, marginTop: 4 }}>{n}: {v ?? '–'}</Text>)}
      </View>
      <Text style={[st.h2, { color: c.tx }]}>{t('ach')}</Text>
      {s.ach.length === 0 && <Text style={{ color: c.mu, marginBottom: 6 }}>{t('noAch')}</Text>}
      {ACH.map(a => { const u = s.ach.includes(a.id); return (
        <View key={a.id} style={[panel(c), { opacity: u ? 1 : 0.45, marginTop: 10, flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
          <Text style={{ fontSize: 28 }}>{u ? a.ic : '🔒'}</Text>
          <View style={{ flex: 1 }}><Text style={{ color: c.tx, fontWeight: '800' }}>{L(a.n)}</Text><Text style={{ color: c.mu }}>{L(a.d)}</Text></View>
        </View>); })}
    </Screen>
  );
}

function Settings() {
  const { s, set, t, c, fx } = useApp();
  const seg = (items: [string, string][], cur: string, on: (v: string) => void) => (
    <View style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>{items.map(([v, l]) => (
      <Pressable key={v} accessibilityRole="button" accessibilityState={{ selected: cur === v }} onPress={() => on(v)}
        style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, borderColor: c.bd, backgroundColor: cur === v ? c.ac : c.card }}>
        <Text style={{ color: cur === v ? '#fff' : c.tx }}>{l}</Text></Pressable>))}</View>);
  const sw = (label: string, v: boolean, on: (b: boolean) => void) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
      <Text style={{ color: c.tx }}>{label}</Text><Switch accessibilityLabel={label} value={v} onValueChange={on} trackColor={{ true: c.ac, false: c.bd }} /></View>);
  return (
    <Screen>
      <View style={panel(c)}>
        <Text style={{ color: c.tx }}>{t('name')}</Text>
        <TextInput accessibilityLabel={t('name')} value={s.name} maxLength={16} onChangeText={v => set(p => ({ ...p, name: v }))} style={{ color: c.tx, borderWidth: 1, borderColor: c.bd, borderRadius: 10, padding: 10, marginTop: 6 }} />
        <View style={{ marginTop: 16 }}><Text style={{ color: c.tx }}>{t('lang')}</Text>{seg([['en', 'English'], ['ne', 'नेपाली']], s.lang, v => set(p => ({ ...p, lang: v as Lang })))}</View>
        <View style={{ marginTop: 16 }}><Text style={{ color: c.tx }}>{t('theme')}</Text>{seg([['auto', 'Auto'], ['dark', t('dark')], ['light', t('light')]], s.theme, v => set(p => ({ ...p, theme: v as St['theme'] })))}</View>
        {sw(t('sound'), s.sound, b => { set(p => ({ ...p, sound: b })); })}
        {sw(t('haptics'), s.haptics, b => { set(p => ({ ...p, haptics: b })); })}
        <Btn ghost label={t('reset')} onPress={() => Alert.alert(t('reset'), t('sure'), [{ text: t('cancel'), style: 'cancel' }, { text: t('ok'), style: 'destructive', onPress: () => set(p => ({ ...INIT, lang: p.lang, theme: p.theme, sound: p.sound, haptics: p.haptics })) }])} />
      </View>
    </Screen>
  );
}

const Tab = createBottomTabNavigator(); const Stack = createNativeStackNavigator();
function Tabs() {
  const { t, c } = useApp();
  const ic = (e: string) => () => <Text style={{ fontSize: 18 }}>{e}</Text>;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: c.bg, borderTopColor: c.bd }, tabBarActiveTintColor: c.ac2, tabBarInactiveTintColor: c.mu }}>
      <Tab.Screen name="Home" component={Home} options={{ title: t('home'), tabBarIcon: ic('🏠') }} />
      <Tab.Screen name="Daily" component={Daily} options={{ title: t('daily'), tabBarIcon: ic('🌅') }} />
      <Tab.Screen name="Awards" component={Awards} options={{ title: t('awards'), tabBarIcon: ic('🏆') }} />
      <Tab.Screen name="Settings" component={Settings} options={{ title: t('settings'), tabBarIcon: ic('⚙️') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Memory" component={MemoryRush} />
            <Stack.Screen name="Imagine" component={ImagineLab} />
            <Stack.Screen name="Speed" component={SpeedBrain} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const st = StyleSheet.create({
  av: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  bar: { height: 10, borderRadius: 8, marginTop: 10, marginBottom: 4, overflow: 'hidden' },
  stat: { flex: 1, alignItems: 'center', padding: 8, borderRadius: 14, borderWidth: 1 },
  h2: { fontSize: 18, fontWeight: '800', marginTop: 20, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '47.5%', minHeight: 130, borderWidth: 1, borderRadius: 20, padding: 14, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
});
