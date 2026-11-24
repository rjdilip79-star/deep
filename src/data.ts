export type Lang='en'|'ne';
export const GAMES=[
{id:'pattern',ic:'🔷',c:'#27d3ff',n:['Pattern Mystery','प्याटर्न रहस्य'],d:['Find the next number','अर्को संख्या पत्ता लगाउनुहोस्'],tip:['Look for the number pattern.','संख्याको क्रम हेर्नुहोस्।'],qs:[
{q:['2, 4, 8, 16, ?','२, ४, ८, १६, ?'],o:['24','30','32','34'],a:2,e:['Each number doubles.','हरेक संख्या दोब्बर हुन्छ।']},
{q:['1, 4, 9, 16, ?','१, ४, ९, १६, ?'],o:['20','25','24','36'],a:1,e:['These are square numbers.','यी वर्ग संख्याहरू हुन्।']},
{q:['3, 6, 9, 12, ?','३, ६, ९, १२, ?'],o:['14','15','16','18'],a:1,e:['Add three each time.','हरेक पटक तीन जोड्नुहोस्।']}]},
{id:'connect',ic:'🔗',c:'#ff5fd2',n:['Crazy Connections','पागल सम्बन्ध'],d:['Find common links','साझा सम्बन्ध खोज्नुहोस्'],tip:['Think of words with more than one meaning.','धेरै अर्थ भएका शब्द सोच्नुहोस्।'],qs:[
{q:['Piano and lock both have…','पियानो र तालामा के हुन्छ?'],o:['Keys','Wings','Wheels','Leaves'],a:0,e:['Both have keys.','दुवैमा कुञ्जी हुन्छ।']},
{q:['Tree and bank both have…','रूख र बैंकमा के हुन्छ?'],o:['Roots','Branches','Money','Fruit'],a:1,e:['Both have branches.','दुवैका शाखा हुन्छन्।']},
{q:['Book and tree both have…','किताब र रूखमा के हुन्छ?'],o:['Leaves','Ink','Wheels','Engines'],a:0,e:['Book pages are also called leaves.','किताबका पानालाई leaves पनि भनिन्छ।']}]},
{id:'logic',ic:'🧩',c:'#ffb020',n:['Logic Escape','तर्क खेल'],d:['Solve the clues','सङ्केत हल गर्नुहोस्'],tip:['Read each clue carefully.','हरेक सङ्केत ध्यान दिएर पढ्नुहोस्।'],qs:[
{q:['All cats are animals. Mimi is a cat. Mimi is…','सबै बिराला जनावर हुन्। मिमी बिराली हो। मिमी…'],o:['An animal','A plant','A bird','A fish'],a:0,e:['Mimi is an animal.','मिमी जनावर हो।']},
{q:['Ram is taller than Sita. Sita is taller than Hari. Shortest?','राम सीताभन्दा अग्लो, सीता हरिभन्दा अग्ली। होचो?'],o:['Ram','Sita','Hari','Same'],a:2,e:['Hari is shortest.','हरि सबैभन्दा होचो हो।']},
{q:['17 sheep. All but 9 run away. How many remain?','१७ भेडामध्ये ९ बाहेक सबै भागे। कति बाँकी?'],o:['8','9','17','0'],a:1,e:['Nine remain.','९ वटा बाँकी रहे।']}]}
] as const;