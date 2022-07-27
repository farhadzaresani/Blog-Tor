
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Components/userReducer';


export default configureStore({

  reducer:{
    users: userReducer,
  }
}
);

