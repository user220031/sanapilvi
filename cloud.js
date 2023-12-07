/*  Funktio päivittää sanapilven parametrin "button" perusteella.
    Jos parametri on
        - "add", lisätään sana sanapilveen, ja
        - "clear", tyhjennetään sanapilvi.
    Muutoin, eli kun parametria ei ole annettu,
        - laitetaan sanapilven sisällöksi oletussanat.

    Sanapilven sisältö perustuu listaan, eli päivitykset muuttavat
    listan "words" sisältöä. Sanalistaa pidetään sessionStoragessa,
    eli se säilyy tässä esimerkissä vain session ajan ja tyhjenee
    esimerkiksi käyttökertojen välissä (kun selain suljetaan).

    Itse sanapilven rakentamiseen käytetään wordcloud2-kirjastoa.
*/
function updateCloud(button) {
    const defaultWords =
        [["HTML", 30], ["CSS", 20], ["JavaScript", 50]];
    let words = [];

    // Sanalista päivitetään if-else if-else -rakenteessa
    if (button == "add") {
        newWord = [document.getElementById("word").value,
            document.getElementById("weight").value];
        words = sessionStorage.getItem("words");
        if (words == null) {
            words = [newWord];
        } else {
            words = JSON.parse(words);
            words.push(newWord);
        }
        sessionStorage.setItem("words", JSON.stringify(words));
    } else if (button == "clear") {
        words = [];
        sessionStorage.removeItem("words");
    } else {
        words = defaultWords;
        sessionStorage.setItem("words", JSON.stringify(words));
    }

    // Sanapilvi rakennetaan wordcloud2-kirjastoa käyttäen
    WordCloud(document.getElementById("canvas"),
        { list: words } );
}