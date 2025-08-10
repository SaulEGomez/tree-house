const handleSubmit = async (e, formData, submissionType, setLoading, setSuccess, formType = null) => {
	e.preventDefault()
	setLoading(true)
  
	try {
	  // 1) Send email
	  const emailRes = await fetch('/api/send-email', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ formData, formType }),
	  })
	  const emailJson = await emailRes.json()
	  if (!emailRes.ok || !emailJson?.success) {
		setSuccess('Failed to send the email.')
		throw new Error(emailJson?.message || 'Email failed')
	  }
  
	  // 2) Save submission in Sanity (server-side)
	  const saveRes = await fetch('/api/submissions', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ submissionType, formData }),
	  })
	  const saveJson = await saveRes.json()
	  if (!saveRes.ok || !saveJson?.ok) {
		setSuccess('Failed to submit the form.')
		throw new Error(saveJson?.error || 'Save failed')
	  }
  
	  setSuccess('Thank you! Your submission was successful.')
	} catch (err) {
	  console.error('Error submitting the form:', err)
	  setSuccess('Failed to submit the form.')
	} finally {
	  setLoading(false)
	}
  }
  
  export default handleSubmit
  