import React, { Children, Component } from 'react'
import { ThemeConsumer } from 'styled-components';
import {storeProducts, detailProduct} from './data'

const ProductContext=React.createContext();
const allCategory = ['All' , ...new Set(storeProducts.map((c)=>c.category))];

class ProductProvider extends Component {
    state={
        products:[],
        copyProducts:[],
        detailProduct:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        categories:allCategory,
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts=()=>{
        let tempProducts=[];
        storeProducts.forEach(item=>{
            const singleItem={...item};
            tempProducts=[...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {products:tempProducts,copyProducts:tempProducts}
        })
    }
    getItem = (id) =>{
        const product=this.state.products.find(item=>item.id===id);
        return product;
    }
    handleDeatil=(id)=>{
       const product=this.getItem(id);
       this.setState(()=>{
           return {detailProduct:product}
       })
    }
    addToCart=(id)=>{
       let tempProduct = [...this.state.products];
       const index=tempProduct.indexOf(this.getItem(id));
       const product=tempProduct[index];
       product.inCart=true;
       product.count=1;
       const price=product.price;
       product.total=price;
       this.setState(()=>{
           return {products:tempProduct, cart:[...this.state.cart,product]};
       },()=>{this.addTotal()})

    }
    openModal=(id)=>{
        const product=this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true}
        })
    }
    closeModal=()=>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    increment = (id) =>{
        let tempCart=[...this.state.cart];
        const chosenProduct=tempCart.find(item=>item.id===id);
        const index=tempCart.indexOf(chosenProduct);
        const product=tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return {cart:[...tempCart]}
        },()=>{
            this.addTotal();
        })    
    }
    decrement = (id) =>{
    
        let tempCart=[...this.state.cart];
        const chosenProduct=tempCart.find(item=>item.id===id);
        const index=tempCart.indexOf(chosenProduct);
        const product=tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id);
        }else{
             product.total = product.count * product.price;
               this.setState(()=>{
            return {cart:[...tempCart]}
        },()=>{
            this.addTotal();
        })  
        }

      
    }
    removeItem = (id) =>{
        let tempProducts=[...this.state.products];
        let tempCart=[...this.state.cart];
        tempCart=tempCart.filter((item)=>item.id !== id);
        const index=tempProducts.indexOf(this.getItem(id));
        let removeProduct=tempProducts[index];
        removeProduct.inCart=false;
        removeProduct.count=0;
        removeProduct.total=0;

        this.setState(()=>{
            return {
                cart:[...tempCart],
                products:[...tempProducts],
            }
        },()=>{
            this.addTotal();
        })
    }
    clearCart = (id) =>{
       this.setState(()=>{
           return {cart:[]}
       },()=>{
           this.setProducts();
           this.addTotal();
       })
    }
    addTotal = () =>{
        let subTotal=0;
        this.state.cart.map(item=>subTotal+=item.total);
        const tempTax=subTotal*0.20;
        const tax=parseFloat(tempTax.toFixed(2));
        const total=subTotal+tax;
        this.setState(()=>{
           return {cartSubTotal:subTotal,
            cartTax:tax,
            cartTotal:total
            }
        })
    }
        // handleCate =(category) =>{;
        // let tempProduct=[...this.state.products];
        //     const newItem = tempProduct.filter((item)=> item.category === category)
        //     this.setState(()=>{
        //          return {products:[...newItem]}
        //     })
        // }
    // componentDidMount()
    // {
    //              this.setCategories();
    // }
    setCategories = (category) =>{
        let tempProducts=[...this.state.copyProducts];
        if(category === 'All'){
            this.setState(()=>{
               return {products:[...tempProducts]}
            },()=>{
                this.setProducts();
            })
        }
    
        //  let newItem=[...this.state.products];
     
   const newItem = tempProducts.filter((item)=> item.category === category)
  
         this.setState(()=>{
        
               return {products:[...newItem]}
            })
    }
    // tester=()=>{
    //     console.log('store',this.state.products[0].inCart)
    //     console.log('data',storeProducts[0].inCart);

    //     const tempP=[...this.state.products]
    //     tempP[0].inCart=true;
    //     this.setState(()=>{
    //         return {products:tempP};
    //     },()=>{
    //     console.log('store',this.state.products[0].inCart)
    //     console.log('data',storeProducts[0].inCart);
    //     })
    // }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDeatil:this.handleDeatil,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                addTotal:this.addTotal,
                setCategories:this.setCategories,
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}