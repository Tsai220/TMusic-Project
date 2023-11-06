import { Component, useEffect, useState } from "react"
import { LinearProgress,Typography } from "@mui/material"
import Layout from "./Layout"
 
class LoadingProgress extends Component {
    constructor(props){
        super(props)
        this.state={loadingProgress:props.loadingProgress,isLoadDone:props.isLoadDone}

    }
    componentDidMount(){
        const simLoad=()=>{
            const timer=setInterval(()=>{
                if(this.state.loadingProgress<100){
                    this.setState({ loadingProgress:this.state.loadingProgress + 25})
                    // this.setState({ loadingProgress:this.state.loadingProgress + Math.floor(Math.random()*15)})
                    
                }
                else{
                    clearInterval(timer)
                    this.setState({isLoadDone:true ,loadingProgress:100})
                    return this.state.isLoadDone==true ,this.state.loadingProgress , console.log(this.state.isLoadDone ,this.state.loadingProgress)
                }
            },600)
        }
        simLoad()
    }
    render(){
        return <div>
            {this.state.loadingProgress<100? ( <>
                    <h1>Loading...</h1>
                    <div className="progress_div" style={{display:"flex", alignItems:"center" , justifyContent:"center"}}>
                        <LinearProgress  variant="determinate" value={this.state.loadingProgress} style={{width:"50%"}} />
                        &nbsp;<Typography variant="h6" >{this.state.loadingProgress}</Typography>
                        
                    </div>
                </>
            ):(
                <></>
            )

            }
            
        </div>
    }
}
export default LoadingProgress