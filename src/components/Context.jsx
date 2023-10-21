import { createContext,useContext,useState } from "react";
import { useTranslation } from "react-i18next";
const ListenForState=createContext()

function ListenForStateProvider({children}){
    const [AccessToken,setAccessToken]=useState(null)
    const [navPage ,SetnavPage]=useState(location.pathname);
    const [TopNavChange,SetTopNavChange]=useState()
    const [FrameOpen,IsFrameOpen]=useState(false)
    const [searchFor,SetSearchFor]=useState(null)
    const [KeyWordList,SetKeyWordList]=useState([],[],[])
    const [ListMusicCheck,SetListMusicCheck]=useState([])//交叉比對關鍵字
    
    const [chooseV,SetchooseV]=useState({
        videoId:null,
        videoLink:null,
        videoChannelId:null,
        VideoTitle:null,
        // VideoLocalTitle:null,
        VideoThumbnails:null,
        ChannelTitle:null,
        VideoDescribe:null,
        VideoTime:null
    })
    const [Inlist,Setlist]=useState({})
    const [ChooseClass,IsChooseClass]=useState(true)
    const [login,IsLogin]=useState(false)
    const SaveAccesssToken=localStorage.getItem('access') 
    // if(SaveAccesssToken){
        //驗證
    // }
    const [list,AddListDiv]=useState(false)
    const [userNick,SetUserNick]=useState(null)
    const [P_musicList,Set_P_musicList]=useState([])
    const [mylist,SetMylist]=useState([])
    const [lang,Setlang]=useState("")
    const [langType,SetLangType]=useState()
    const {t}=useTranslation();
    
   

    return <>
        <ListenForState.Provider value={{navPage,SetnavPage,TopNavChange,SetTopNavChange,FrameOpen,IsFrameOpen,chooseV,SetchooseV,searchFor,SetSearchFor ,KeyWordList,SetKeyWordList,ListMusicCheck,SetListMusicCheck,Inlist,Setlist,ChooseClass,IsChooseClass,AccessToken,setAccessToken,login,IsLogin,list,AddListDiv,userNick,SetUserNick,P_musicList,Set_P_musicList,mylist,SetMylist,lang,Setlang,langType,SetLangType}}>
            {children}
        </ListenForState.Provider>
    </>
}

function useListenForState(){
    return useContext(ListenForState)
}
export { useListenForState,ListenForStateProvider}
