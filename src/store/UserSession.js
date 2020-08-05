import moment from 'moment' ;

const UserSession = {
  namespaced:true,

  state:{
    token:'',
  },

  mutations:{
    SET_SESSION_TOKEN(state, payload){
      // should probably check payload first ;
      state.token = payload ;
    }
  },

  actions:{

  },

  getters:{
    // check if the user token is still usable
    getSessionToken(state){
      let token = state.token ;
      return token //  ; // data here may be stale, state.session_token,
      },

    parseSessionToken(state, getters){
      let token = getters['getSessionToken'] ; // data here may be stale, ,

      if(token)
        {
        token = token.split('.') ;
        token = JSON.parse(atob(token[1] ) ) ;
        return token;
        }

      return null
    },

    isSessionActive(state, getters){
      let token = getters.parseSessionToken;
      if(token)
        {
        let exp = parseInt(token.exp) ;
        let now = moment().format('X') ;
        if(exp > now)
          return true

        return false ;
        }

      return null
      }
  }
}

export default UserSession ;
