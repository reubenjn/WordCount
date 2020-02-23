$(document).ready(function() {

    $("h1").on("click", function() {
        console.log(222);
    })

    let url = window.location.href.toString().split(window.location.host)[1];
    let isWordRoute = false;
    var urlWord;
    if (url.includes('/words/')) {
        isWordRoute = true;
        urlWord = url.split('/words/')[1];
    }

    if (isWordRoute) {
        $.getJSON(`/api/words/${urlWord}`)
        .then(addWordBreakdown)
        .catch((err) => {
            alert(`Uh oh. Something went wrong. ${err}`);
        })
    } else {
        $.getJSON('/api/words')
        .then(addMediaBreakdown)
        .catch((err) => {
            alert(`Uh oh. Something went wrong. ${err}`);
        })
    }
    

});

function addMediaBreakdown(mediaSources) {
    $("#home-view").append(Object.keys(mediaSources).map(source => {
        return `<div><h3>${source}</h3><ul class="word-count-list">${Object.keys(mediaSources[source]).map(wc => {
            return `<li><a href="/words/${wc}">${wc}</a>: ${mediaSources[source][wc]}</li>`
        }).join('')}</ul></div>`;
    }).join(''));
}

function addWordBreakdown(breakdowns) {
    toggleClasses(document.getElementById("home-view"), "hide", "show");
    toggleClasses(document.getElementById("word-view"), "hide", "show");
    let word = Object.keys(breakdowns)[0];
    $("#selected-word").text(word);
    Object.keys(breakdowns[word]).forEach(id => {
        let newCount = `<li><a href="https://${breakdowns[word][id].url}">${breakdowns[word][id].name}</a>: ${breakdowns[word][id].num}</li>`;
        $(".word-article-list").append(newCount);
    });
}

function toggleClasses(element, ...classNames) {
    classNames.forEach(name => element.classList.toggle(name));
}