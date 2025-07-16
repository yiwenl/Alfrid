// main.js
import './global.scss'
import quickSetup from './utils/quickSetup'
import AssetsLoader from 'assets-loader'

function render () {
}

quickSetup(render)
  .then((o) => {
    const assets = [
      { id: 'image', url: 'assets/img/test.jpg' },
      { id: 'image1', url: 'assets/img/test1.jpg' },
      { id: 'image2', url: 'assets/img/test2.jpg' },
      { id: 'hdr', url: 'assets/img/singleLight.hdr', type: 'binary' }
    ]

    new AssetsLoader({
      assets
    }).on('error', (err) => {
      console.log('Error loading :', err)
    }).on('complete', (o) => {
      _onAssetsLoaded(o)
    }).start()
  })

function _onAssetsLoaded (o) {
  console.table(o)
  window.assets = o
}

function getAsset (id) {
  const o = assets.find(a => {
    return a.id === id
  })

  if (!o) {
    return null
  }
  return o.file
}
