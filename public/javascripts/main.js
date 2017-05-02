document.addEventListener("DOMContentLoaded", function(event) {

    for (var j = 0; j < 4; j++) {
        const buttHolder = document.getElementsByClassName('buttons')[0];
        const butt = document.createElement("a");
        butt.setAttribute('class', 'button is-large');
        butt.setAttribute('data-id', j + 1);
        butt.innerText = j + 1;
        axios.get(`/relays/${j + 1}/status`)
            .then(res => {
                if (res.data.status !== 1) {
                    // it's on 
                    butt.setAttribute('class', 'button is-large is-success');
                }
            })
            .catch(error => {
                console.log(error);
            });

        buttHolder.appendChild(butt);

        //<a data-id="1" class="button is-large">1</a>
    }




    const buttons = document.querySelectorAll(".button")

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {
            const id = e.target.getAttribute("data-id");

            axios.get(`/relays/${id}`)
                .then(res => {
                    if (res.data.status !== 1) {
                        e.target.setAttribute('class', 'button is-large is-success')
                        console.log(e.target);
                    } else {
                        e.target.setAttribute('class', 'button is-large')
                    }
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    }
});