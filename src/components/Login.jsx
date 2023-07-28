import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from '../supabaseClient'
import Home from './Home'


export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
    <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    view="sign_in"
    onlyThirdPartyProviders={false}
    />
    
    )
  }
  else {
    return (<Home />)
  }
}