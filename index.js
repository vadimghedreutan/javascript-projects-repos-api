import { startLoader, stopLoader } from "./helpers.js";
import FetchWrapper from "./fetch-wrapper.js";

const GithubAPI = new FetchWrapper("https://api.github.com/");

const form = document.querySelector("#repos-form");
const username = document.querySelector("#github-username");
const button = document.querySelector("#get-repos");
const list = document.querySelector("#repos-list");

function removeSpaces(string) {
  return string.split(" ").join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  startLoader(button);
  GithubAPI.get(`users/${removeSpaces(username.value)}/repos`)
    .then((data) => {
      list.innerHTML = "";
      try {
        data.forEach((repo) => {
          list.insertAdjacentHTML(
            "beforeend",
            `<li class='bg-gray-700 p-6 rounded-md shadow-sm hover:-translate-y-0.5 transform transition duration-300'>
                    <a href="${repo.html_url}" target="_blank">
                        <h2 class="font-semibold">${repo.full_name}</h2>
                        <p class="text-sm text-gray-400">${repo.description}</p>
                    </a>
                </li>`
          );
        });
      } catch (error) {
        console.log(error, "user not found");
      }
    })
    .finally(() => {
      stopLoader(button, "Get repos");
    });
});
