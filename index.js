export const buildThresholdList = (steps = 20) => {
  var thresholds = [];
  var numSteps = steps;

  for (var i=1.0; i<=numSteps; i++) {
    var ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

const generateBaseHero = (toNode, fromNode, duration) => {
  const fromRect = fromNode.getBoundingClientRect();
  const toRect = toNode.getBoundingClientRect();
  const deltaLeft = fromRect.left - toRect.left;
  const deltaTop = fromRect.top - toRect.top;
  const deltaWidth = fromRect.width / toRect.width;
  const deltaHeight = fromRect.height / toRect.height;

  const animationTimingConfig = {
    fill: 'none',
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    duration: duration,
    delay: 150
  };

  const frames = [
    { 
      'transform': 'translate(' + deltaLeft + 'px,' + deltaTop + 'px) scale(' + deltaWidth + ',' + deltaHeight + ')',
      'opacity': .75,
    },
    { 
      'transform': 'none',
      'opacity': 1,
    }
  ];
  
  return { frames, animationTimingConfig };
}

export const generateHeroTransitionAnimation = (toNode, fromNode, toPage, fromPage) => {
  const config = generateBaseHero(toNode, fromNode, 250);
  
  toNode.style['transformOrigin'] = '0 0';
  toPage.style.zIndex = 10000;
  toPage.style.visibility = 'visible';
  fromPage.style.visibility = 'hidden';

  toNode.animate(config.frames, config.animationTimingConfig);
}

export const generateHeroOverlayAnimation = (toNode, fromNode, parentNode) => {
  const config = generateBaseHero(toNode, fromNode, 350);
  
  toNode.style['transformOrigin'] = '0 0';
  toNode.style.zIndex = 10000;
  toNode.style.pointerEvents = 'auto';
  parentNode.style.opacity = .7;

  const animation = toNode.animate(config.frames, config.animationTimingConfig);

  animation.onfinish = () => {
    toNode.style.opacity = 1;
  };
}

export const generateFlipAnimation = (node, direction = 'forwards', axis = 'Y') => {
  const duration = 1000;
  const animationTimingConfig = {
    fill: 'forwards',
    easing: "ease-in-out",
    duration: duration
  };
  let frames;

  if (direction === 'forwards') {
    frames = [
      {transform: `translateZ(-200px) rotate${axis}(180deg) scale(1)`, opacity: 0},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.15},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.20},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.65},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.70},
      {transform: `translateZ(-200px) rotate${axis}(0) scale(1)`, opacity: 1}
    ];
  } else {
    frames = [
      {transform: `translateZ(-200px) rotate${axis}(0) scale(1)`, opacity: 1},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1,  offset: 0.15},
      {transform: `translateZ(-100px) rotate${axis}(0) scale(1.1, 1.1)`, opacity: 1, offset: 0.20},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.65},
      {transform: `translateZ(-100px) rotate${axis}(180deg) scale(1.1, 1.1)`, opacity: 1, offset: 0.70},
      {transform: `translateZ(-200px) rotate${axis}(180deg) scale(1)`, opacity: 0}
    ];
  }

  node.animate(frames, animationTimingConfig);
}

export const generatePageTransitionAnimation = (node, direction = 'forwards') => {
  const duration = 450;

  const baseFrame = { 
    'opacity': 1 
  };
  const modFrame = { 
    'opacity': 0 
  };
  const animationTimingConfig = {
    fill: 'none',
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    duration: duration
  };
  let frames;

  if (direction === 'forwards') {
    frames = [modFrame, baseFrame];
  } else {
    frames = [baseFrame, modFrame]
    node.style.pointerEvents = 'none';
  }
  
  const animation = node.animate(frames, animationTimingConfig);
  animation.onfinish = () => {
    if (direction === 'forwards') {
      node.style.opacity = 1;
    } else {
      node.style.opacity = 0;
    }
  };
}

export const generateBaseLoadAnimation = (node, direction = 'forwards') => {
  const duration = 250;
  const baseFrame = { 'opacity': 1 };
  const modFrame = { 'opacity': 0 };
  const animationTimingConfig = {
    fill: 'none',
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    duration: duration
  };
  let frames;

  if (direction === 'forwards') {
    frames = [modFrame, baseFrame];
  } else {
    frames = [baseFrame, modFrame]
  }

  const animation = node.animate(frames, animationTimingConfig);

  animation.onfinish = () => {
    if (direction === 'forwards') {
      node.style.opacity = 1;
    } else {
      node.style.opacity = 0;
    }
  };
}