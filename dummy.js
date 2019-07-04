/**
 * Generate N dummy records into DatoCMS
 *
 * Made to work with the Gatsby DatoCMS starter
 */
const SiteClient = require('datocms-client').SiteClient;
const client = new SiteClient('f15ca410478614ea08e7c291788480');
const loremIpsum = require('lorem-ipsum');


// // get all models
// client.itemTypes.all()
//   .then((models) => console.log(models));


// obtain all the fields of the Work model
// client.fields.all("108543")
//   .then((fields) => console.log(fields));

// get the records for Work
// client.items.all({ 'filter[type]': 'work' }, { allPages: true })
//   .then((records) => console.log('TOTAL WORKS: ' + records.length));

const totalWorks = 100;
const startFrom = 4080;
const chunks = Math.floor(totalWorks / 30);


for (let chunk = 0; chunk < chunks; chunk++) {
  // be sure to wait for 3 seconds to respect the rate limit
  setTimeout(() => {
    console.log('waiting 4secs...')
  }, 4000);

  //do stuff
  for (let index = 0; index < 30; index++) {
    const id = ((index + 1) * (chunk + 1)) + startFrom;

    // create a new Work item
    client.items.create({
      itemType: '108543',
      slug: 'work' + id,
      title: 'Work ' + id,
      coverImage: '777951',
      excerpt: loremIpsum.loremIpsum({
        count: 1                      // Number of words, sentences, or paragraphs to generate.
        , units: 'sentences'            // Generate words, sentences, or paragraphs.
        , sentenceLowerBound: 15         // Minimum words per sentence.
        , sentenceUpperBound: 30        // Maximum words per sentence.
        , format: 'plain'
      }),
      gallery: ['777952', '777953'],
      description: loremIpsum.loremIpsum({
        count: 1                      // Number of words, sentences, or paragraphs to generate.
        , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
        , sentenceLowerBound: 5         // Minimum words per sentence.
        , sentenceUpperBound: 15        // Maximum words per sentence.
        , paragraphLowerBound: 20        // Minimum sentences per paragraph.
        , paragraphUpperBound: 50        // Maximum sentences per paragraph.
        , format: 'plain'
      }),
      seoSettings: null
    })
      .then(() => {
        console.log(`index: ${index}, chunk: ${chunk}, id: ${id}`);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
