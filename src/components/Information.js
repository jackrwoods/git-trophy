import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Lightbox from 'react-images'

export default class Information extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      lightboxOpen: false,
      currentImage: 0
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
  }

  openLightbox () {
    this.setState({ lightboxOpen: true })
  }

  closeLightbox () {
    this.setState({ lightboxOpen: false })
  }

  render () {
    return (
      <Container textAlign='left' style={{fontSize: 16}}>
        <Header size='large'>
          About Git Trophy
        </Header>
        <em>"Git Trophies" make great desk ornaments, and allow you to proudly display the hard work of you and your teams.</em>

        <Header>
          What do these look like as printed objects?
        </Header>
        <Lightbox
          images={[
            { src: '/img/trophy_examples/DSC_0608.jpg' },
            { src: '/img/trophy_examples/DSC_0609.jpg',
              caption: 'Box of floss, for scale' }
          ]}
          preloadNextImage
          currentImage={this.state.currentImage}
          onClickPrev={() => { this.setState({currentImage: this.state.currentImage - 1}) }}
          onClickNext={() => { this.setState({currentImage: this.state.currentImage + 1}) }}
          onClose={this.closeLightbox}
          isOpen={this.state.lightboxOpen}
        />
        <p><a href='#' onClick={this.openLightbox}>Here's how mine turned out.</a></p>

        <Header>
          How do I get my Git Trophy printed?
        </Header>
        <p>The easiest way I've found is to get them printed through <a href='https://www.shapeways.com/'>Shapeways</a>. You can click on the Shapeways button to export your model, and then go through their process to order a print.</p>

        <p>I'd suggest using <strong>Coated Full Color Sandstone</strong> or the normal <strong>Full Color Sandstone</strong> materials, so the printed model retains its colors.</p>

        <p>Of course, you can also download your model as an X3D file, and go about printing it yourself as well. The X3D file also maintains the colors of the model, but most hobbiest-grade 3D printers don't print in full color.</p>

        <p>As a "disclaimer", I don't get any kind of kickback or referral from Shapeways, I just like their service.</p>

        <Header>
          How expensive are these to print?
        </Header>
        <p>If you go with my recommended scale (~6.6in x 1.1in x 0.9in), the Shapeways price is about <strong>$37</strong>.</p>

        <p>The cost can be adjusted slightly by changing the scale of the model, and by choosing whether to use the coated varient of the Full Color Sandstone material. (The coated version will be more resliant, and less likely to break / degrade over time)</p>

        <Header>
          Doesn't this overemphasize commits as a measure of progress?
        </Header>
        <p>Lighten up! Sure, there may be more accurate measures of the progress of projects, but I just wanted something that would look cool on my desk. 😁</p>

        <Header>
          How did you build this?
        </Header>
        <p><strong>Frontend:</strong> The app uses <a href='https://facebook.github.io/react/'>React</a> and <a href='https://threejs.org/'>Three.js</a> to generate and render the models.</p>
        <p><strong>Backend:</strong> The site uses a <a href='https://aws.amazon.com/lambda/'>AWS Lambda</a> serverless backend (managed by <a href='https://github.com/Miserlou/Zappa/'>Zappa</a>) to scrape and serve Github contribution data.</p>
        <p>For more information, check out the <a href='http://benjamincongdon.me/blog/2017/08/11/Building-GitTrophy/'>blog post</a> I wrote about building GitTrophy.</p>

        <p>All of the code for this project is open-source. Feel free to check out the <a href='https://github.com/bcongdon/git-trophy'>git-trophy</a> repo (and leave a ⭐, if you're so inclined. 😉)</p>

        <a className='github-button' href='https://github.com/bcongdon/git-trophy' data-show-count='true' aria-label='Star bcongdon/git-trophy on GitHub'>Star</a>
      </Container>
    )
  }
}
