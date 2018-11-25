import anime from 'animejs'

export function animate() {
  let loop = true
  let easing = 'easeInOutSine'
  let direction = 'alternate'
  let duration = 10000

  var bar1Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  var bar2Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  var bar3Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  var bar4Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  var bar5Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  var bar6Timeline = anime.timeline({
    loop,
    direction,
    duration
  })

  bar1Timeline
    .add({
      targets: '.bar1',
      translateX: '90vw',
      duration: 40000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar1',
      translateX: '50vw',
      duration: 40000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar1',
      translateX: '-10vw',
      duration: 80000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar1',
      translateX: '20vw',
      duration: 24000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar1',
      translateX: '40vw',
      duration: 24000,
      easing,
      background: '#121219',
    })

  bar2Timeline
    .add({
      targets: '.bar2',
      translateX: '-90vw',
      duration: 48000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar2',
      translateX: '-60vw',
      duration: 40000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar2',
      translateX: '-30vw',
      duration: 40000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar2',
      translateX: '10vw',
      duration: 80000,
      easing,
      background: '#121219'
    })

  bar3Timeline
    .add({
      targets: '.bar3',
      translateX: '-30vw',
      duration: 32000,
      easing,
      background: '#121219',
    })
    .add({
      targets: '.bar3',
      translateX: '50vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar3',
      translateX: '70vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar3',
      translateX: 0,
      duration: 64000,
      easing,
      background: '#121219'
    })

  bar4Timeline
    .add({
      targets: '.bar4',
      translateX: '20vw',
      duration: 48000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar4',
      translateX: '-60vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar4',
      translateX: '-20vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar4',
      translateX: '10vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar4',
      translateX: 0,
      duration: 48000,
      easing,
      background: '#121219'
    })

  bar5Timeline
    .add({
      targets: '.bar5',
      translateX: '-20vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar5',
      translateX: '-40vw',
      duration: 32000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar5',
      translateX: 0,
      duration: 32000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar5',
      translateX: '40vw',
      duration: 64000,
      easing,
      background: '#121219'
    })

  bar6Timeline
    .add({
      targets: '.bar6',
      translateX: '10vw',
      duration: 32000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar6',
      translateX: 0,
      duration: 16000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar6',
      translateX: '40vw',
      duration: 64000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar6',
      translateX: '20vw',
      duration: 24000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar6',
      translateX: '-30vw',
      duration: 24000,
      easing,
      background: '#121219'
    })
    .add({
      targets: '.bar6',
      translateX: '-50vw',
      duration: 24000,
      easing,
      background: '#121219'
    })
}
