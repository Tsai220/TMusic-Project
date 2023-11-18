
import { LinearProgress,Typography } from "@mui/material"
import LogoTMusic from "./components/logo";
class LoadingProgress extends Component {
    
    constructor(props){
        super(props)
        
        
        this.state={loadingProgress:props.loadingProgress,isLoadDone:props.isLoadDone,FirstTimeInProps:sessionStorage.getItem("FirstIn")}
        console.log(typeof(this.state.FirstTimeInProps))
    }
    
    componentDidMount(){
        console.log(this.state.FirstTimeInProps)
        if(this.state.FirstTimeInProps=='true'){
            const simLoad=()=>{
                
                const timer=setInterval(()=>{
                    if(this.state.loadingProgress<100){
                        //this.setState({ loadingProgress:this.state.loadingProgress +15})
                        this.setState({ loadingProgress:this.state.loadingProgress + Math.floor(Math.random()*20)})
                        
                    }
                    else{
                        clearInterval(timer)
                        this.setState({isLoadDone:true ,loadingProgress:100,FirstTimeInProps:'false'})
                        
                        return this.state.isLoadDone ,this.state.loadingProgress  ,this.state.FirstTimeInProps
                    }
                },500)
            }
            simLoad()
        }else{
            this.setState({isLoadDone:true ,loadingProgress:100,FirstTimeInProps:'false'})
            return this.state.isLoadDone==true ,this.state.loadingProgress   ,this.state.FirstTimeInProps
        }
            
    }
    
    render(){
        return <div>
            { this.state.FirstTimeInProps=='true' ? ( <div className="progress" style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",textAlign:"center"}}>
                    <LogoTMusic  />
                    <br/>
                    <div  style={{display:"flex", alignItems:"center" , justifyContent:"center",width:"70%"}}>
                        <LinearProgress  variant="determinate" value={this.state.loadingProgress} style={{width:"50%"}} />
                        &nbsp;<Typography variant="h6" >{this.state.loadingProgress}%</Typography>
                        
                    </div>
                </div>
            ):(

                none
                 

            )
            }
            
            
        </div>
    }
}

export default LoadingProgress