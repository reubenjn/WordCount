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

function addMediaSources(sources) {
    sources.forEach(src => {
        let newSrc = `<h3>${src}</h3>
                    <ul class="word-count-list"></ul>`;
        $("#media-lists").append(newSrc);
    })
}

function addMediaBreakdown(mediaSources) {
    $("#home-view").append(Object.keys(mediaSources).map(source => {
        return `<div><h3>${source}</h3><ul class="word-count-list">${Object.keys(mediaSources[source]).map(wc => {
            return `<li><a href="/words/${wc}">${wc}</a>: ${mediaSources[source][wc]}</li>`
        }).join('')}</ul></div>`;
    }).join(''));
}

function addWords(words) {
    words.forEach(word => {
        addWord(word);
    });
}

function addWord(word) {
    let newWord = `<li><a href="/words/${word.word}">${word.word}</a>: ${word.num}</li>`;
    $(".word-count-list").append(newWord);
}

function addWordBreakdown(breakdowns) {
    console.log(breakdowns);
    console.log(2);
    toggleClasses(document.getElementById("home-view"), "hide", "show");
    toggleClasses(document.getElementById("word-view"), "hide", "show");
    breakdowns.forEach(breakdown => {
        console.log(breakdown);
        let newCount = `<li>${breakdown.source} — <a href="https://${breakdown.url}">${breakdown.articleName}</a>: ${breakdown.num}</li>`;
        $(".word-article-list").append(newCount);
    });
}

function toggleClasses(element, ...classNames) {
    classNames.forEach(name => element.classList.toggle(name));
}