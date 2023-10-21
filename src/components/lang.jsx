import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next } from "react-i18next";


i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng:'en',
    detection:{
        order:['cookie','localStorage','navigator'],
        caches:['cookie'],
    },
    resources:{
        en:{
            
            translation:{
                //登入狀態
                IsLogin:'Not logging',

                //分頁標籤
                pageTitle:'TMusic- Enjoy music anytime',

                // 主頁 兼 Layout
                LayoutHome:'Home',
                LayoutDaily:'Daily ',
                LayoutSearch:'Search',
                LayoutLove:'like',
                LayoutAnalyze:'Analyze',
                LayoutMyList:'My list',
                LayoutRigister:'Register',
                LayoutLogin:'Log in',

                // 註冊
                SignUpTitle:'Sign up for free and enjoy',
                SignUpEmail:'Email',
                SignUpPasswd:'Password',
                SignUpPasswdV2:'verify Password',
                SignUpName:'Nickname',
                SignUpBirth:'Birthday',
                SignUpGender:'gender',
                SignUpBoy:'Man',
                SignUpGirl:'Lady',
                SignUpNeutral:'neutral',
                SignUpNo:'No Answer',
                SignUpSignUpBTN:'register',
                SignUpHasTxt:'Already has account',
                SignUpHasLink:'Login',
                SignUpErrMsg0:'Invalid format. Ex. example@TMusic.com',
                SignUpErrMsg1:'Enter 6 to 12 uppercase and lowercase numbers.',
                SignUpErrMsg2:'Password is not match,please try again.',
                SignUpErrMsg3:'Enter 6 to 12 letters and numbers.',
                SignUpErrMsg4:'Enter birthday.',
                SignUpErrMsg5:'Please choose.',
                SignUpNoEnter:'Please enter',
                SignUpRegdonetitle:'Thanks to be our member.',
                SignUpRegdoneBtn:'Login',

                //登入
                LoginTitle:"Login",
                LoginEmail:"Email",
                LoginPasswd:"Password",
                LoginBtn:"Login",
                LoginNoHasTxt:"No account,go",
                LogingoReg:"register",
                LoginErrMsg0:'Invalid format. Ex. example@TMusic.com',
                LoginErrMsg1:'Password is 6 to 12 uppercase and lowercase numbers.',
                LoginPlsEnter:"Please enter",
                
                //尋找
                SearchTitle:"Explore",
                SearchInput:"Search for music",

                //加入歌單
                AddlistTitle:'Add song to list',
                AddlistTableTitle:'Song Name',
                AddlistTableChannel:'Channel',
                AddlistCreate:'Create list',
                AddlistPlaceholder:'Please enter the name of list',
                AddlistErrMsg:"Typing the words under 10",
                AddlistChooseLabel:"Select list",
                AddlistUplimit:"The list has reached the limit",
                //音樂列表
                ListMyClass:"My lists",
                ListOftenSeeChannel:"Recent listening",
                ListDelte:"Delete",
                ListShare:'Share',
                 
            }
        },
        zh:{
            translation:{
                //登入狀態
                IsLogin:'未登入',
                //分頁標籤
                pageTitle:'TMusic- 隨時享受音樂',
                // 主頁 兼 Layout
                LayoutHome:'主頁',
                LayoutDaily:'每日精選',
                LayoutSearch:'搜尋',
                LayoutLove:'喜愛',
                LayoutAnalyze:'分析',
                LayoutMyList:'我的音樂列表',
                LayoutRigister:'註冊',
                LayoutLogin:'登入',
                // 註冊
                SignUpTitle:'免費註冊立即享受',
                SignUpEmail:'電子郵件',
                SignUpPasswd:'密碼',
                SignUpPasswdV2:'驗證密碼',
                SignUpName:'暱稱',
                SignUpBirth:'出生年月日',
                SignUpGender:'性別',
                SignUpBoy:'男生',
                SignUpGirl:'女生',
                SignUpNeutral:'中性',
                SignUpNo:'不便回答',
                SignUpSignUpBTN:'註冊',
                SignUpHasTxt:'已有帳號',
                SignUpHasLink:'登入',
                SignUpErrMsg0:'格式無效。 範例格式 example@TMusic.com',
                SignUpErrMsg1:'密碼請輸入6到12大小寫數字',
                SignUpErrMsg2:'輸入的兩個密碼並不相符，請再試一次',
                SignUpErrMsg3:'請輸入4到10的大小寫數字暱稱',
                SignUpErrMsg4:'請輸入生日.',
                SignUpErrMsg5:'請選擇',
                SignUpNoEnter:'請輸入',
                SignUpRegdonetitle:'謝謝您的註冊',
                SignUpRegdoneBtn:'登入',
                //登入
                LoginTitle:"登入",
                LoginEmail:"電子郵件",
                LoginPasswd:"密碼",
                LoginBtn:"登入",
                LoginNoHasTxt:"沒有帳號,前往",
                LogingoReg:"註冊",
                LoginErrMsg0:'格式無效。 範例格式 example@TMusic.com',
                LoginErrMsg1:'密碼為6到12大小寫數字',
                LoginPlsEnter:"請輸入",
                //尋找
                SearchTitle:"尋找",
                SearchInput:"尋找音樂",
                

                //加入歌單
                AddlistTitle:'加入歌單',
                AddlistTableTitle:'歌名',
                AddlistTableChannel:'頻道',
                AddlistCreate:'創建列表',
                AddlistPlaceholder:'輸入音樂列表標題',
                AddlistErrMsg:"請輸入10字以內的標題",
                AddlistChooseLabel:"請選擇列表",
                AddlistUplimit:"創建播放清單數量上限!",

                //播放列表
                ListMyClass:"我的播放列表",
                ListOftenSeeChannel:"最近收聽",
                ListDelte:"刪除",
                ListShare:'分享',
            }
        },
        ja:{
            translation:{
                //登入狀態
                IsLogin:'サインインしていません',
                //分頁標籤
                pageTitle:'TMusic- いつでも音楽を楽しむ',
                // 主頁 兼 Layout
                LayoutHome:'ホーム',
                LayoutDaily:'デーリー',
                LayoutSearch:'検索',
                LayoutLove:'お気に入り',
                LayoutAnalyze:'分析',
                LayoutMyList:'マイリスト',
                LayoutRigister:'サインアップ',
                LayoutLogin:'ログイン',
                // 註冊
                SignUpTitle:'無料で登録、音楽を楽しみましょう',
                SignUpEmail:'メールアドレス',
                SignUpPasswd:'パスワード',
                SignUpPasswdV2:'パスワード驗證',
                SignUpName:'暱稱',
                SignUpBirth:'生年月日',
                SignUpGender:'性別',
                SignUpBoy:'男性',
                SignUpGirl:'女性',
                SignUpNeutral:'ノンバイナリー',
                SignUpNo:'答えない',
                SignUpSignUpBTN:'登録する',
                SignUpHasTxt:'アカウントを持っています',
                SignUpHasLink:'ログイン',
                SignUpErrMsg0:'無効な形式。 例 example@TMusic.com',
                SignUpErrMsg1:'6～12桁の文字を入力してください。',
                SignUpErrMsg2:'パスワードが一致しません。もう一度試してください。',
                SignUpErrMsg3:'暱稱を4～10の文字で入力してください。',
                SignUpErrMsg4:'生年月日を入力してください',
                SignUpErrMsg5:'選んでください',
                SignUpNoEnter:'入力してください',
                SignUpRegdonetitle:'ご登録いただきありがとうございます',
                SignUpRegdoneBtn:'ログイン',

                //登入
                LoginTitle:"ログイン",
                LoginEmail:"メールアドレス",
                LoginPasswd:"パスワード",
                LoginBtn:"ログイン",
                LoginNoHasTxt:"アカウントを持てません,",
                LogingoReg:"サインアップ",
                LoginErrMsg0:'無効な形式。 例 example@TMusic.com',
                LoginErrMsg1:'パスワードは6～12桁の文字でございます。',
                LoginPlsEnter:"入力してください",
                //尋找
                SearchTitle:"探す",
                SearchInput:"音楽を探す",

                //加入歌單
                AddlistTitle:'曲を追加する',
                AddlistTableTitle:'曲名',
                AddlistTableChannel:'チャンネル',
                AddlistCreate:'リストを作成',
                AddlistPlaceholder:'リストのタイトルを入力してください',
                AddlistErrMsg:"タイトルは10桁以内の文字でございます",
                AddlistChooseLabel:"リストを選んで",
                AddlistUplimit:"リストが制限に達しました!",
                //播放列表
                ListMyClass:"マイリスト",
                ListOftenSeeChannel:"最近聴いた",
                ListDelte:"削除",
                ListShare:'共有',
            }
        },
    }
})

export default i18n
