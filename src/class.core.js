import moment from 'moment' ;

export class Core {

static setFetchHeaders(body={},headers={})
    {
    let def = {
              method: "GET",
              headers:
                  {
                  Authorization: this.Authorization||'',
                  "Content-Type": 'Application/json',
                  }
              }
    let t = Object.assign(def,headers)
    if(Object.keys(body).length>0)
        {
        if(! ('body' in t))
            {
            t.body= JSON.stringify(body)
            }
        }

    return  t;
    }

static setFetchOptions(body= {}, headers={})
    {
    return this.setFetchHeaders(body, headers) ;
    }

// call to fetch the resource here
static goFetch(url,options,callback)
    {
    return fetch(url,options)
            .then((resp)=>{return resp.json()})
            .then((json)=>
                {
                if(callback)
                  {
                  callback(json)
                  }

                return json ;
                })
            .catch(e=>{
              console.log('fetch error', e)
              return Error(e) ;
            })
    }

static socketSend(data)
    {
    // data = {url:"",options:{}} ;
    // endpoint = inventory | category | Order |
    if(this.socket)
      this.socket.send(data)
    }

// for inbound ids into indexedDb
// sample usage [{name:"ayo", mail:"ade@me.com"}]  ;
// set_db_id('email', [{name:"ayo", mail:"ade@me.com"}] )
// returns [{id:ade@me.com, name:"ayo",mail:"ade@me.com"}]
static setDbId(key,input)
    {
    if(Array.isArray(input))
        {
        for(let i = 0 ; i < input.length; i++)
            {
            input[i]['id'] = input[i][key] ;
            }
        return input ;
        }

    return input
    }
}

export default Core ;
