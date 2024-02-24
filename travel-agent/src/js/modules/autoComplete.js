import autoComplete from "@tarekraafat/autocomplete.js";
import countryList from "./../helpers/countryList";

function autoCompleteFunc() {
  const autoCompleteJS = new autoComplete({
    selector: "#autoCompleteCountry",
    placeHolder: "e.g. Bali, Indonesia",
    data: {
      src: countryList,
      keys: ["name"],
      cache: true,
    },
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Create "No Results" message element
          const message = document.createElement("div");
          // Add class to the created element
          message.setAttribute("class", "no_result");
          // Add message text content
          message.innerHTML = `<span>No Results for "${data.query}"</span>`;
          // Append message element to the results list
          list.prepend(message);
        }
      },
      noResults: true,
    },
    resultItem: {
      highlight: true,
    },
    events: {
      input: {
        selection: (event) => {
          const selection = event.detail.selection.value.name;
          autoCompleteJS.input.value = selection;
        },
      },
    },
    searchEngine: "strict",
  });
}

export default autoCompleteFunc;
