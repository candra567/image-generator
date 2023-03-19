const form = document.querySelector("form");
const cardBody = document.querySelector(".card-body");
const SecretKey = "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";
const input=document.querySelector('form input[type="text"]')
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    try {
    	cardBody.innerHTML=renderSpiner()
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-TYpe": "application/json",
                "Authorization": `Bearer ${SecretKey}`
            },
            body: JSON.stringify({
                "prompt": input.value,
                "n": 1,
                "size": "1024x1024"
            })
        })
        const result = await response.json();
        if (result.hasOwnProperty("data")) {
            let image = `<img src="${result.data[0].url}" alt="image loading" width="100%" height="100%">`;
            cardBody.innerHTML = image;
        } else if (result.hasOwnProperty("error")) {
            let p = `<div class='alert alert-danger alert-sm'>${result.error.message}</div>`;
            cardBody.innerHTML = p;
        }
        this.reset();


    } catch (m) {
        let p = `<div class='alert alert-danger alert-sm'>${m}</div>`;
        cardBody.innerHTML = p;
    }
})


function renderSpiner(){
	return `
     <div class="d-flex justify-content-center">
      <div class="spinner-grow spinner-grow-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      <div class="spinner-grow spinner-grow-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      <div class="spinner-grow spinner-grow-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>

     </div>
	`
}