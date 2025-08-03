import { apiVersion, dataset, projectId, apiToken } from '../sanity/env';

const handleSubmit = async (e, formData, submissionType, setLoading, setSuccess, formType = null) => {
	e.preventDefault();
	setLoading(true);

	try {
		// Step 1: Send the email by calling the Next.js API route
		const emailResponse = await fetch('/api/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ formData, formType }),
		});

		const emailResult = await emailResponse.json();

		if (emailResult.success) {
			const response = await fetch(
				`https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true&returnDocuments=true&visibility=sync`,
				{
					headers: {
						accept: 'application/json',
						'content-type': 'application/json',
						Authorization: `Bearer ${apiToken}`,
					},
					method: 'POST',
					body: JSON.stringify({
						mutations: [
							{
								create: {
									_type: submissionType,
									...formData,
								},
							},
						],
					}),
				}
			);

			if (response.ok) {
				setSuccess("Thank you! Your submission was successful.");
			} else {
				setSuccess('Failed to submit the form.');
				throw new Error('Failed to submit the form.');
			}
		} else {
			setSuccess('Failed to send the email.');
			throw new Error(emailResult.message);
		}
	} catch (err) {
		setSuccess('Failed to submit the form.');
		console.error('Error submitting the form:', err);
	} finally {
		setLoading(false);
	}
};

export default handleSubmit;
