import { configureStore } from '@reduxjs/toolkit';
import listsSlice from "./listsSlice";


export default configureStore ({
    reducer: {
        lists: listsSlice
    }
})



// import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice'


// export default configureStore({
//     reducer: {
//         todos: todoReducer,
//     }
// })