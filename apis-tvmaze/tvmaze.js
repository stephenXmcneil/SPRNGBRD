
/// /////////////////// API //////////////////////
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
async function searchShows (query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  const mapShow = item => {
    return {
      id: item.show.id,
      name: item.show.name,
      summary: item.show.summary,
      image: item.show.image ? item.show.image.original : 'https://via.placeholder.com/304x447.png'
    }
  }
  return response.data.map(mapShow)
}

/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */
async function getEpisodes (id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)

  // console.log(response.data);

  // TODO: return array-of-episode-info, as described in docstring above

  const episodes = response.data.map(episode => ({
    id: episode.id, name: episode.name, season: episode.season, number: episode.number
  }))

  return episodes
}

/// /////////////////// DOM //////////////////////
/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */
function populateShows (shows) {
  const $showsList = $('#shows-list')
  $showsList.empty()
  try {
    for (const show of shows) {
      const $item = $(renderShow(show))
      $showsList.append($item)
    }
  } catch (error) {
    alert('error')
  }
}

function renderShow (show) {
  return `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
  <div class="card" data-show-id="${show.id}">
  <img class="card-img-top" src="${show.image}">
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">${show.summary}</p>
    </div>
    <button onclick="showEpisodesByID(${show.id})">Get episodes</button>
  </div>
</div>
`
}

function clearSearchBar () {
  $('#search-query').val('')
}

async function showEpisodesByID (id) {
  const array = await getEpisodes(id)
  populateEpisodes(array)
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
function populateEpisodes (array) {
  const list = []
  for (const item of array) {
    list.push($(`<li>${item.name} (Season ${item.season}, number ${item.number})</li>`))
  }
  $('#episodes-list').empty().append(list)
  debugger
  document.querySelector('#episodes-area').setAttribute('style', 'display: block')
}

/// /////////////////// APP //////////////////////
function start () {
  /** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
  $('#search-form').on('submit', async function handleSearch (evt) {
    evt.preventDefault()

    const query = $('#search-query').val()
    if (!query) return

    $('#episodes-area').hide()

    const shows = await searchShows(query)

    populateShows(shows)
  })
  clearSearchBar()
}

start()
