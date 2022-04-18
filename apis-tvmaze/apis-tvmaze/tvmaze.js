/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */




/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
  console.log(res)

  return [
    {
      id: res.data[0].show.id,
      name: res.data[0].show.name,
      summary: res.data[0].show.summary,
      image: res.data[0].show.image.original
    }
  ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    if (show.image === null) {
      let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         
           <div class="card-body">
           <img class="card-img-top" src="https://tinyurl.com/tv-missing">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button id="btn-episode">Episodes</button>
         </div>
       </div>
      `);
      $showsList.append($item);
    } else {
      let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         
           <div class="card-body">
           <img class="card-img-top" src="${show.image}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button id="btn-episode">Episodes</button>
         </div>
       </div>
      `);
      $showsList.append($item);
    }
  }

}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);

});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
  console.log(res)


  // TODO: return array-of-episode-info, as described in docstring above
  let episodes = res.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));

  return episodes;
}

async function populateEpisodes(arrData) {
  const $ul = $("#episodes-list");
  $ul.empty() //clear list
  for (let info of arrData) {
    //make a li
    let $newLI = $(`<li> ${info.name} (${info.season}, ${info.number}) </li>`)
    //append li
    $ul.append($newLI)
  }
  $("#episodes-area").show();
}

$("#shows-list").click(async function (evt) {
  console.log(evt)
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);
});