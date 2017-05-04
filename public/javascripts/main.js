document.addEventListener("DOMContentLoaded", function(event) {

    const config = [{
            text: "Relay 1"
        }, {
            text: "Relay 2"
        },
        {
            text: "LED 1",
            icon: "fa fa-lightbulb-o"
        }, {
            text: "LED 2",
            icon: "fa fa-lightbulb-o"
        },
        {
            text: "Dance"
        }
    ]
    const generalCssClass = 'column box';
    const activeCssClass = `is-success`;
    const buttHolder = document.getElementsByClassName('columns')[0];

    for (var relayNumber = 1; relayNumber < 5; relayNumber++) {
        const columnWrapper = document.createElement("div");
        columnWrapper.setAttribute('class', 'column');
        const butt = document.createElement('div');
        // butt.setAttribute('class', `${getCssClass()} ${config[relayNumber - 1].cssClass}`);
        butt.setAttribute('data-id', relayNumber);

        butt.innerText = config[relayNumber - 1].text;
        console.log(config[relayNumber - 1].icon);
        axios.get(`/relays/${relayNumber}/status`)
            .then(res => {
                if (res.data.status !== 1) {
                    // it's on 
                    butt.setAttribute('class', 'notification is-success');
                } else {
                    butt.setAttribute('class', 'notification');
                }
            })
            .catch(error => {
                console.log(error);
            });

        columnWrapper.appendChild(butt);
        buttHolder.appendChild(columnWrapper);
    }

    const buttons = document.querySelectorAll(".column")

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (e) => {
            const id = e.target.getAttribute("data-id");

            axios.get(`/relays/${id}`)
                .then(res => {
                    if (res.data.status !== 1) {
                        console.log(e.target)
                        e.target.setAttribute('class', 'notification is-success');
                    } else {
                        e.target.setAttribute('class', 'notification');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    }

    const dance = document.querySelector('#dance');
    dance.addEventListener('click', (e) => {
        e.target.setAttribute('class', 'notification is-success')

        axios.get('relays/dance?first=7&second=11').then(res => {
            console.log('s')
        })
    })
    console.log(dance)
});