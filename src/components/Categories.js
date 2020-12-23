import React from 'react'
import {ProductConsumer} from '../context'
import { ButtonContainer} from './Button'

export default function Categories() {
    return (
            <div className='row'>
                  <div className="col-10 mx-auto my-2 text-center">
                        <ProductConsumer>
                    {value=>{ 
                         return   value.categories.map((category,index)=>{
        return <ButtonContainer  
      onClick={()=>value.setCategories(category)} >{category}</ButtonContainer>
      })}
      
                    }
                </ProductConsumer>
                  </div>
                
            </div>
        )
}
