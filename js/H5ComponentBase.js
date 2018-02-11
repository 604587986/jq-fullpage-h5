var H5ComponentBase = function(name, cfg) {
  var cfg = cfg || {};
  var id = ('h5-c-' + Math.random()).replace('.', '-');
  var cls = 'h5-component-' + cfg.type + ' h5-component-name-' + name;
  var component = $('<div class="h5-component ' + cls + '" id="' + id + '"></div>');
  cfg.width && component.width(cfg.width / 2)
  cfg.height && component.height(cfg.height / 2)
  cfg.text && component.text(cfg.text);
  cfg.css && component.css(cfg.css)
  cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')');
  if (cfg.center === true) {
    component.css({
      left: '50%',
      marginLeft: -(cfg.width / 4) + 'px'
    })
  }
  if(cfg.click){
    component.on('click',cfg.click)
  }

  //监听事件
  component.on('onLoad', function() {
    setTimeout(function() {
      component.addClass('h5-component-' + cfg.type + '-load').removeClass('h5-component-' + cfg.type + '-leave')
      cfg.animateIn && component.animate(cfg.animateIn)

    }, cfg.delay || 0)

    return false;
  })
  component.on('onLeave', function() {
    setTimeout(function() {
      component.addClass('h5-component-' + cfg.type + '-leave').removeClass('h5-component-' + cfg.type + '-load')
      cfg.animateOut && component.animate(cfg.animateOut)
    }, cfg.delay || 0)

    return false;
  })
  return component;
}