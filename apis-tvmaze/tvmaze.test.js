// Any repetitive set up should be added to a beforeAll()

describe('testing start up functions', function () {
  it('should clear input value', function () {
    const input = document.querySelector('input')
    input.value = 'Disney'
    clearSearchBar()
    expect(input.value).toBe('')
  })

  it('should', function () {

  })
})

// use afterEach() to remove any lasting changes made by the tests so the main code doesn't run into issues

async function testGettingEpisodesForShow () {
  const showID = 1767
  const showEpisodes = await getEpisodes(showID)
  populateEpisodes(showEpisodes)
}

async function testPopulateEpisodes () {
  const testData = [{
    id: 152953,
    url: 'https://www.tvmaze.com/episodes/152953/the-bletchley-circle-2x01-blood-on-their-hands-part-1',
    name: 'Blood on Their Hands, Part 1',
    season: 2,
    number: 1,
    type: 'regular',
    airdate: '2014-01-06',
    airtime: '',
    airstamp: '2014-01-06T12:00:00+00:00',
    runtime: 45,
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/9/24723.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/9/24723.jpg'
    },
    summary: "<p>Former Bletchley Park worker Alice Merren is in prison awaiting trial for the murder of the eminent scientist John Richards. Driven by her belief in Alice's innocence and that she is hiding the truth about John's death, Jean attempts to regroup the circle in order to help establish the innocence of one of their own.</p>",
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/152953'
      }
    }
  }]

  populateEpisodes(testData)
}
