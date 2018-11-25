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
      duration: 10000,
      easing,
      background: '#FF7BFF',
    })
    .add({
      targets: '.bar1',
      translateX: '50vw',
      duration: 10000,
      easing,
      background: '#8CFE92',
    })
    .add({
      targets: '.bar1',
      translateX: '-10vw',
      duration: 20000,
      easing,
      background: '#FFFC92',
    })
    .add({
      targets: '.bar1',
      translateX: '20vw',
      duration: 6000,
      easing,
      background: '#B466FF',
    })
    .add({
      targets: '.bar1',
      translateX: '40vw',
      duration: 6000,
      easing,
      background: '#958DFF',
    })

  bar2Timeline
    .add({
      targets: '.bar2',
      translateX: '-90vw',
      duration: 12000,
      easing,
      background: '#958DFF',
    })
    .add({
      targets: '.bar2',
      translateX: '-60vw',
      duration: 10000,
      easing,
      background: '#FFFC92',
    })
    .add({
      targets: '.bar2',
      translateX: '-30vw',
      duration: 10000,
      easing,
      background: '#FF78AF'
    })
    .add({
      targets: '.bar2',
      translateX: '10vw',
      duration: 20000,
      easing,
      background: '#8CFE92'
    })

  bar3Timeline
    .add({
      targets: '.bar3',
      translateX: '-30vw',
      duration: 8000,
      easing,
      background: '#FFFC92',
    })
    .add({
      targets: '.bar3',
      translateX: '50vw',
      duration: 16000,
      easing,
      background: '#8CFE92'
    })
    .add({
      targets: '.bar3',
      translateX: '70vw',
      duration: 16000,
      easing,
      background: '#FF94A1'
    })
    .add({
      targets: '.bar3',
      translateX: 0,
      duration: 16000,
      easing,
      background: '#B466FF'
    })

  bar4Timeline
    .add({
      targets: '.bar4',
      translateX: '20vw',
      duration: 12000,
      easing,
      background: '#FF7BFF'
    })
    .add({
      targets: '.bar4',
      translateX: '-60vw',
      duration: 16000,
      easing,
      background: '#4FFEC9'
    })
    .add({
      targets: '.bar4',
      translateX: '-20vw',
      duration: 16000,
      easing,
      background: '#FF7BFF'
    })
    .add({
      targets: '.bar4',
      translateX: '10vw',
      duration: 16000,
      easing,
      background: '#4FFEC9'
    })
    .add({
      targets: '.bar4',
      translateX: 0,
      duration: 12000,
      easing,
      background: '#958DFF'
    })

  bar5Timeline
    .add({
      targets: '.bar5',
      translateX: '-20vw',
      duration: 16000,
      easing,
      background: '#FFB18A'
    })
    .add({
      targets: '.bar5',
      translateX: '-40vw',
      duration: 8000,
      easing,
      background: '#B466FF'
    })
    .add({
      targets: '.bar5',
      translateX: 0,
      duration: 8000,
      easing,
      background: '#85FCFF'
    })
    .add({
      targets: '.bar5',
      translateX: '40vw',
      duration: 16000,
      easing,
      background: '#FF78AF'
    })

  bar6Timeline
    .add({
      targets: '.bar6',
      translateX: '10vw',
      duration: 8000,
      easing,
      background: '#FF94A1'
    })
    .add({
      targets: '.bar6',
      translateX: 0,
      duration: 4000,
      easing,
      background: '#958DFF'
    })
    .add({
      targets: '.bar6',
      translateX: '40vw',
      duration: 16000,
      easing,
      background: '#FFB18A'
    })
    .add({
      targets: '.bar6',
      translateX: '20vw',
      duration: 6000,
      easing,
      background: '#85FCFF'
    })
    .add({
      targets: '.bar6',
      translateX: '-30vw',
      duration: 6000,
      easing,
      background: '#FFFC92'
    })
    .add({
      targets: '.bar6',
      translateX: '-50vw',
      duration: 6000,
      easing,
      background: '#FF7BFF'
    })
}
