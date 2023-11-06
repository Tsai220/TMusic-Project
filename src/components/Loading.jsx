import { Component, useEffect, useState } from "react"
import { LinearProgress,Typography } from "@mui/material"
import Layout from "./Layout"
 
class LoadingProgress extends Component {
    constructor(props){
        super(props)
        this.state={loadingProgress:0}

    }
    componentDidMount(){
        const simLoad=()=>{
            const timer=setInterval(()=>{
                if(this.state.loadingProgress<100){
                    this.setState({ loadingProgress:this.state.loadingProgress + 25})
                    // this.setState({ loadingProgress:this.state.loadingProgress + Math.floor(Math.random()*15)})
                    console.log(this.state.loadingProgress)
                }
                else{
                    clearInterval(timer)
                    return true
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
                <>
                    完成
                </>
            )

            }
            
        </div>
    }
}
export default LoadingProgress