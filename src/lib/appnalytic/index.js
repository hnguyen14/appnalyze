import R from 'ramda'
import keywordExtractor from 'keyword-extractor'

export default async function analyzeApp (appId) {
  const url = `https://itunes.apple.com/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`
  const response = await fetch(url)

  if (!response.ok) {
    return {
      error: 'Error getting app review'
    }
  }

  const json = await response.json()

  const getReviews = R.compose(
    R.map(R.applySpec({
      id: R.path(['id', 'label']),
      rating: R.path(['im:rating', 'label']),
      title: R.path(['title', 'label']),
      content: R.path(['content', 'label'])
    })),
    R.filter(R.prop('im:rating')),
    R.path(['feed', 'entry'])
  )

  const reviews = getReviews(json)

  const rawTokenAnalysis = reviews.reduce((m, review) => {
    const tokens = keywordExtractor.extract(review.content,{
      language: 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false
    })
    return tokens.reduce((mt, token) => {
      if (!mt[token]) {
        mt[token] = {
          term: token,
          ratings: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
          },
          freq: 0
        }
      }
      mt[token].freq++
      mt[token].ratings[review.rating]++
      return mt
    }, m)
  }, {})
  const tokenAnalysis = R.compose(
    R.sortBy(R.compose(
      R.multiply(-1),
      R.prop('freq')
    )),
    R.reject(R.compose(
      R.lt(R.__, 2),
      R.prop('freq')
    )),
    R.values
  )(rawTokenAnalysis)

  return {
    reviews,
    tokenAnalysis
  }
}
