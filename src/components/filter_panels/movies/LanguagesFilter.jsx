import React, {useState, useEffect} from 'react'

function LanguagesFilter({selectedProvider, setSelectedProvider}) {

        const [languages, setLanguages] = useState([])
        const [providers, setProviders] = useState([])
        const [selectedCountry, setSelectedCountry] = useState(null)

        const API_KEY=import.meta.env.VITE_TMDB_KEY;

        const [userCountryCode, setUserCountryCode] = useState(null);


  // kendime not user'ın ülkesi bulmak ve başlangıç provider'larını otomatik çağırmak için aşşağıdaki iki side effecti kullandık

    useEffect(() => {
      fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data =>{
          console.log(data.country)
          setUserCountryCode(data.country)})
        .catch(err => console.log(err));

    }, []);

    useEffect(()=>{
      if(userCountryCode)
      {
      const providerURL =`https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&watch_region=${userCountryCode}`
      fetch(providerURL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProviders(data.results)
      })
      .catch(err=>console.log(err)) 
    }
    },[languages,userCountryCode]);


    useEffect(() => {
  if (languages.length && userCountryCode) {
    const found = languages.find(l => l.iso_3166_1 === userCountryCode);
    console.log(found)
    if (found) {
      setSelectedCountry(found.english_name)
      getProviders(userCountryCode);
    }
  }
}, [userCountryCode]);


    useEffect(()=>{

      fetch(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${API_KEY}`)
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
          setLanguages(data.results)})
      .catch(err=>console.log(err)) 

    },[]);



    function getProviders(dt){
        const providerURL =`https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&watch_region=${dt}`
        fetch(providerURL)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProviders(data.results)
        })
        .catch(err=>console.log(err)) 
      }

  return (
    <>

        <h3 className='sort-results-title'>Country</h3>
          <select value={userCountryCode || ""} onChange={(e)=>getProviders(e.target.value)} name="where-to-watch" id="countries">
            <option value="" disabled hidden>{selectedCountry || "Select a country"}</option>
            {
            languages?.sort().map((language)=>{
              return <option key={language.iso_3166_1} value={language.iso_3166_1}>{language.english_name}</option>})}
          </select>
          <section className='provider-list'>
            {providers?.map(provider=>
            <img
            key={provider.provider_id}
            src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
            alt={`${provider.provider_name}`}
            onClick={() => setSelectedProvider(provider.provider_id)}
            style={{
              border: selectedProvider === provider.provider_id ? "3px solid rgb(255, 136, 0)" : "none",
              cursor: "pointer",
            }}/>)}
          </section>
      
    </>
  )
}

export default LanguagesFilter
