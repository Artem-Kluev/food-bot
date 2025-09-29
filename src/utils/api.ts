export const validateUser = async (initData: any, userData = {}) => {
  try {
    const response = await fetch(`https://tvepxpvfbxxulgfwkexe.supabase.co/functions/v1/dynamic-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        initData,
        userData,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Validation failed')
    }

    return result
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}