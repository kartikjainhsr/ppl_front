/* eslint-disable */
import React, { Component } from 'react';

class Verify extends Component{


    componentDidMount(){            
              let option = {
                headers : {'Accept' : 'application/json','Content-Type':'application/json',},
                method : 'Post',
                body : JSON.stringify({id:this.props.match.params.id})
              };
              fetch("http://localhost:5000/verify",option)
              .then((response)=>{
        
        
        
                if(response.status==200)
                {
                  response.text().then((action)=>
                  {
                    
                    if(action == 'ok')
                        {
                        this.props.history.push('/login');
                      }
                      
                    else
                        {
                        
                        this.props.history.push('/error');
                      }
                    
                    
                    
                  })
                }
                else{
                    this.props.history.push('/error');
                }
               
              })
        
        
              .catch((err)=>{  
              console.log('Fetch Error :-S', err);  
              if(err)
              this.props.history.push('/error');
            });
          };
        











    

    

    
    
    render() {
        return(
            <div>

            </div>
        )
    }
}

export default Verify;