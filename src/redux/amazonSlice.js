import { createSlice } from '@reduxjs/toolkit';

const initialState={
    products:[],
    userInfo: null,
    whishList:[],
}

export const amazonSlice = createSlice({
    name:"amazon",
    initialState,
    reducers:{
        incrementByAmount: (state, action) => {
            state.value += action.payload
          },
        addToCart: (state,action) => {
            state.products = [...state.products,action.payload];
            // console.log("action.payload.id")
            // console.log(action.payload.id)
            // console.log("item.id")
            // console.log(state.products.find((items)=>items.id))
            const SameItems=state.products.find((item)=>item.id===action.payload.id);
            //  console.log(SameItems);
            // console.log("********");
                if(SameItems){
                    console.log("if");
                    SameItems.quantity += action.payload.quantity;
                    // console.log(items.quantity);
                    // console.log("&&&&&&---&");
                }else{
                    console.log("else");
                    SameItems.quantity = action.payload.quantity;
                    state.products.push(action.payload);
                }
        },
        addToWhishlist: (state,action)=>{
            state.whishList=[...state.whishList, action.payload];
            state.whishList.push(action.payload);
            console.log(state.whishList);
        },
        deleteItem: (state,action) =>{
            state.products = state.products.filter((items)=>items.id!==action.payload)
        },
        resetCart: (state)=>{
            state.products=[]
        },
        incrementQuantity:(state,action)=>{
            const item = state.products.find((items)=>items.id === action.payload);
            item.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const item = state.products.find((items)=>items.id === action.payload);
            if(item.quantity === 1){
                item.quantity = 1;
            }else{
                item.quantity --;
            }
        },
        setUserInfo: (state,action)=>{
            state.userInfo=action.payload
        },
        userLogout:(state)=>{
            state.userInfo=null;
        },
        viewProductDetails:(state, action)=>{
            state.products = [...state.products,action.payload];
            console.log("action.payload.id")
            console.log(action.payload.id)
        }
      
    }
})

export const{ addToCart, deleteItem, resetCart, incrementQuantity , decrementQuantity, setUserInfo, userLogout, addToWhishlist, viewProductDetails }=amazonSlice.actions;

export default amazonSlice.reducer;