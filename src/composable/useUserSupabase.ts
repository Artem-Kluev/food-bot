import { ref } from 'vue'
import { supabase } from '@/plugins/supabase'

const tgWebApp = window.Telegram?.WebApp
const initData = tgWebApp?.initData

async function userData(requsetData: any = {}) {
  const data = { initData, ...requsetData }

  try {
    await fetch('https://tvepxpvfbxxulgfwkexe.supabase.co/functions/v1/dynamic-handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data)

        return data
      })
      .catch(console.error)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export function getUser() {}
