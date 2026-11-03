/* ==========================================================================
   TAMIL BUDDY — ALL LEARNING CONTENT LIVES IN THIS FILE
   --------------------------------------------------------------------------
   How to edit safely:
   • Change "romanized", "english", "context" etc. freely.
   • NEVER change an "id" once people have used the app — progress is saved
     against ids. To remove a phrase, also remove its id from any lesson.
   • "region": "general" | "sri-lanka" | "jaffna" | "india" | "formal"
   • "check": a note saying what still needs a native speaker to confirm.
     Delete the "check" line once a fluent Sri Lankan Tamil speaker has
     confirmed the phrase. It shows as "Needs a native check" in the app.
   • "group": phrases with the same group mean nearly the same thing, so
     the quiz never offers one as a wrong answer for the other.
   • Spelling system: aa / ee / oo = long vowels, th / dh = soft "teeth"
     sounds, zh = curled-tongue sound. See "soundGuide" at the bottom.
   ========================================================================== */
window.TB_DATA = {
  categories: [
    { id: "essential", name: "Essential" },
    { id: "greetings", name: "Greetings & politeness" },
    { id: "understanding", name: "Understanding people" },
    { id: "questions", name: "Asking questions" },
    { id: "food", name: "Food & drinks" },
    { id: "shopping", name: "Shopping & prices" },
    { id: "transport", name: "Transport & directions" },
    { id: "accommodation", name: "Accommodation" },
    { id: "meeting", name: "Meeting people" },
    { id: "numbers", name: "Numbers & quantities" },
    { id: "time", name: "Time & dates" },
    { id: "help", name: "Problems & emergencies" },
    { id: "natural", name: "Natural expressions" }
  ],

  // Shown on the home screen and at the top of the phrasebook
  essential: ["g01", "g02", "g04", "g05", "c08", "c10", "c09", "s01", "q11", "h02", "f03", "g07"],

  phrases: [
    // ---------- Greetings & politeness ----------
    { id: "g01", romanized: "Vanakkam", english: "Hello / greetings", tamil: "வணக்கம்", categories: ["greetings", "essential"], pronunciation: "va-nak-kam", context: "Respectful hello for any time of day, often with palms pressed together. Also used as a formal goodbye.", region: "general", group: "hello" },
    { id: "g02", romanized: "Nandri", english: "Thank you", tamil: "நன்றி", categories: ["greetings", "essential"], pronunciation: "nun-dri", context: "People thank each other less for small everyday things than English speakers do — a smile is often enough.", region: "general", group: "thanks" },
    { id: "g03", romanized: "Mikka nandri", english: "Thank you very much", tamil: "மிக்க நன்றி", categories: ["greetings"], pronunciation: "mik-ka nun-dri", context: "Warm, slightly formal thanks.", region: "general", variants: ["Romba nandri (Indian Tamil)"], group: "thanks", check: "Confirm this is the most natural everyday 'thanks a lot' in Sri Lanka." },
    { id: "g04", romanized: "Om", english: "Yes", tamil: "ஓம்", categories: ["greetings", "essential"], pronunciation: "ohm (long o)", context: "The everyday Sri Lankan Tamil 'yes'. Indian Tamil says 'aamaa', which Sri Lankans also understand.", region: "sri-lanka", variants: ["Aamaa (Indian Tamil)"], group: "yes" },
    { id: "g05", romanized: "Illai", english: "No / there isn't", tamil: "இல்லை", categories: ["greetings", "essential"], pronunciation: "il-lai (rhymes with 'eye'); often shortened to 'illa'", context: "Means both 'no' and 'there isn't any'.", region: "general", variants: ["Illa"], group: "no" },
    { id: "g06", romanized: "Sari", english: "OK / alright", tamil: "சரி", categories: ["greetings", "essential"], pronunciation: "sa-ri", context: "Agreeing, or saying 'got it'.", region: "general", group: "ok" },
    { id: "g07", romanized: "Mannikkavum", english: "Sorry / excuse me", tamil: "மன்னிக்கவும்", categories: ["greetings", "essential"], pronunciation: "man-nik-ka-vum", context: "Polite and a little formal. Many people simply say 'sorry' in English.", region: "formal" },
    { id: "g08", romanized: "Paravaayillai", english: "Never mind / it's fine", tamil: "பரவாயில்லை", categories: ["greetings", "natural"], pronunciation: "pa-ra-vaa-yil-lai", context: "Reply when someone apologises, or to say something doesn't matter.", region: "general", group: "noproblem" },
    { id: "g09", romanized: "Poyittu vaaren", english: "Goodbye (said when you leave)", tamil: "போயிட்டு வாறேன்", categories: ["greetings"], pronunciation: "poy-it-tu vaa-ren", context: "Literally 'I'll go and come back'. Tamils avoid simply saying 'I'm going'.", region: "general", variants: ["Poittu vaaren"], group: "bye", check: "Confirm the usual Jaffna ending (vaaren / vaaran)." },
    { id: "g10", romanized: "Poyittu vaanga", english: "Goodbye (reply to someone leaving)", tamil: "போயிட்டு வாங்க", categories: ["greetings"], pronunciation: "poy-it-tu vaan-ga", context: "Literally 'go and come back'.", region: "general", variants: ["Poyittu vaango (Sri Lankan, especially Jaffna)"], group: "bye" },
    { id: "g11", romanized: "Vaanga", english: "Come in / welcome", tamil: "வாங்க", categories: ["greetings"], pronunciation: "vaan-ga", context: "What a host or shopkeeper says to welcome you.", region: "general", variants: ["Vaango (Sri Lankan, especially Jaffna)"] },

    // ---------- Essential conversation ----------
    { id: "c01", romanized: "Eppadi irukkeenga?", english: "How are you?", tamil: "எப்படி இருக்கீங்க?", categories: ["greetings", "essential"], pronunciation: "ep-pa-di i-ruk-keen-ga", context: "Polite 'how are you' for anyone.", region: "general", group: "howareyou" },
    { id: "c02", romanized: "Sugamaa?", english: "Are you well?", tamil: "சுகமா?", categories: ["greetings"], pronunciation: "su-ga-maa", context: "Very common in Sri Lanka. Reply 'Sugam' (I'm well).", region: "sri-lanka", group: "howareyou" },
    { id: "c03", romanized: "Naan nallaa irukkiren", english: "I'm fine", tamil: "நான் நல்லா இருக்கிறேன்", categories: ["greetings"], pronunciation: "naan nal-laa i-ruk-ki-ren", context: "Shorter: 'Nallaa irukken'.", region: "general", variants: ["Nallaa irukken"], check: "Confirm the common Jaffna verb ending." },
    { id: "c04", romanized: "Neenga?", english: "And you?", tamil: "நீங்க?", categories: ["greetings"], pronunciation: "neen-ga", context: "'Neenga' is the polite 'you'. Use it with anyone you don't know well.", region: "general" },
    { id: "c05", romanized: "Ungada per enna?", english: "What's your name?", tamil: "உங்கட பேர் என்ன?", categories: ["meeting", "understanding"], pronunciation: "un-ga-da pair en-na", context: "'-ada' (of / your) is typical Sri Lankan Tamil.", region: "sri-lanka", variants: ["Unga per enna? (Indian Tamil)"] },
    { id: "c06", romanized: "En per ...", english: "My name is ...", tamil: "என் பேர் ...", categories: ["meeting"], pronunciation: "en pair", context: "Add your name: 'En per Sam'.", region: "general" },
    { id: "c07", romanized: "Vilangudhu", english: "I understand", tamil: "விளங்குது", categories: ["understanding"], pronunciation: "vi-lan-gu-dhu ('l' with tongue curled back)", context: "Sri Lankan word for 'it's clear / I get it'. Indian Tamil uses 'puriyudhu'.", region: "sri-lanka", variants: ["Puriyudhu (Indian Tamil)"] },
    { id: "c08", romanized: "Enakku vilangella", english: "I don't understand", tamil: "எனக்கு விளங்கேல்ல", categories: ["understanding", "essential", "help"], pronunciation: "e-nak-ku vi-lan-gel-la", context: "Sri Lankan form. The Indian 'enakku puriyala' is widely understood too.", region: "sri-lanka", variants: ["Enakku puriyala (Indian Tamil)"], check: "Confirm spelling of the Sri Lankan negative ending (-ella / -elai)." },
    { id: "c09", romanized: "Thirumba sollunga", english: "Please say that again", tamil: "திரும்ப சொல்லுங்க", categories: ["understanding", "essential", "help"], pronunciation: "thi-rum-ba sol-lun-ga", context: "Polite request. '-unga' makes it polite.", region: "general", variants: ["Thirumba sollungo (Sri Lankan, especially Jaffna)"] },
    { id: "c10", romanized: "Konjam methuvaa pesunga", english: "Please speak a little slowly", tamil: "கொஞ்சம் மெதுவா பேசுங்க", categories: ["understanding", "essential", "help"], pronunciation: "kon-jam me-thu-vaa pay-sun-ga", context: "The single most useful phrase for a learner.", region: "general" },
    { id: "c11", romanized: "Enakku Tamil konjam thaan theriyum", english: "I only know a little Tamil", tamil: "எனக்கு தமிழ் கொஞ்சம் தான் தெரியும்", categories: ["understanding"], pronunciation: "e-nak-ku ta-mizh kon-jam thaan the-ri-yum", context: "Sets expectations kindly — people will often slow down.", region: "general" },
    { id: "c12", romanized: "Theriyaadhu", english: "I don't know", tamil: "தெரியாது", categories: ["understanding"], pronunciation: "the-ri-yaa-dhu", context: "", region: "general" },
    { id: "c13", romanized: "English pesuveengalaa?", english: "Do you speak English?", tamil: "இங்கிலீஷ் பேசுவீங்களா?", categories: ["understanding", "help"], pronunciation: "ing-lish pay-su-veen-ga-laa", context: "Ending a sentence with '-aa' turns it into a yes/no question.", region: "general" },

    // ---------- Questions ----------
    { id: "q01", romanized: "Enna?", english: "What?", tamil: "என்ன?", categories: ["questions"], pronunciation: "en-na", context: "", region: "general" },
    { id: "q02", romanized: "Enga?", english: "Where?", tamil: "எங்க?", categories: ["questions"], pronunciation: "en-ga", context: "", region: "general", variants: ["Enge"], group: "where" },
    { id: "q03", romanized: "Aar?", english: "Who?", tamil: "ஆர்?", categories: ["questions"], pronunciation: "aar (long a)", context: "Sri Lankan form. Indian Tamil says 'yaar'.", region: "sri-lanka", variants: ["Yaar (Indian Tamil)"] },
    { id: "q04", romanized: "Eppa?", english: "When?", tamil: "எப்ப?", categories: ["questions", "time"], pronunciation: "ep-pa", context: "", region: "sri-lanka", variants: ["Eppo (Indian Tamil)"], check: "Confirm 'eppa' as the usual Sri Lankan spoken form." },
    { id: "q05", romanized: "Evvalavu?", english: "How much?", tamil: "எவ்வளவு?", categories: ["questions", "shopping"], pronunciation: "ev-va-la-vu", context: "", region: "general", group: "howmuch" },
    { id: "q06", romanized: "Edhu?", english: "Which one?", tamil: "எது?", categories: ["questions"], pronunciation: "e-dhu", context: "", region: "general" },
    { id: "q07", romanized: "Een?", english: "Why?", tamil: "ஏன்?", categories: ["questions"], pronunciation: "ayn (long e)", context: "", region: "general" },
    { id: "q08", romanized: "Eppadi?", english: "How?", tamil: "எப்படி?", categories: ["questions"], pronunciation: "ep-pa-di", context: "", region: "general" },
    { id: "q09", romanized: "Idhu enna?", english: "What is this?", tamil: "இது என்ன?", categories: ["questions", "shopping"], pronunciation: "i-dhu en-na", context: "Point and ask — great for learning food names.", region: "general" },
    { id: "q10", romanized: "... enga irukku?", english: "Where is ...?", tamil: "... எங்க இருக்கு?", categories: ["questions", "transport", "essential"], pronunciation: "en-ga i-ruk-ku", context: "Say the place first: 'Bank enga irukku?'", region: "general", group: "where" },
    { id: "q11", romanized: "Toilet enga irukku?", english: "Where is the toilet?", tamil: "டொய்லெட் எங்க இருக்கு?", categories: ["questions", "essential", "accommodation"], pronunciation: "toy-let en-ga i-ruk-ku", context: "The English word 'toilet' is normal in everyday Tamil.", region: "general" },
    { id: "q12", romanized: "Ethanai mani?", english: "What time is it?", tamil: "எத்தனை மணி?", categories: ["questions", "time"], pronunciation: "eth-tha-nai ma-ni", context: "Literally 'how many hours?'", region: "general", variants: ["Mani enna? (Indian Tamil)"], check: "Confirm this is the usual way to ask the time in Sri Lanka." },

    // ---------- Food & drinks ----------
    { id: "f01", romanized: "Thanni", english: "Water", tamil: "தண்ணி", categories: ["food"], pronunciation: "than-ni", context: "Everyday word. Formal: 'thanneer'.", region: "general" },
    { id: "f02", romanized: "Enakku ... venum", english: "I want / need ...", tamil: "எனக்கு ... வேணும்", categories: ["food", "shopping", "essential"], pronunciation: "e-nak-ku ... vay-num", context: "Put the thing in the middle: 'Enakku thanni venum'. Literally 'to me ... is needed'.", region: "general", group: "want" },
    { id: "f03", romanized: "Enakku thanni venum", english: "I'd like some water", tamil: "எனக்கு தண்ணி வேணும்", categories: ["food", "essential"], pronunciation: "e-nak-ku than-ni vay-num", context: "", region: "general" },
    { id: "f04", romanized: "Venaam", english: "I don't want it / no thanks", tamil: "வேணாம்", categories: ["food", "shopping"], pronunciation: "vay-naam", context: "Polite enough with a smile. Also spelled 'vendaam'.", region: "general", variants: ["Vendaam"], group: "no" },
    { id: "f05", romanized: "Saappaadu", english: "Food / a meal", tamil: "சாப்பாடு", categories: ["food"], pronunciation: "saap-paa-du", context: "", region: "general" },
    { id: "f06", romanized: "Soru", english: "Cooked rice", tamil: "சோறு", categories: ["food"], pronunciation: "soh-ru", context: "Rice and curry is the everyday meal.", region: "general" },
    { id: "f07", romanized: "Kari", english: "Curry", tamil: "கறி", categories: ["food"], pronunciation: "ka-ri", context: "", region: "general" },
    { id: "f08", romanized: "Theththanni", english: "Tea", tamil: "தேத்தண்ணி", categories: ["food"], pronunciation: "thayth-than-ni", context: "Sri Lankan word, literally 'tea-water'. 'Tea' in English is understood everywhere.", region: "sri-lanka", variants: ["Tea", "Theneer (formal)"], check: "Confirm usage and spelling in Jaffna." },
    { id: "f09", romanized: "Koppi", english: "Coffee", tamil: "கோப்பி", categories: ["food"], pronunciation: "kohp-pi", context: "", region: "sri-lanka", variants: ["Kaapi (Indian Tamil)"] },
    { id: "f10", romanized: "Paal", english: "Milk", tamil: "பால்", categories: ["food"], pronunciation: "paal", context: "", region: "general" },
    { id: "f11", romanized: "Seeni", english: "Sugar", tamil: "சீனி", categories: ["food"], pronunciation: "see-ni", context: "", region: "general" },
    { id: "f12", romanized: "Seeni venaam", english: "No sugar, please", tamil: "சீனி வேணாம்", categories: ["food"], pronunciation: "see-ni vay-naam", context: "Tea often comes very sweet — say this when ordering.", region: "general" },
    { id: "f13", romanized: "Uraippu", english: "Spicy (hot)", tamil: "உறைப்பு", categories: ["food"], pronunciation: "u-raip-pu", context: "Sri Lankan word. Indian Tamil says 'kaaram'.", region: "sri-lanka", variants: ["Kaaram (Indian Tamil)"] },
    { id: "f14", romanized: "Uraippu venaam", english: "Not spicy, please", tamil: "உறைப்பு வேணாம்", categories: ["food"], pronunciation: "u-raip-pu vay-naam", context: "", region: "sri-lanka" },
    { id: "f15", romanized: "Nallaa irukku", english: "It's good / it's tasty", tamil: "நல்லா இருக்கு", categories: ["food", "natural"], pronunciation: "nal-laa i-ruk-ku", context: "The natural way to praise food — or anything.", region: "general" },
    { id: "f16", romanized: "Saappitteengalaa?", english: "Have you eaten?", tamil: "சாப்பிட்டீங்களா?", categories: ["food", "understanding", "greetings"], pronunciation: "saap-pit-teen-ga-laa", context: "A friendly everyday greeting, not always an invitation. Answer: 'Om, saappitten'.", region: "general" },
    { id: "f17", romanized: "Om, saappitten", english: "Yes, I've eaten", tamil: "ஓம், சாப்பிட்டேன்", categories: ["food"], pronunciation: "ohm, saap-pit-ten", context: "", region: "sri-lanka" },
    { id: "f18", romanized: "Bill konduvaanga", english: "Please bring the bill", tamil: "பில் கொண்டு வாங்க", categories: ["food"], pronunciation: "bill kon-du-vaan-ga", context: "In small eating houses you usually pay at the counter instead.", region: "general", variants: ["Bill konduvaango (Sri Lankan)"] },
    { id: "f19", romanized: "Innum konjam", english: "A little more", tamil: "இன்னும் கொஞ்சம்", categories: ["food", "numbers"], pronunciation: "in-num kon-jam", context: "", region: "general" },
    { id: "f20", romanized: "Podhum", english: "That's enough", tamil: "போதும்", categories: ["food", "numbers"], pronunciation: "poh-dhum", context: "Useful when a host keeps serving you!", region: "general" },
    { id: "f21", romanized: "Naan iraichchi saappiduradhillai", english: "I don't eat meat", tamil: "நான் இறைச்சி சாப்பிடுறதில்லை", categories: ["food"], pronunciation: "naan i-raich-chi saap-pi-du-ra-dhil-lai", context: "'Iraichchi' is the Sri Lankan everyday word for meat.", region: "sri-lanka", check: "Confirm the natural spoken form of 'I don't eat ...'." },

    // ---------- Shopping ----------
    { id: "s01", romanized: "Idhu evvalavu?", english: "How much is this?", tamil: "இது எவ்வளவு?", categories: ["shopping", "essential"], pronunciation: "i-dhu ev-va-la-vu", context: "Point at the item.", region: "general", group: "howmuch" },
    { id: "s02", romanized: "Vilai kooda", english: "The price is too high", tamil: "விலை கூட", categories: ["shopping"], pronunciation: "vi-lai koo-da", context: "Say it gently and smile — bargaining is normal in markets, not in fixed-price shops.", region: "sri-lanka", variants: ["Vilai jaasthi (Indian Tamil)"], check: "Confirm naturalness in Sri Lanka." },
    { id: "s03", romanized: "Konjam kuraikka mudiyumaa?", english: "Can you lower the price a little?", tamil: "கொஞ்சம் குறைக்க முடியுமா?", categories: ["shopping"], pronunciation: "kon-jam ku-raik-ka mu-di-yu-maa", context: "", region: "general" },
    { id: "s04", romanized: "Vera ondu kaattunga", english: "Show me another one", tamil: "வேற ஒண்டு காட்டுங்க", categories: ["shopping"], pronunciation: "vay-ra on-du kaat-tun-ga", context: "", region: "sri-lanka", variants: ["Vera onnu kaattunga (Indian Tamil)"], check: "Confirm 'ondu' (one) usage." },
    { id: "s05", romanized: "Idhu venum", english: "I want this one", tamil: "இது வேணும்", categories: ["shopping"], pronunciation: "i-dhu vay-num", context: "", region: "general" },
    { id: "s06", romanized: "Idhu venaam", english: "I don't want this one", tamil: "இது வேணாம்", categories: ["shopping"], pronunciation: "i-dhu vay-naam", context: "", region: "general" },
    { id: "s07", romanized: "Kaasu", english: "Money", tamil: "காசு", categories: ["shopping"], pronunciation: "kaa-su", context: "", region: "general", variants: ["Salli (Sri Lankan colloquial)"] },
    { id: "s08", romanized: "Rooba", english: "Rupees", tamil: "ரூபா", categories: ["shopping", "numbers"], pronunciation: "roo-baa", context: "Prices: 'nooru rooba' = 100 rupees.", region: "sri-lanka", variants: ["Rubaai (Indian Tamil)"] },
    { id: "s09", romanized: "Card edukkureengalaa?", english: "Do you take cards?", tamil: "கார்ட் எடுக்கிறீங்களா?", categories: ["shopping"], pronunciation: "kaard e-duk-ku-reen-ga-laa", context: "Many small shops are cash only.", region: "general", check: "Confirm natural phrasing." },
    { id: "s10", romanized: "Kadai", english: "Shop", tamil: "கடை", categories: ["shopping"], pronunciation: "ka-dai", context: "", region: "general" },

    // ---------- Transport & directions ----------
    { id: "t01", romanized: "Bus stand enga irukku?", english: "Where is the bus stand?", tamil: "பஸ் ஸ்டாண்ட் எங்க இருக்கு?", categories: ["transport"], pronunciation: "bus stand en-ga i-ruk-ku", context: "", region: "general" },
    { id: "t02", romanized: "Indha bus ...-kku pogumaa?", english: "Does this bus go to ...?", tamil: "இந்த பஸ் ...க்கு போகுமா?", categories: ["transport"], pronunciation: "in-dha bus ...k-ku poh-gu-maa", context: "Example: 'Indha bus Jaffna-kku pogumaa?' ('-kku' = to).", region: "general" },
    { id: "t03", romanized: "...-kku eppadi poradhu?", english: "How do I get to ...?", tamil: "...க்கு எப்படி போறது?", categories: ["transport"], pronunciation: "...k-ku ep-pa-di poh-ra-dhu", context: "", region: "general" },
    { id: "t04", romanized: "Kittavaa?", english: "Is it near?", tamil: "கிட்டவா?", categories: ["transport"], pronunciation: "kit-ta-vaa", context: "'Kitta' = near.", region: "sri-lanka", check: "Confirm usage." },
    { id: "t05", romanized: "Dooramaa?", english: "Is it far?", tamil: "தூரமா?", categories: ["transport"], pronunciation: "doo-ra-maa", context: "", region: "general" },
    { id: "t06", romanized: "Neraa ponga", english: "Go straight", tamil: "நேரா போங்க", categories: ["transport", "understanding"], pronunciation: "nay-raa pohn-ga", context: "You'll hear this when asking directions.", region: "general", variants: ["Neraa pongo (Sri Lankan)"] },
    { id: "t07", romanized: "Valadhu pakkam", english: "To the right", tamil: "வலது பக்கம்", categories: ["transport", "understanding"], pronunciation: "va-la-dhu pak-kam", context: "", region: "general", variants: ["Valappakkam"] },
    { id: "t08", romanized: "Idadhu pakkam", english: "To the left", tamil: "இடது பக்கம்", categories: ["transport", "understanding"], pronunciation: "i-da-dhu pak-kam", context: "", region: "general", variants: ["Idappakkam"] },
    { id: "t09", romanized: "Inga nirththunga", english: "Stop here, please", tamil: "இங்க நிறுத்துங்க", categories: ["transport"], pronunciation: "in-ga nirth-thun-ga", context: "To a bus conductor, tuk-tuk or taxi driver.", region: "general" },
    { id: "t10", romanized: "Inga", english: "Here", tamil: "இங்க", categories: ["transport"], pronunciation: "in-ga", context: "", region: "general" },
    { id: "t11", romanized: "Anga", english: "There", tamil: "அங்க", categories: ["transport"], pronunciation: "an-ga", context: "", region: "general" },

    // ---------- Accommodation ----------
    { id: "a01", romanized: "Room irukkaa?", english: "Do you have a room?", tamil: "ரூம் இருக்கா?", categories: ["accommodation"], pronunciation: "room i-ruk-kaa", context: "'Irukkaa?' = is there?", region: "general" },
    { id: "a02", romanized: "Oru naalukku evvalavu?", english: "How much for one night?", tamil: "ஒரு நாளுக்கு எவ்வளவு?", categories: ["accommodation", "shopping"], pronunciation: "o-ru naa-luk-ku ev-va-la-vu", context: "Literally 'how much for one day?'", region: "general" },
    { id: "a03", romanized: "Naan ...-la thangi irukkiren", english: "I'm staying at ...", tamil: "நான் ...ல தங்கி இருக்கிறேன்", categories: ["accommodation", "meeting"], pronunciation: "naan ...-la than-gi i-ruk-ki-ren", context: "Example: 'Naan hotel-la thangi irukkiren'.", region: "general", check: "Sri Lankan speech may use '-ilai' instead of '-la'; confirm." },
    { id: "a04", romanized: "Saavi", english: "Key", tamil: "சாவி", categories: ["accommodation"], pronunciation: "saa-vi", context: "", region: "general" },
    { id: "a05", romanized: "Current illai", english: "There's no electricity", tamil: "கரண்ட் இல்லை", categories: ["accommodation", "help"], pronunciation: "ka-rent il-lai", context: "'Current' is the everyday word for electricity.", region: "general" },

    // ---------- Meeting people ----------
    { id: "m01", romanized: "Neenga enga irundhu vaareenga?", english: "Where are you from?", tamil: "நீங்க எங்க இருந்து வாறீங்க?", categories: ["meeting", "understanding"], pronunciation: "neen-ga en-ga i-run-dhu vaa-reen-ga", context: "Literally 'where are you coming from?'", region: "general" },
    { id: "m02", romanized: "Naan ...-la irundhu vaaren", english: "I'm from ...", tamil: "நான் ...ல இருந்து வாறேன்", categories: ["meeting"], pronunciation: "naan ...-la i-run-dhu vaa-ren", context: "Example: 'Naan London-la irundhu vaaren'.", region: "general", check: "Confirm Sri Lankan form." },
    { id: "m03", romanized: "Kalyaanam aachchaa?", english: "Are you married?", tamil: "கல்யாணம் ஆச்சா?", categories: ["meeting", "understanding"], pronunciation: "kal-yaa-nam aach-chaa", context: "People may ask this soon after meeting you — it's friendly curiosity.", region: "general" },
    { id: "m04", romanized: "Pillaigal irukkaa?", english: "Do you have children?", tamil: "பிள்ளைகள் இருக்கா?", categories: ["meeting", "understanding"], pronunciation: "pil-lai-gal i-ruk-kaa", context: "", region: "general" },
    { id: "m05", romanized: "Ammaa", english: "Mother", tamil: "அம்மா", categories: ["meeting"], pronunciation: "am-maa", context: "Also a respectful way to address an older woman.", region: "general" },
    { id: "m06", romanized: "Appaa", english: "Father", tamil: "அப்பா", categories: ["meeting"], pronunciation: "ap-paa", context: "", region: "general" },
    { id: "m07", romanized: "Annaa", english: "Older brother", tamil: "அண்ணா", categories: ["meeting"], pronunciation: "an-naa", context: "Also a friendly way to address a man a little older than you — e.g. a tuk-tuk driver.", region: "general" },
    { id: "m08", romanized: "Akkaa", english: "Older sister", tamil: "அக்கா", categories: ["meeting"], pronunciation: "ak-kaa", context: "Also a friendly way to address a woman a little older than you.", region: "general" },
    { id: "m09", romanized: "Thambi", english: "Younger brother", tamil: "தம்பி", categories: ["meeting"], pronunciation: "tham-bi", context: "Also used for a younger man or boy.", region: "general" },
    { id: "m10", romanized: "Thangachchi", english: "Younger sister", tamil: "தங்கச்சி", categories: ["meeting"], pronunciation: "than-gach-chi", context: "", region: "general" },
    { id: "m11", romanized: "Enna vela seiyureenga?", english: "What work do you do?", tamil: "என்ன வேலை செய்யிறீங்க?", categories: ["meeting", "understanding"], pronunciation: "en-na vay-la sey-yu-reen-ga", context: "", region: "general" },
    { id: "m12", romanized: "Ungalai sandhichchadhu sandhosham", english: "Nice to meet you", tamil: "உங்களைச் சந்திச்சது சந்தோஷம்", categories: ["meeting"], pronunciation: "un-ga-lai san-dhich-cha-dhu san-dhoh-sham", context: "Polite and a bit formal — a warm 'Vanakkam' and a smile is just as common.", region: "formal", check: "Confirm how natural this sounds in casual Sri Lankan speech." },

    // ---------- Everyday & time ----------
    { id: "d01", romanized: "Konjam nillunga", english: "Wait a moment, please", tamil: "கொஞ்சம் நில்லுங்க", categories: ["time", "understanding"], pronunciation: "kon-jam nil-lun-ga", context: "Literally 'stand a little'.", region: "general", variants: ["Konjam irunga"], check: "Confirm which form is more usual in Sri Lanka." },
    { id: "d02", romanized: "Vaanga povom", english: "Let's go", tamil: "வாங்க போவோம்", categories: ["natural"], pronunciation: "vaan-ga poh-vohm", context: "", region: "general" },
    { id: "d03", romanized: "Indaikku", english: "Today", tamil: "இண்டைக்கு", categories: ["time"], pronunciation: "in-daik-ku", context: "Sri Lankan form.", region: "sri-lanka", variants: ["Innikku (Indian Tamil)"] },
    { id: "d04", romanized: "Naalaikku", english: "Tomorrow", tamil: "நாளைக்கு", categories: ["time"], pronunciation: "naa-laik-ku", context: "", region: "general" },
    { id: "d05", romanized: "Neththu", english: "Yesterday", tamil: "நேத்து", categories: ["time"], pronunciation: "nayth-thu", context: "", region: "general" },
    { id: "d06", romanized: "Ippa", english: "Now", tamil: "இப்ப", categories: ["time"], pronunciation: "ip-pa", context: "", region: "general" },
    { id: "d07", romanized: "Pirahu", english: "Later / after", tamil: "பிறகு", categories: ["time"], pronunciation: "pi-ra-hu", context: "", region: "general" },
    { id: "d09", romanized: "Enga poreenga?", english: "Where are you going?", tamil: "எங்க போறீங்க?", categories: ["understanding", "greetings"], pronunciation: "en-ga poh-reen-ga", context: "Often just a casual greeting, like 'how's it going?'", region: "general" },

    // ---------- Help & emergencies ----------
    { id: "h01", romanized: "Udhavi!", english: "Help!", tamil: "உதவி!", categories: ["help"], pronunciation: "u-dha-vi", context: "In a real emergency, call 119 (police) or 1990 (ambulance) in Sri Lanka.", region: "general", group: "help" },
    { id: "h02", romanized: "Udhavi seiyunga", english: "Please help me", tamil: "உதவி செய்யுங்க", categories: ["help", "essential"], pronunciation: "u-dha-vi sey-yun-ga", context: "", region: "general", variants: ["Udhavi pannunga (Indian Tamil)"], group: "help" },
    { id: "h03", romanized: "Doctor venum", english: "I need a doctor", tamil: "டொக்டர் வேணும்", categories: ["help"], pronunciation: "dok-tor vay-num", context: "", region: "general" },
    { id: "h04", romanized: "Aaspaththiri enga irukku?", english: "Where is the hospital?", tamil: "ஆஸ்பத்திரி எங்க இருக்கு?", categories: ["help", "transport"], pronunciation: "aas-path-thi-ri en-ga i-ruk-ku", context: "'Hospital' in English is also understood.", region: "general" },
    { id: "h05", romanized: "Police station enga irukku?", english: "Where is the police station?", tamil: "பொலிஸ் ஸ்டேஷன் எங்க இருக்கு?", categories: ["help", "transport"], pronunciation: "po-lees stay-shan en-ga i-ruk-ku", context: "", region: "general" },
    { id: "h06", romanized: "Enakku sugam illai", english: "I'm not well", tamil: "எனக்கு சுகம் இல்லை", categories: ["help"], pronunciation: "e-nak-ku su-gam il-lai", context: "", region: "sri-lanka", variants: ["Udambu sari illai (Indian Tamil)"] },
    { id: "h07", romanized: "Inga valikkudhu", english: "It hurts here", tamil: "இங்க வலிக்குது", categories: ["help"], pronunciation: "in-ga va-lik-ku-dhu", context: "Point to where it hurts.", region: "general" },
    { id: "h08", romanized: "Enakku vazhi theriyaadhu", english: "I don't know the way", tamil: "எனக்கு வழி தெரியாது", categories: ["help", "transport"], pronunciation: "e-nak-ku va-zhi the-ri-yaa-dhu", context: "Useful if you're lost.", region: "general" },
    { id: "h09", romanized: "Marundhu", english: "Medicine", tamil: "மருந்து", categories: ["help"], pronunciation: "ma-run-dhu", context: "", region: "general" },
    { id: "h10", romanized: "Phone pannalaamaa?", english: "Can I make a phone call?", tamil: "போன் பண்ணலாமா?", categories: ["help"], pronunciation: "fohn pan-na-laa-maa", context: "", region: "general" },

    // ---------- Numbers ----------
    { id: "n01", romanized: "Ondu", english: "One", tamil: "ஒண்டு", categories: ["numbers"], pronunciation: "on-du", context: "Sri Lankan spoken form. Before a noun use 'oru' (oru tea = one tea).", region: "sri-lanka", variants: ["Onnu (Indian Tamil)", "Ondru (formal)"], check: "Confirm spelling." },
    { id: "n02", romanized: "Rendu", english: "Two", tamil: "ரெண்டு", categories: ["numbers"], pronunciation: "ren-du", context: "", region: "general" },
    { id: "n03", romanized: "Moonu", english: "Three", tamil: "மூணு", categories: ["numbers"], pronunciation: "moo-nu", context: "", region: "general" },
    { id: "n04", romanized: "Naalu", english: "Four", tamil: "நாலு", categories: ["numbers"], pronunciation: "naa-lu", context: "", region: "general" },
    { id: "n05", romanized: "Anju", english: "Five", tamil: "அஞ்சு", categories: ["numbers"], pronunciation: "an-ju", context: "", region: "general" },
    { id: "n06", romanized: "Aaru", english: "Six", tamil: "ஆறு", categories: ["numbers"], pronunciation: "aa-ru", context: "", region: "general" },
    { id: "n07", romanized: "Ezhu", english: "Seven", tamil: "ஏழு", categories: ["numbers"], pronunciation: "ay-zhu (zh: tongue curled back)", context: "", region: "general" },
    { id: "n08", romanized: "Ettu", english: "Eight", tamil: "எட்டு", categories: ["numbers"], pronunciation: "et-tu", context: "", region: "general" },
    { id: "n09", romanized: "Onbadhu", english: "Nine", tamil: "ஒன்பது", categories: ["numbers"], pronunciation: "on-ba-dhu", context: "", region: "general" },
    { id: "n10", romanized: "Paththu", english: "Ten", tamil: "பத்து", categories: ["numbers"], pronunciation: "path-thu", context: "", region: "general" },
    { id: "n11", romanized: "Nooru", english: "One hundred", tamil: "நூறு", categories: ["numbers", "shopping"], pronunciation: "noo-ru", context: "", region: "general" },
    { id: "n12", romanized: "Aayiram", english: "One thousand", tamil: "ஆயிரம்", categories: ["numbers", "shopping"], pronunciation: "aa-yi-ram", context: "", region: "general" },
    { id: "n13", romanized: "Konjam", english: "A little / a bit", tamil: "கொஞ்சம்", categories: ["numbers", "natural"], pronunciation: "kon-jam", context: "Also softens requests: 'konjam ...' = 'please, a little ...'.", region: "general" },

    // ---------- Natural expressions ----------
    { id: "x01", romanized: "Aiyo!", english: "Oh no! / Oh dear!", tamil: "ஐயோ!", categories: ["natural"], pronunciation: "eye-yoh", context: "Surprise, sympathy or dismay — you'll hear it constantly.", region: "general" },
    { id: "x02", romanized: "Appadiyaa?", english: "Really? / Is that so?", tamil: "அப்படியா?", categories: ["natural"], pronunciation: "ap-pa-di-yaa", context: "", region: "general" },
    { id: "x03", romanized: "Summaa", english: "Just / for no reason", tamil: "சும்மா", categories: ["natural"], pronunciation: "sum-maa", context: "Answer to 'what are you doing?' — 'nothing much'.", region: "general" },
    { id: "x04", romanized: "Kanakka", english: "A lot / plenty", tamil: "கனக்க", categories: ["natural", "numbers"], pronunciation: "ka-nak-ka", context: "Sri Lankan (especially Jaffna) word.", region: "jaffna", check: "Confirm regional spread." },
    { id: "x05", romanized: "Aamaa", english: "Yes (Indian Tamil style)", tamil: "ஆமா", categories: ["natural"], pronunciation: "aa-maa", context: "Understood everywhere; Sri Lankans more often say 'Om'.", region: "india", group: "yes" },
    { id: "x06", romanized: "Nalladhu", english: "Good / that's good", tamil: "நல்லது", categories: ["natural"], pronunciation: "nal-la-dhu", context: "", region: "general" },
    { id: "x07", romanized: "Enna vishayam?", english: "What's up? / What's the matter?", tamil: "என்ன விஷயம்?", categories: ["natural", "understanding"], pronunciation: "en-na vi-sha-yam", context: "", region: "general" },
    { id: "x08", romanized: "Pirachchinai illai", english: "No problem", tamil: "பிரச்சினை இல்லை", categories: ["natural"], pronunciation: "pi-rach-chi-nai il-lai", context: "", region: "general", group: "noproblem" },
    { id: "x09", romanized: "Enna venum?", english: "What would you like?", tamil: "என்ன வேணும்?", categories: ["understanding", "shopping", "food"], pronunciation: "en-na vay-num", context: "What a shopkeeper or waiter asks you.", region: "general" },
    { id: "x10", romanized: "Vera edhaavadhu?", english: "Anything else?", tamil: "வேற ஏதாவது?", categories: ["understanding", "shopping", "food"], pronunciation: "vay-ra ay-dhaa-va-dhu", context: "Answer 'Podhum' (that's enough) or 'Illai, nandri'.", region: "general" }
  ],

  // Fill-in-the-blank items. "answer" must be the only option that fits the English.
  clozes: [
    { id: "cz01", phrase: "f03", text: "Enakku thanni ___", answer: "venum", options: ["venum", "enga", "nandri"] },
    { id: "cz02", phrase: "s01", text: "Idhu ___?", answer: "evvalavu", options: ["evvalavu", "illai", "vanakkam"] },
    { id: "cz03", phrase: "q11", text: "Toilet ___ irukku?", answer: "enga", options: ["enga", "venum", "nandri"] },
    { id: "cz04", phrase: "c10", text: "Konjam methuvaa ___", answer: "pesunga", options: ["pesunga", "irukku", "venum"] },
    { id: "cz05", phrase: "c05", text: "Ungada ___ enna?", answer: "per", options: ["per", "thanni", "kadai"] },
    { id: "cz06", phrase: "t09", text: "Inga ___", answer: "nirththunga", options: ["nirththunga", "saappaadu", "rendu"] },
    { id: "cz07", phrase: "c09", text: "Thirumba ___", answer: "sollunga", options: ["sollunga", "thanni", "kadai"] },
    { id: "cz08", phrase: "c03", text: "Naan nallaa ___", answer: "irukkiren", options: ["irukkiren", "venaam", "enga"] },
    { id: "cz09", phrase: "c11", text: "Enakku Tamil konjam thaan ___", answer: "theriyum", options: ["theriyum", "kadai", "enga"] },
    { id: "cz10", phrase: "g03", text: "Mikka ___", answer: "nandri", options: ["nandri", "enga", "thanni"] },
    { id: "cz11", phrase: "h03", text: "Doctor ___", answer: "venum", options: ["venum", "enga", "sari"] },
    { id: "cz12", phrase: "h04", text: "Aaspaththiri ___ irukku?", answer: "enga", options: ["enga", "venum", "nandri"] },
    { id: "cz13", phrase: "f12", text: "Seeni ___", answer: "venaam", options: ["venaam", "enga", "aar"] }
  ],

  // Short exchanges for "Understand a response" exercises
  dialogues: [
    { id: "dl01", lines: [["Shopkeeper", "Vaanga! Enna venum?"]], question: "What is the shopkeeper asking?", answer: "What would you like?", wrong: ["Where are you going?", "What's your name?", "Have you eaten?"], phrases: ["x09"] },
    { id: "dl02", lines: [["Neighbour", "Saappitteengalaa?"]], question: "What does your neighbour want to know?", answer: "Whether you have eaten", wrong: ["Where you are from", "How much something costs", "Whether you are married"], phrases: ["f16"] },
    { id: "dl03", lines: [["Neighbour", "Enga poreenga?"]], question: "What are they asking?", answer: "Where are you going?", wrong: ["What time is it?", "Do you speak English?", "Who is that?"], phrases: ["d09"] },
    { id: "dl04", lines: [["You", "Idhu evvalavu?"], ["Seller", "Aayiram rooba."]], question: "What is the price?", answer: "1,000 rupees", wrong: ["100 rupees", "10 rupees", "It's free"], phrases: ["s01", "n12"] },
    { id: "dl05", lines: [["You", "Toilet enga irukku?"], ["Waiter", "Neraa ponga, pirahu valadhu pakkam."]], question: "Where should you go?", answer: "Straight ahead, then to the right", wrong: ["Straight ahead, then to the left", "Back outside", "There isn't one"], phrases: ["t06", "t07"] },
    { id: "dl06", lines: [["New friend", "Ungada per enna?"]], question: "What do they want to know?", answer: "Your name", wrong: ["Your age", "Your job", "Where you are staying"], phrases: ["c05"] },
    { id: "dl07", lines: [["Waiter", "Vera edhaavadhu?"]], question: "What is the waiter asking?", answer: "Anything else?", wrong: ["Is it tasty?", "Do you want the bill?", "Is it too spicy?"], phrases: ["x10"] },
    { id: "dl08", lines: [["You", "Indha bus Jaffna-kku pogumaa?"], ["Conductor", "Illai."]], question: "What did the conductor say?", answer: "No, it doesn't go there", wrong: ["Yes, it goes there", "It's very far", "Please wait"], phrases: ["t02", "g05"] },
    { id: "dl09", lines: [["Aunty", "Kalyaanam aachchaa?"]], question: "What is she asking?", answer: "Are you married?", wrong: ["Are you hungry?", "Are you tired?", "Are you from here?"], phrases: ["m03"] },
    { id: "dl10", lines: [["You", "Kittavaa?"], ["Man", "Illai, dooram."]], question: "What did he tell you?", answer: "It isn't near — it's far", wrong: ["It's very close", "It's on the left", "He doesn't know"], phrases: ["t04", "t05"] },
    { id: "dl11", lines: [["Host", "Innum konjam?"], ["You", "Podhum, nandri!"]], question: "What did you just say?", answer: "That's enough, thank you!", wrong: ["Yes please, more!", "It's too spicy", "Where is the water?"], phrases: ["f19", "f20"] }
  ],

  units: [
    { id: "u01", title: "Your first Tamil words", lessons: [
      { id: "l0101", title: "Hello, yes and no", items: ["g01", "g02", "g04", "g05"] },
      { id: "l0102", title: "Being polite", items: ["g06", "g07", "g08", "g03"], cloze: ["cz10"] },
      { id: "l0103", title: "Arriving and leaving", items: ["g11", "g09", "g10", "g01"] } ] },
    { id: "u02", title: "Essential conversation", lessons: [
      { id: "l0201", title: "How are you?", items: ["c01", "c02", "c03", "c04"], cloze: ["cz08"] },
      { id: "l0202", title: "Names", items: ["c05", "c06", "c13", "c12"], cloze: ["cz05"], dialogues: ["dl06"] },
      { id: "l0203", title: "When you're lost for words", items: ["c07", "c08", "c09", "c10", "c11"], cloze: ["cz04", "cz07", "cz09"] } ] },
    { id: "u03", title: "Questions and answers", lessons: [
      { id: "l0301", title: "What, where, who", items: ["q01", "q02", "q03", "q04"] },
      { id: "l0302", title: "How much, which, why", items: ["q05", "q06", "q07", "q08"] },
      { id: "l0303", title: "Useful questions", items: ["q09", "q10", "q11", "q12"], cloze: ["cz02", "cz03"] } ] },
    { id: "u04", title: "Food and drinks", lessons: [
      { id: "l0401", title: "Water, please", items: ["f01", "f02", "f03", "f04"], cloze: ["cz01"] },
      { id: "l0402", title: "Meals and drinks", items: ["f05", "f06", "f07", "f08", "f09"] },
      { id: "l0403", title: "How you like it", items: ["f10", "f11", "f12", "f13", "f14"], cloze: ["cz13"] },
      { id: "l0404", title: "At the table", items: ["f15", "f16", "f17", "f18"], dialogues: ["dl02"] },
      { id: "l0405", title: "More or enough", items: ["f19", "f20", "f21"], dialogues: ["dl11"] } ] },
    { id: "u05", title: "Shopping and money", lessons: [
      { id: "l0501", title: "In the shop", items: ["s10", "s01", "s05", "s06"] },
      { id: "l0502", title: "Bargaining gently", items: ["s02", "s03", "s04"] },
      { id: "l0503", title: "Paying", items: ["s07", "s08", "s09"] } ] },
    { id: "u06", title: "Getting around", lessons: [
      { id: "l0601", title: "Here and there", items: ["t10", "t11", "t01", "t03"] },
      { id: "l0602", title: "Buses and stops", items: ["t02", "t04", "t05", "t09"], cloze: ["cz06"], dialogues: ["dl08", "dl10"] },
      { id: "l0603", title: "Following directions", items: ["t06", "t07", "t08"], dialogues: ["dl05"] } ] },
    { id: "u07", title: "Meeting people", lessons: [
      { id: "l0701", title: "Where are you from?", items: ["m01", "m02", "m03", "m04"], dialogues: ["dl09"] },
      { id: "l0702", title: "Family", items: ["m05", "m06", "m07", "m08", "m09", "m10"] },
      { id: "l0703", title: "Getting to know someone", items: ["m11", "m12", "a03"] },
      { id: "l0704", title: "Finding a room", items: ["a01", "a02", "a04", "a05"] } ] },
    { id: "u08", title: "Everyday activities", lessons: [
      { id: "l0801", title: "Today and tomorrow", items: ["d03", "d04", "d05", "d06", "d07"] },
      { id: "l0802", title: "Waiting and going", items: ["d01", "d02", "d09", "q12"], dialogues: ["dl03"] } ] },
    { id: "u09", title: "Understanding spoken Tamil", lessons: [
      { id: "l0901", title: "Numbers 1–5", items: ["n01", "n02", "n03", "n04", "n05"] },
      { id: "l0902", title: "Numbers 6–10", items: ["n06", "n07", "n08", "n09", "n10"] },
      { id: "l0903", title: "Big numbers and amounts", items: ["n11", "n12", "n13"], dialogues: ["dl04"] },
      { id: "l0904", title: "What people ask you", items: ["x09", "x10", "f16", "d09"], dialogues: ["dl01", "dl07"] } ] },
    { id: "u10", title: "Real-life conversations", lessons: [
      { id: "l1001", title: "Buying something", items: ["s01", "s02", "x09", "x10"], dialogues: ["dl01", "dl04"] },
      { id: "l1002", title: "Ordering food", items: ["f03", "f12", "f14", "f18"], cloze: ["cz01", "cz13"], dialogues: ["dl07"] },
      { id: "l1003", title: "Asking the way", items: ["q10", "t03", "t06", "t07", "t08"], dialogues: ["dl05", "dl10"] } ] },
    { id: "u11", title: "Natural spoken expressions", lessons: [
      { id: "l1101", title: "Reactions", items: ["x01", "x02", "x03", "x04"] },
      { id: "l1102", title: "Sounding natural", items: ["x05", "x06", "x07", "x08"] } ] },
    { id: "u12", title: "Getting help and final review", lessons: [
      { id: "l1201", title: "Asking for help", items: ["h01", "h02", "h03", "h04", "h05"], cloze: ["cz11", "cz12"] },
      { id: "l1202", title: "Problems", items: ["h06", "h07", "h08", "h09", "h10"] },
      { id: "l1203", title: "The most useful phrases", items: ["g01", "g02", "c08", "c10", "s01", "q11"], dialogues: ["dl06", "dl03"] } ] }
  ],

  soundGuide: [
    ["aa", "long 'a', as in father", "Vaanga"],
    ["ee", "as in see", "Neenga"],
    ["oo", "as in moon", "Moonu"],
    ["ai", "as in eye", "Illai"],
    ["e / o", "can be short or long — the pronunciation hint shows which", "Venum (vay-num)"],
    ["th", "a soft t with the tongue touching the teeth — not English 'th' as in 'think'", "Thanni"],
    ["dh", "a soft d with the tongue touching the teeth", "Idhu"],
    ["zh", "a deep 'l/r' sound: curl your tongue back and say 'l'", "Ezhu"],
    ["Double letters", "hold them a moment longer: kk, pp, tt", "Akkaa"],
    ["u at the end", "very short, almost swallowed", "Rendu"]
  ]
};
