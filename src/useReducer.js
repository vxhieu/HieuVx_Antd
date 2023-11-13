import React, { useReducer } from "react";
import logo from './assets/img/loading.gif'
import "./assets/styles/loading.css"
const initialState = {
  loading: false,
  data: [],
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "PROCESS_USER":
      return { ...state, loading: true, error: null };
    case "PROCESS_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case "PROCESS_USER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    default:
      return state;
  }
};

const DataUser = () => {
  const [userData, dispatchUser] = useReducer(userReducer, initialState);

  const getUser = async () => {
    dispatchUser({
      type: "PROCESS_USER",
    });

    setTimeout( ()=>fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=us&limit=5&appid=0031e0bab1945249918ed35b635b4d76"
      )
        .then(response =>  response.json())
        .then((response) => {
          dispatchUser({
              type: "PROCESS_USER_SUCCESS",
              data:response
            });
        })
        .catch((error)=>{
          dispatchUser({
              type: "PROCESS_USER_ERROR",
              data:error
            });
          throw new Error(error);
        }),5000000)
  };
  const LoadingIndicator = () => (
    <div className="loading-wrap">
      <div className="loading-indicator">
     <img src="https://i.gifer.com/XOsX.gif" alt="...Loading" />
    </div>
    </div>
  );
  const handleKeyPress = (event) => {
    alert(1);
    if (event.key === "Enter") {
      getUser();
    }
  };
 
  return (
    <div>
      {userData.loading && <LoadingIndicator />}
      <div className="userData">
        {userData.loading ? (
         <p>...Loading</p>
        ) : userData.error ? (
          <p>Error: {userData.error}</p>
        ) : (
          <p>{JSON.stringify(userData.data)}</p>
        )}
      </div>
      <button onKeyUp={handleKeyPress}>
        Dispatch
      </button>
    </div>
  );
};

export default DataUser;
