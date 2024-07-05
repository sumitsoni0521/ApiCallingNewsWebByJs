const apiKey = "f5f2544cda6b434f8e82596529f022c6";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}


searchButton.addEventListener("click", async () =>{
	const query = searchField.value.trim()
	if (query !== "") {
		try {
			const articles = await fetchNewsQuery
			(query)
			displayBlogs(articles)
		} catch (error) {
			console.log("Error fetching news by query", error)
		}
	}
})

async function fetchNewsQuery(query) {
	try {
		const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data.articles;
	  } catch (error) {
		console.error("Error fetching random news", error);
		return [];
	  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((articles) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");

    img.src = articles.urlToImage;
    img.alt = articles.title;

    const title = document.createElement("h2");
    const truncatedTitle =
      articles.title > 30
        ? articles.title.slice(0, 20) + "...."
        : articles.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const truncatedDes =
      articles.description > 120
        ? articles.title.slice(0, 120) + "...."
        : articles.description;
    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
	blogCard.addEventListener("click", () =>{
		window.open(articles.url, "_blank");
	});
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
