# MINDSPARK – Google Play र App Store मा प्रकाशन गर्ने गाइड (सरल नेपाली)

## ⚠️ पहिले यी कुरा बुझ्नुहोस्
- म (Claude) तपाईंको तर्फबाट खाता खोल्न, पैसा तिर्न वा app सबमिट गर्न सक्दिनँ। ती क्लिकहरू तपाईंले नै गर्नुपर्छ। म ठ्याक्कै के गर्ने भनेर बताउँछु।
- **पूर्ण निःशुल्क छैन:** Google Play Developer खाता एक पटक करिब **$25** र Apple Developer Program वार्षिक **$99** लाग्छ। यी दुवै अनिवार्य छन्। **तपाईंको स्पष्ट अनुमतिबिना केही किन्ने छैन।**
- कुनै पनि स्टोरले approve गरेको पुष्टि नभएसम्म "approved" भनिने छैन।
- यो कोड अहिलेसम्म फोनमा परीक्षण भएको छैन (मेरो वातावरणमा इन्टरनेट छैन)। तलको Step 2 मा तपाईंले परीक्षण गर्ने हो।

## निःशुल्क खाताहरू (पहिले यी बनाउनुहोस्)
1. **GitHub** (github.com) – privacy policy पेज निःशुल्क होस्ट गर्न।
2. **Expo** (expo.dev) – app बनाउने (build) सेवा। निःशुल्क योजनामा सीमित build हुन्छ र कुर्नुपर्न सक्छ।
3. **Node.js** (nodejs.org) – आफ्नो कम्प्युटरमा "LTS" संस्करण install गर्नुहोस्।

## Step 1 – कम्प्युटरमा app चलाउने
1. यो फोल्डर कम्प्युटरमा खोल्नुहोस्। Terminal (Windows: Command Prompt) यही फोल्डरमा खोल्नुहोस्।
2. लेख्नुहोस्: `npm install` अनि `npx expo install --fix` (यसले ठीक संस्करण मिलाउँछ)।
3. लेख्नुहोस्: `npx expo start`
4. फोनमा **Expo Go** app (निःशुल्क) install गरी QR code स्क्यान गर्नुहोस्।

## Step 2 – परीक्षण (Android र iPhone दुवै)
- गृह पेज, तीनवटै खेल, नेपाली/English, dark/light, Reset बटन चलाएर हेर्नुहोस्।
- केही गडबड भए स्क्रिनसट पठाउनुहोस्, म ठीक गर्छु।

## Step 3 – privacy policy अनलाइन राख्ने (निःशुल्क)
1. GitHub मा `mindspark` नामको public repository बनाउनुहोस्।
2. `docs` फोल्डरका तीन फाइल (privacy-policy.md, account-deletion.md, support.md) upload गर्नुहोस्।
3. Settings → Pages → Branch `main` / folder `/docs` छान्नुहोस्। तपाईंको लिंक बन्छ।
4. फाइलभित्र `[YOUR SUPPORT EMAIL]` र `[DATE]` आफ्नो इमेल र मितिले बदल्नुहोस्।

## Step 4 – Google Play (Android)
1. **पैसा तिर्नुअघि मलाई सोध्नुहोस्।** अनुमति दिएपछि play.google.com/console मा Developer खाता खोल्नुहोस् ($25, एक पटक) र परिचय प्रमाणित गर्नुहोस्।
2. Terminal मा: `npm install -g eas-cli`, `eas login`, `eas init`
3. `eas build -p android --profile production` → यसले **.aab** फाइल बनाउँछ।
4. Play Console मा "Create app" → नाम MINDSPARK, भाषा, Game, Free।
5. Store listing (`docs/STORE_LISTING.md` बाट copy), screenshots, privacy policy लिंक, Data safety (डेटा सङ्कलन छैन), Content rating भर्नुहोस्।
6. पहिलो पटक .aab फाइल Play Console मा **हातैले upload** गर्नुपर्छ (Internal testing)। त्यसपछि मात्र `eas submit` चल्छ।
7. नयाँ व्यक्तिगत खातामा Production अघि **Closed testing** आवश्यक पर्न सक्छ (हाल १२ परीक्षक, १४ दिन भनिएको छ – Play Console मा आजको नियम जाँच्नुहोस्)।
8. Review को लागि पठाउनुहोस्। नतिजा Play Console मा आउँछ।

## Step 5 – App Store (iPhone/iPad)
1. **पैसा तिर्नुअघि मलाई सोध्नुहोस्।** अनुमति दिएपछि developer.apple.com/programs मा Apple Developer Program ($99/वर्ष) मा दर्ता गर्नुहोस्। Apple ID मा two-factor चाहिन्छ। Mac चाहिँदैन।
2. appstoreconnect.apple.com → My Apps → "+" → New App: नाम MINDSPARK, Bundle ID `com.mindspark.game`।
3. `eas build -p ios --profile production` (EAS ले certificate आफै बनाउँछ; Apple लगइन सोध्छ)।
4. App Store Connect को App ID `eas.json` मा `ascAppId` मा राख्नुहोस्, अनि `eas submit -p ios --profile production`
5. Listing, screenshots (iPhone र iPad), Privacy Policy URL, App Privacy ("डेटा सङ्कलन छैन"), age rating भर्नुहोस्।
6. TestFlight बाट परीक्षण गरेपछि "Submit for Review" थिच्नुहोस्।

## Final Checklist
- [ ] Step 1–2 मा फोनमा परीक्षण भयो
- [ ] Privacy policy, support, account-deletion लिंक चल्छन्
- [ ] मेरो अनुमतिपछि Google Play खाता खुल्यो
- [ ] मेरो अनुमतिपछि Apple Developer खाता खुल्यो
- [ ] Android .aab बन्यो र upload भयो
- [ ] iOS .ipa बन्यो र upload भयो
- [ ] Screenshots तयार (असली फोन/simulator बाट)
- [ ] Google Play review: ______ (पुष्टि नभएसम्म "पर्खँदै")
- [ ] App Store review: ______ (पुष्टि नभएसम्म "पर्खँदै")
