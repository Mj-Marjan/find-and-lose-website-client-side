export const myItemPromise = (email, accessToken) => {
    return fetch(`https://lost-found-project.vercel.app/my-items?email=${email}`,{
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => res.json());
}