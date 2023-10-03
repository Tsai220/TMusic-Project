import { useListenForState } from "./Context"
import axios from "axios"

const KeywordComparison=(props)=>{
    const {KeyWordList,SetKeyWordList}=useListenForState()
    console.log(KeyWordList,"qwew")
     
    //let accessToken='ZLYp0DU2JLicj7n-Bfm0fsqsqvcctXh5R_PB5H0bdmnRz0sKHk2VUF2ZffGLLM8t'
    let accessToken='7d9b2cbc0e7cc643b98560d08e961880'
    //將搜索欄的詞和結果影片和浮動視窗的物件詞，然後比對是哪首歌  //先尋找詞後再拆字?

    //關鍵字優先級 1浮動影片標題->2查詢關鍵字 : 1查2 後再驗證是否為1出現的歌?
    const SearchK_W = KeyWordList[0];
    const FloatK_W = KeyWordList[1];
    const SearchResault = KeyWordList[2]; 
    //收尋結果自我檢查出現頻率高的歌名(單字)
    console.log("浮動標題:",FloatK_W,"收尋關鍵字:",SearchK_W.split(' '),"收尋結果",SearchResault) 

     
    let completeWords=[SearchK_W.toString(),FloatK_W.toString(),SearchResault.toString()]
     
    let mixerBox=[]
    
    completeWords.forEach((words,index)=>{
        mixerBox=[]
        const CutWords=words.match(/[^\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~【】・／】]+/ug);//抓除了特殊符號的字
    
        CutWords.map(str=>{
            let ReWords=str.replace(/[^A-Za-z0-9\u4e00-\u9fa5\u3040-\u30ff]+/gu, ' ') //切字加陣列
            let ReSplit=ReWords.split(' ')
            mixerBox.push(ReSplit)
            
        })
        words=mixerBox.reduce(function(a,b){ return a.concat(b)})//a累積回呼函式回傳值的累加器   b目前所迭代處理中的元素 攤平陣列
        
        words=words.filter((words)=>words.length >0) //過濾空字 //錯誤
        
        switch (index) {
            case 0:
                completeWords[0]=words
                break;
            case 1:
                completeWords[1]=words
                break;
            case 2:
                completeWords[2]=words
                break;
            default:
                break;
        }
         
    })
    console.log(completeWords,"成分:收尋關鍵字 ->浮動標題 -> 收尋結果")
    const RepeatCount={}
    
    completeWords[1].forEach((repeatWords,index0)=>{//用浮動標題去收尋結果看相符次數
        let counter=0
        const NewObj="str"+index0
        RepeatCount[NewObj]
        completeWords[2].forEach((BeCheck,Search)=>{
            if (BeCheck.includes(repeatWords)) {
                counter+=1
                RepeatCount[NewObj]=counter
            }
           
        })
        //如果收索字(名) 較多 或低於歌名 則判定無 ，若為歌名 ，歌名等大於收索結果
        //方法二 將影片網址傳給py後台去爬蟲音樂訊息
         
        
    })
    console.log("字重複次數",RepeatCount)
    //FloatK_W  和  completeWords 去比對
     
    
    

    const header={
        'Origin': 'https://cors-anywhere.herokuapp.com',
    }
    let SongSearchUrl=`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?apikey=${accessToken}&q=${SearchK_W}`
    
    // let SongSearchUrl=`https://api.genius.com/search?access_token=${accessToken}&q=${KeyWordList[0]}`
    axios.get(SongSearchUrl,{header:header})
        .then(response=>{
            
            console.log(response.data); 
             
            
            
        }).catch(err=>{
            console.log(err)
        })
    // axios.get(SongSearchUrl)
    //     .then(response=>{
            
    //         let ArtistArr=[]
    //         const artistArr=response.data.response.hits
    //         artistArr.forEach(a=>{
    //             ArtistArr.push(a.result)
                 
    //         })
    //         console.log(ArtistArr)
             
            
            
    //     }).catch(err=>{
    //         console.log(err)
    //     })

     
    return　
}
export default KeywordComparison