import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { adminCollectionId, contactUsCollection, contactUsCollectionId, db, heroSectionCollectionId, mainCollection, projectsCollection, projectsCollectionId, reviewsCollection, reviewsCollectionId, socialLinksCollectionId } from './config/fbconfig';

const ImportData: React.FC = () => {

    const [loader, setLoader] = useState(false);

    const adminData = {
        "email": "admin@gmail.com",
        "pass": "786"
    };

    const heroData = {
        "btn_link_1": "https://www.linkedin.com/in/akash-ameer-437aa626a",
        "btn_link_2": "https://github.com/HassanAmeer",
        "btn_name_1": "Linkdin",
        "btn_name_2": "View Gthub",
        "card_subtitle_1": "Yeaadsrs Experience",
        "card_subtitle_2": "Projecasdsts Completed",
        "card_subtitle_3": "Happadsy Clients",
        "card_subtitle_4": "Aveadsfrage Rating",
        "card_title_1": "4+",
        "card_title_2": "148+",
        "card_title_3": "90%",
        "card_title_4": "4.9",
        "desc": "Senior Full-Stack Developer specializing in -- Flutter, Laravel, and React -- transforming ideas into stunning reality",
        "image": "https://thelocalrent.com/link/v.php?t=1762881721&tk=37160f2e00721d906831565829ae1de7",
        "subtitle": "Senior Developer",
        "title": "Dev Beast"
    }

    const socialLinksData =
    {
        "discord": "",
        "email": "devbeast143@gmail.com",
        "facebook": "",
        "github": "https://github.com/HassanAmeer",
        "globe": "",
        "instagram": "",
        "linkedin": "https://www.linkedin.com/in/akash-ameer-437aa626a",
        "location": "Lahore Pakistan",
        "logo": "https://thelocalrent.com/link/v.php?t=1763014316&tk=37160f2e00721d906831565829ae1de7",
        "phone": "+923097676179",
        "snapchat": "",
        "subtitle": "Senior Flutter Developer",
        "telegram": "",
        "tiktok": "",
        "title": "DeavBeast",
        "twitter": "",
        "youtube": ""
    };

    const projectsData = [
        {
            "title": "media link generator",
            "desc": "This project is alternative of firebase storage\n\nfeatures\n\nuser can upload any types of media\nby API, and also from user dashboard directly\ncan encrypt\nadmin can parmanent delete the files only\ncan contact support, whatsapp\nalso added free and premium plans\nalso API Documentation\ncan upload file by files + bytes + base64\nLanguages\n\nhtml\ncss\ntailwind css\nphp\njs\najax for api",
            "tags": [
                "PHP",
                "API",
                "AJAX"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763009859&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009863&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009866&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009867&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009871&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009878&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009880&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009883&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/secured_cloud_storage",
            "projectLink": "https://thelocalrent.com/link/",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Trainer, tournaments",
            "desc": "Flutter Firebase, Trainer, tournaments, fights app.\nCoaches Signin with trainer app and add 13 players\nmanager can see this coach's details and add tournaments and sport types the coaches thats added teams on tournament base and sport types admin pplannig a match according to this and also by teams gender and weights",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763009218&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009219&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763009221&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/tournaments_flutter_app?tab=readme-ov-file",
            "projectLink": "https://github.com/HassanAmeer/tournaments_flutter_app?tab=readme-ov-file",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter_Wiz_VPN",
            "desc": "Flutter_Wiz_VPN\nProtect Your Privacy.\nWiz VPN: Your Fortress of Online Freedom and Security\n\nTired of online restrictions and privacy concerns? Take control of your digital experience with Wiz VPN, the lightning-fast app that unlocks a world of online freedom and shields your privacy with military-grade security.\n\n✅ Effortless Protection, Unmatched Performance:",
            "tags": [
                "Flutter",
                "API",
                "Server"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763004714&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004717&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004720&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004721&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004722&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004726&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004728&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Flutter_Wiz_VPN",
            "projectLink": "https://play.google.com/store/apps/details?id=com.webseowiz.Wiz.VPN&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Sale Rozana",
            "desc": "Flutter + Laravel REST API.  salerozana APP. ANNOUNCEMENTS of branding sales. All Brands Sales",
            "tags": [
                "Flutter",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763004243&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004249&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004252&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004256&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004258&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004261&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763004264&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Flutter_SaleRozana_App",
            "projectLink": "https://play.google.com/store/apps/details?id=com.salerozana.sales.brands&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Breeders Hive",
            "desc": "Flutter Breeders hive like Animals, Birds App",
            "tags": [
                "Flutter",
                "Laravel",
                "API",
                "Local Storage"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763003913&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003914&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003919&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003923&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003932&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003941&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763003944&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/breeders_hive",
            "projectLink": "https://play.google.com/store/apps/details?id=com.breeders.hive&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Kefc Card",
            "desc": "Flutter + API, Kefc Resturents Booking App.\n\nRegister and Convert your valid Play 4Less Card to a easy to use Play4Less iCard, then simply open the App, pull up your iCard and save.\n\nMap/list that geolocates you to the closest participating Play4Less venues and offers\n\nDigitalized card that ensures you never lose your Play4Less Card\n\nProfile pages that tell you more about each participating location\n\nBuilt in saving calculator to track your savings after each use\n\nCheck in with Facebook and share your experiences with friends and family",
            "tags": [
                "Flutter",
                "Firebase",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762975151&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975155&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975156&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975157&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975158&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975165&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762975168&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "",
            "projectLink": "https://play.google.com/store/apps/details?id=com.taktik.play&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Workout App",
            "desc": "Flutter Worrkout App",
            "tags": [
                "Flutter",
                "Firebase",
                "Getx"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762974029&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762974032&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762974445&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Workout-for-woman",
            "projectLink": "https://github.com/HassanAmeer/Workout-for-woman",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "meetracer-app",
            "desc": "Flutter Meetracer app for vehicle racing , and  top rated garages managments and locations finding etc",
            "tags": [
                "flutter",
                "firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762964995&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965011&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965013&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965013&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965015&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965018&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965019&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965022&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965023&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965024&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965028&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965029&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965029&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965033&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965038&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965071&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965089&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965096&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965102&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965123&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762965135&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/meetracer-flutter-app",
            "projectLink": "https://github.com/HassanAmeer/meetracer-flutter-app",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "The Local Rental APP",
            "desc": "Flutter + API, by or sell items as a rent ",
            "tags": [
                "Flutter",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762963397&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963401&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963404&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963406&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963408&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963409&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963410&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963410&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963411&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963412&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963413&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762963414&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/rent",
            "projectLink": "https://thelocalrent.com",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "The Local Rent Web",
            "desc": "Laravel + API, The Local Rental Website, with user panel + admin panel. \ninside this project: items can rent or or buy.\nAlso Flutter App s Connected with API ",
            "tags": [
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762961136&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762961300&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762961356&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762962278&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762962279&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/thelocalrent_laravel",
            "projectLink": "https://thelocalrent.com/",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "MeetWorth Admin panel V2",
            "desc": "Flutter admin panel version 1 to 2 in dark theme with every new setup",
            "tags": [
                "flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762959017&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959027&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959083&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959095&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959099&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959100&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959102&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959103&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959104&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762959174&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_meetworth_web_and_app",
            "projectLink": "https://github.com/HassanAmeer/flutter_meetworth_web_and_app",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "MeetWorth App",
            "desc": "Flutter MeetWorth with firebase",
            "tags": [
                "Flutter",
                "Firebase",
                "Apple pay",
                "IOS"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762958602&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958605&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_meetworth_web_and_app",
            "projectLink": "https://play.google.com/store/search?q=meetworth&c=apps&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Story For Gen",
            "desc": "Flutter + Laravel, Story For Gen app for order a frames",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762958183&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958184&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/cloudstorage-frames-app",
            "projectLink": "https://github.com/HassanAmeer/cloudstorage-frames-app",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Auto Shield app",
            "desc": "Flutter + Firebase + API, Auto Shield app\n1. installer side app\n2. customer side app",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762957243&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762957247&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/autoshield_installers_side_app",
            "projectLink": "https://github.com/HassanAmeer/autoshield_installers_side_app",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Flick NFC",
            "desc": "Flutter Flick NFC with API + React JS Admin Panel.",
            "tags": [
                "Flutter",
                "React js",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762894460&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894463&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894469&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894473&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894479&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flick_save_multi_accounts_links",
            "projectLink": "https://play.google.com/store/apps/details?id=com.flicktechnologies.flickapp&hl=en",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Laravel Sale rozana WEB + Admin",
            "desc": "Laravel Sale rozana WEB + Admin Panel with 2 types of templates",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762894240&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894241&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894241&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894242&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894243&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894243&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894243&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894244&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894245&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894245&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Laravel_SaleRozana_Web_2_Templates",
            "projectLink": "https://salerozana.com/",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Bitcoin-Mining",
            "desc": "Bitcoin-Mining for ( RUSSIAN Client )\nPURE PHP",
            "tags": [
                "PHP",
                "JQuery",
                "AJAX"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762886503&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762886518&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762886521&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Bitcoin-Mining",
            "projectLink": "https://github.com/HassanAmeer/Bitcoin-Mining",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": true,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Hero Zero Game",
            "desc": "PHP , Flash, Hero Zero Game",
            "tags": [
                "PHP",
                "FLASH"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1763008788&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763008810&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763008829&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763008835&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://ap1.herozerogame.com/",
            "projectLink": "https://ap1.herozerogame.com/",
            "totalTeams": "2",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Mart Store Cloned",
            "desc": "Flutter + API cloned App , multi services store",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762974788&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762974790&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762974791&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762974792&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "",
            "projectLink": "",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "EMG Admin Panel",
            "desc": "React Js + Vue Js EMG Admin Panel, for manage emergency proceedures. like firebirgade, ",
            "tags": [
                "React js",
                "Vue Js",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762973775&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762973777&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762973778&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763007727&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763007728&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763007729&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763007730&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/emergency-app-admin-panel",
            "projectLink": "",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "meetracer-admin-panel",
            "desc": "React js + Vue js , ( Firebase ) admin panel for Meetracers flutter app ",
            "tags": [
                "React js",
                "Firebase",
                "Flutterr"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762972670&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762972672&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762972673&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762972986&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762972987&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/meetracer-flutter-app/tree/meetracers-admin-reactjs",
            "projectLink": "https://meetracers.web.app/",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Story For Gen Admin Panel",
            "desc": "Laravel, Story For Gen Admin Panel,  For  Flutter App to manage it by REST API",
            "tags": [
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762958377&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958378&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958381&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958382&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958383&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762958387&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/cloudstorage-frames-app",
            "projectLink": "https://github.com/HassanAmeer/cloudstorage-frames-app",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "mom nurture AI",
            "desc": "Flutter baby nurture App With Admin app",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762956800&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762956800&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762956801&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762956801&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter-baby-nurture-app-with-ai-langchain",
            "projectLink": "https://github.com/HassanAmeer/flutter-baby-nurture-app-with-ai-langchain",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Tailer Shop",
            "desc": "(Students App + Admin App).  mini uniform sell app with admin app with custom media sharing system\nfor indian client from fiver 1 day delivery",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762956567&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762956570&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Tailor-Shop-User-App",
            "projectLink": "https://github.com/HassanAmeer/Tailor-Shop-User-App",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Google meet cloned",
            "desc": "FLutter Laravel Api , (web + admin + app), \n✅ Video Meeting.\n✅ Live Class.\n✅ Webinar.\n✅ Online Training.\n✅ Web Conference\nCore Features\n\n☑️ Free video and audio conference call.\n☑️ Social login(Facebook,Google,Phone).\n☑️ Create Meeting and share code to join others.\n☑️ Join Meeting without login.\n☑️ Live Streaming to YouTube\n☑️ Lock-protected rooms: Control access to your conferences with a password.\n☑️ Schedule Meeting: Schedule and add the meeting to your calendar.\n☑️ Meeting History: Rejoin previous meetings.\n☑️ Chat: Message to your team during meetings.\n☑️ High quality: Audio and video are delivered with the clarity and richness of Opus and VP8\n☑️ Record Meetings.",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762955655&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762955659&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762955660&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762955661&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/meetair-php-flutter-cloned-google-meets",
            "projectLink": "https://github.com/HassanAmeer/meetair-php-flutter-cloned-google-meets",
            "totalTeams": "2",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Woddle React App",
            "desc": "Woddle React App landing page for woddle services only (USA)",
            "tags": [
                "React js",
                "Node js"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762953958&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/react-js-home-page-for-urgent-apps-portfilio",
            "projectLink": "https://github.com/HassanAmeer/react-js-home-page-for-urgent-apps-portfilio",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "alquran",
            "desc": "features : online quran offline quran offline DataBase\n\ncurrently offline with json file for para number and surah number and images for quran pages.\nbut if need to attach with online already structured with online and offline db",
            "tags": [
                "Flutter",
                "Local Sotrage",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762952307&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762952311&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762952311&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762952313&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762952314&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762952315&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/quran-shrif-app-with-online---offline",
            "projectLink": "https://github.com/HassanAmeer/quran-shrif-app-with-online---offline",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Ebaba Store",
            "desc": "E-commerce Store, online products selling website (jwellery, electronics , computers mobiles, jenral store products etc.). \nEvery Thing Will be managesd by admin panel",
            "tags": [
                "Laravel",
                "Api"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762952075&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762954555&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/ebaba-laravel",
            "projectLink": "https://ebaba.sale",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Chat room app Cloned",
            "desc": "Flutter + Laravel, chats room app",
            "tags": [
                "Flutter",
                "Firebase",
                "API",
                "Laravel"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762951264&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762951339&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/audio-chat-rooms-app-flutter-laravel-chatter-26-04-2024?tab=readme-ov-file",
            "projectLink": "https://github.com/HassanAmeer/audio-chat-rooms-app-flutter-laravel-chatter-26-04-2024?tab=readme-ov-file",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "love talk ai website ",
            "desc": "PHP + Codeigniter, love talk ai website ",
            "tags": [
                "PHP",
                "Chat Gpt",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762950938&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950939&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950940&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950942&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950944&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950946&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950948&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950949&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950950&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950952&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/php_lovetalkai",
            "projectLink": "https://lovetalk.ai",
            "totalTeams": "2",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Vista Vin",
            "desc": "Laravel Prroject , for Vehicles report generator.",
            "tags": [
                "Laravel",
                "Open Admin",
                "Socket Io",
                "Pusher"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762950409&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950414&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950435&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950441&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950480&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/vistavin-laravel",
            "projectLink": "https://github.com/HassanAmeer/vistavin-laravel",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "images+audio, detecting",
            "desc": "flutter_audio_images_detecting_tflite_model\n",
            "tags": [
                "Flutter",
                "TF Lite"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762950049&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950065&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950075&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950077&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950079&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762950082&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_audio_images_detecting_tflite_model",
            "projectLink": "https://github.com/HassanAmeer/flutter_audio_images_detecting_tflite_model",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Fakecall",
            "desc": "Flutter Fakecall with All Types Of advertisements (UK)",
            "tags": [
                "Flutter",
                "Firebase",
                "Admobe"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762949730&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762949736&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762949739&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762949745&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762949747&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_fake_call_with_all_ads",
            "projectLink": "https://github.com/HassanAmeer/flutter_fake_call_with_all_ads",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Auto Shield",
            "desc": "Laravel Auto Shield Website (UK)",
            "tags": [
                "Laravel",
                "Open Admin"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762948593&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762949261&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/laravel_admin_plus_web_autoshield_simple_listing",
            "projectLink": "https://github.com/HassanAmeer/laravel_admin_plus_web_autoshield_simple_listing",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Wiz Stamp App",
            "desc": "Flutter + Laravel Api, Wiz Stamp App , for buyer dealer documents signature and securrity,",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762895772&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895774&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895775&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1763005587&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "",
            "projectLink": "https://play.google.com/store/apps/details?id=com.wizstamp.digital.stamps&hl=en",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "AI Note + Template Generator",
            "desc": "AI Note + Template Generator APp With firebase",
            "tags": [
                "Flutter",
                "API",
                "Firebase",
                "Chat Gpt"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762895140&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895151&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895157&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895160&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762895168&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_app_ai_note_gen_adaptive_inscribe",
            "projectLink": "https://github.com/HassanAmeer/flutter_app_ai_note_gen_adaptive_inscribe",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "WIZ 4K Wallpaper",
            "desc": "Flutter + Laravel API,\nWiz Wallpapers - 3D, HD & 4K\nWIZ Wallpaper App inside can change the picture by schedual times in background",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762894762&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894793&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894811&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894814&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894845&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762894871&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Flutter_wallpapers_multi_app",
            "projectLink": "https://play.google.com/store/apps/details?id=com.webseowiz.HDWallpapers",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Wallpaper Admin Panel",
            "desc": "Laravel Wallpaper Admin Panel for flutter App",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762893893&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893902&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893918&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893922&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893925&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/laravel_admin_wallpaper_app_api",
            "projectLink": "https://github.com/HassanAmeer/laravel_admin_wallpaper_app_api",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter BoPedo Web+App",
            "desc": "Flutter App + Web generate frames according to provided stories",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762893674&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893674&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893677&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter_web_ai_story_generator_Bopedo",
            "projectLink": "https://play.google.com/store/apps/details?id=com.scorpionsol.deborduurshop&hl=en",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Shipper",
            "desc": "Flutter + firrebase Shipper App",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762893392&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893393&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893394&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893396&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893398&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893399&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893400&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893401&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893402&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893403&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893404&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893405&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/flutter-shipper-design",
            "projectLink": "https://github.com/HassanAmeer/flutter-shipper-design",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "H2o ",
            "desc": "Flutter H20 (AED) Multi services App",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762892998&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893000&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893002&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893004&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893007&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762893010&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/H20_Services_Flutter_App",
            "projectLink": "https://github.com/HassanAmeer/H20_Services_Flutter_App",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Charging Station App",
            "desc": "Flutter + API Charging Station App (chinies Project) ",
            "tags": [
                "Flutter",
                "React",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762892774&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892776&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892777&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/chargeurself_flutter_app",
            "projectLink": "https://github.com/HassanAmeer/chargeurself_flutter_app",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Blood_Saver_App",
            "desc": "Flutter + Laravel Api Blood_Saver_App",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762892488&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892489&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892490&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Blood_Saver_App_for_itlife",
            "projectLink": "https://github.com/HassanAmeer/Blood_Saver_App_for_itlife",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "laravel-swebcraping-salesoffer",
            "desc": "laravel-swebcraping-salesoffer\n",
            "tags": [
                "Laravel",
                "Guzzet"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762892270&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892271&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892271&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/laravel-swebcraping-salesoffer",
            "projectLink": "https://github.com/HassanAmeer/laravel-swebcraping-salesoffer",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Speech To Text",
            "desc": "flutter Speech To Text then will share with multiple Apps like on whatsapp , gmail etc",
            "tags": [
                "Flutter",
                "Voice Listener"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762892131&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762892137&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/speechtotextbyitlife",
            "projectLink": "https://github.com/HassanAmeer/speechtotextbyitlife",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Poolyfi Taxi Booking",
            "desc": "Flutter + Firebase App clone. Polyfi Taxi Booking FLutter App",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762891911&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762891913&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762891915&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762891916&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762891919&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/poolyfi-driver-riders",
            "projectLink": "https://github.com/HassanAmeer/poolyfi-driver-riders",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Multi Scanner App",
            "desc": "Scan ANy Type Of QR-Code And Bar Code 25 Types of scnner",
            "tags": [
                "Flutter",
                "Local Storage"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762891135&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762891136&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/QR-BAR-Scanner-Gen-APP",
            "projectLink": "https://github.com/HassanAmeer/QR-BAR-Scanner-Gen-APP",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Chemicals App",
            "desc": "Flutter + Firebase, Chemical Store App",
            "tags": [
                "Flutter",
                "Firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762890835&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890836&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890837&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890838&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/chemicals-app",
            "projectLink": "https://github.com/HassanAmeer/chemicals-app",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Changan Auto Bilal",
            "desc": "Flutter + Laravel API App",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762890441&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890456&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890459&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/changan-auto-bilal-flutter-app",
            "projectLink": "https://github.com/HassanAmeer/changan-auto-bilal-flutter-app",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Milk Shop",
            "desc": "Flutter + Laravel APi App",
            "tags": [
                "Flutter",
                "Laravel",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762890284&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890285&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890285&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890286&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/chman-milk-shop",
            "projectLink": "https://github.com/HassanAmeer/chman-milk-shop",
            "totalTeams": "2",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Shoes Store App",
            "desc": "Flutter Firebase Shoes Store App",
            "tags": [
                "Flutter",
                "Firrebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762890045&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890045&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890046&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762890046&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Shoes-Store-Ui-Normal",
            "projectLink": "https://github.com/HassanAmeer/Shoes-Store-Ui-Normal",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter AI App",
            "desc": "flutter chat gpt by api AI APP",
            "tags": [
                "Flutter",
                "Firebase",
                "chat gpt",
                "api"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762889876&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762889881&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762889885&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/itlife-gpt",
            "projectLink": "https://github.com/HassanAmeer/itlife-gpt",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter Mall-Maweshi",
            "desc": "Pak - mall maweshi app",
            "tags": [
                "flutter",
                "laravel",
                "api"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762889472&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762889496&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762889649&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762889651&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/pak_mallmaweshi",
            "projectLink": "https://github.com/HassanAmeer/pak_mallmaweshi",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Fill Flutter Dart Vs Code Extension",
            "desc": "VS CODE (Extension) Fill Flutter Have Pre_Build Widgets For Save Time. like: form validation, getstate managments, buttons, tab controller, call Drawer globely, large medium appBar, Input Feilds, popup menu, cupertino menu, dropdown Buttons, DragAble Widgets, Drag And Drop Widgets, builders, And Much More",
            "tags": [
                "javascript",
                "vs code extension"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762889256&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Vs-code-Extension-For-Flutter",
            "projectLink": "https://github.com/HassanAmeer/Vs-code-Extension-For-Flutter",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "flutter TreatSick APP",
            "desc": "Flutter Frebase treatment app with medicin and health issuess and symptoms",
            "tags": [
                "flutter",
                "firebase"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762888923&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762888930&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762888935&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/TreatSick",
            "projectLink": "https://github.com/HassanAmeer/TreatSick",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter And web Store",
            "desc": "Flutter App + Website & admin panel in PHP With APII",
            "tags": [
                "Flutter",
                "PHP",
                "Rest API",
                "Web",
                "API"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762887709&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762887714&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Php-Ecommerce-Store-Web",
            "projectLink": "https://github.com/HassanAmeer/Php-Ecommerce-Store-Web",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Flutter-Pdf-Extra-All-In-One",
            "desc": "Flutter pdf app all in one ui",
            "tags": [
                "Flutter"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762887417&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Flutter-Pdf-Extra-All-In-One-Ui",
            "projectLink": "https://github.com/HassanAmeer/Flutter-Pdf-Extra-All-In-One-Ui",
            "totalTeams": "1",
            "isWeb": false,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "White-Spot-Services-Dubai",
            "desc": "PURE PHP, ( Dubai ) admin panel multi languages included",
            "tags": [
                "PHP",
                "JQUERY",
                "AJAX"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762886662&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/White-Spot-Services-Dubai",
            "projectLink": "https://github.com/HassanAmeer/White-Spot-Services-Dubai",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Trons-TRX-Mining",
            "desc": " ( RUSSIAN Client ) PURE PHP. every things is in control's by admin for demo can watch a video or can be download and some demo images are here's",
            "tags": [
                "PHP",
                "JQuery",
                "AJAX"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762886295&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762886299&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762886304&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Trons-TRX-Mining",
            "projectLink": "https://github.com/HassanAmeer/Trons-TRX-Mining",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        },
        {
            "title": "Lottery website",
            "desc": " ( RUSSIAN Client ) PURE PHP. every things is in control's by admin for demo can watch a video or can be download and some demo images are here's",
            "tags": [
                "PHP",
                "JQuery",
                "AJAX"
            ],
            "projectImages": [
                "https://thelocalrent.com/link/v.php?t=1762886146&tk=37160f2e00721d906831565829ae1de7",
                "https://thelocalrent.com/link/v.php?t=1762886148&tk=37160f2e00721d906831565829ae1de7"
            ],
            "githubLink": "https://github.com/HassanAmeer/Lottery-web-Russian-client?tab=readme-ov-file",
            "projectLink": "https://github.com/HassanAmeer/Lottery-web-Russian-client?tab=readme-ov-file",
            "totalTeams": "1",
            "isWeb": true,
            "isPin": false,
            "isHide": false,
            "createdAt": serverTimestamp()
        }
    ];

    const contacts_Data = [
        {
            "desc": "Name: john Message: somethiimng",
            "email": "my@gmail.com",
            "phone": "+92 0309",
            "read": true,
            "createdAt": serverTimestamp()
        },
        {
            "desc": "Name: john Message: somethiimng",
            "email": "my@gmail.com",
            "phone": "+92 0309",
            "read": false,
            "createdAt": serverTimestamp()
        }
    ];

    const reviewsData = [
        {
            "name": "husna",
            "role": "product dealer",
            "text": "\"\"Exceptional work! The app exceeded all expectations. Professional, fast, and delivered a product that our users absolutely love.\"\"",
            "rating": 4,
            "avatar": "https://thelocalrent.com/link/v.php?t=1762871099&tk=37160f2e00721d906831565829ae1de7",
            "createdAt": serverTimestamp(),
            "updatedAt": serverTimestamp(),
        },
        {
            "name": "Emma Davis",
            "role": "Product Lead, Innovate",
            "text": "\"Transformed our vision into reality. The attention to detail and user experience is phenomenal. Highly recommend!\"",
            "rating": 4,
            "avatar": "https://thelocalrent.com/link/v.php?t=1762871099&tk=37160f2e00721d906831565829ae1de7",
            "createdAt": serverTimestamp(),
            "updatedAt": serverTimestamp(),
        },
        {
            "name": "Sarah Johnson",
            "role": "CEO, TechStart Inc",
            "text": "\"Exceptional work! The app exceeded all expectations. Professional, fast, and delivered a product that our users absolutely love.\"",
            "rating": 2,
            "avatar": "https://thelocalrent.com/link/v.php?t=1762871099&tk=37160f2e00721d906831565829ae1de7",
            "createdAt": serverTimestamp(),
            "updatedAt": serverTimestamp(),
        },
        {
            "name": "Michael Chen",
            "role": "CTO, FinanceHub",
            "text": "\"Best developer we have worked with. Clean code, great architecture, and outstanding communication throughout the project.\"",
            "rating": 5,
            "avatar": "https://thelocalrent.com/link/v.php?t=1762870793&tk=37160f2e00721d906831565829ae1de7",
            "createdAt": serverTimestamp(),
            "updatedAt": serverTimestamp(),
        }
    ];




    const importData = async () => {
        if (!confirm("Are You Sure Want to Import Data In Collection: " + mainCollection)) {
            return;
        }

        try {
            setLoader(true);
            // 1. socialLinks
            const socialLinks = doc(db, mainCollection, socialLinksCollectionId);
            await setDoc(socialLinks, socialLinksData);
            console.log("socialLinksData imported");
            // 2. heroSection
            const hero_data = doc(db, mainCollection, heroSectionCollectionId);
            await setDoc(hero_data, heroData);
            console.log("heroData imported");

            // 3. add projects
            const projectsCollectionRef = collection(db, mainCollection, projectsCollectionId, projectsCollection);
            for (let index = 0; index < projectsData.length; index++) {
                const projectMap = {
                    ...projectsData[index],
                    // createdAt: serverTimestamp()
                }
                await addDoc(projectsCollectionRef, projectMap);
            }
            console.log("projectsData imported");

            // 4. contact us data 
            const contactUsCollectionRef = collection(db, mainCollection, contactUsCollectionId, contactUsCollection);
            for (let index = 0; index < contacts_Data.length; index++) {
                const contactMap = {
                    ...contacts_Data[index],
                    // createdAt: serverTimestamp()
                }
                await addDoc(contactUsCollectionRef, contactMap);
            }
            console.log("contactsData imported");

            // 5. admin data 
            const adminId = doc(db, mainCollection, adminCollectionId);
            await updateDoc(adminId, adminData);
            console.log("adminData imported");

            // 6. reviews Data
            const reviewsCollectionRef = collection(db, mainCollection, reviewsCollectionId, reviewsCollection);
            for (let index = 0; index < reviewsData.length; index++) {
                const reviewsMap = {
                    ...reviewsData[index],
                }
                await addDoc(reviewsCollectionRef, reviewsMap);
            }
            console.log("reviewsData imported");

            // 
            setLoader(false);
            alert('Imported successfully!');

        } catch (e) {
            setLoader(false);
            console.log("Error during import: Error:" + e);
            alert('Error:' + e);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Firebase Pre Setup Data</h1>
                <p className="text-lg text-white mb-8">import your Presetup JSON data with just one click. Upload and manage your data seamlessly.</p>
                <button
                    onClick={importData}
                    disabled={loader}
                    className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300">
                    {loader ? <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /> : "Import JSON Data "}
                </button>
            </div>
        </div>
    );
};

export default ImportData;