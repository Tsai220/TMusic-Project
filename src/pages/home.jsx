import "../style/home.css"
import { v4 } from "uuid"

const Home=()=>{
     
    const cotent=[{
        ImgSrc:"https://hakoniwalily.jp/cms/wp-content/uploads/2023/01/b9155f633d539d8d62a45bef29b75f59.jpg",
        title:"Winter Vox",
        descr:"新規書き下ろし3曲を含む計4曲収録のミニアルバム！",
    },{
        ImgSrc:"https://hakoniwalily.jp/cms/wp-content/uploads/2021/09/544096174f30a0e7c348938fb6427b35.jpg",
        title:"コガネゾラ",
        descr:"「ハコニワリリィ」待望のメジャーデビューシングル",
    },{
        ImgSrc:"https://hakoniwalily.jp/cms/wp-content/uploads/2021/09/544096174f30a0e7c348938fb6427b35.jpg",
        title:"コガネゾラ",
        descr:"「ハコニワリリィ」待望のメジャーデビューシングル",
    },{
        ImgSrc:"https://hakoniwalily.jp/cms/wp-content/uploads/2021/09/544096174f30a0e7c348938fb6427b35.jpg",
        title:"コガネゾラ",
        descr:"「ハコニワリリィ」待望のメジャーデビューシングル",
    }]
    return <>
    
        <div className="container">
            <h3>每日精選</h3>{/*分類*/ }
            {/* .map */}
            <div className="daily_hightLight">
                 
                {
                    cotent.map((a)=>{
                        return(
                            <div className="dailyList" key={v4()} >
                                <img src={a.ImgSrc} width="100%" alt="" className="cd_cover"/>
                                <p>{a.title}</p>
                                <p>{a.descr}</p>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
        
    </>
        
    
}
export default Home