const template = `
  <header >
    <div class="container mx-auto">
      <div class="w-3/4 mx-auto my-6">
        <img class="shadow-2xl rounded-lg" :src="imageLink" :alt="altText"> 
        <div class="max-w-screen-lg mx-auto text-center py-12 mt-4">
          <h2 class="text-3xl leading-9 font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-10">
              {{titleText}}
          </h2>
        </div>
        
      </div>
    </div>

     
  </header>
`

export default {
  template,
  setup() {
    const imageLink = 'https://i.redd.it/cayhgllq3ui21.jpg'
    const altText = 'seinfeldCast'
    const titleText = 'Find your favorite seinfeld quotes'
    return {
      imageLink,
      altText,
      titleText,
    }
  },
}
