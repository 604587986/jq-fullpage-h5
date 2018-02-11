var H5ComponentPoint = function(name, cfg) {
  var component = new H5ComponentBase(name, cfg);
  var baseValue = cfg.data[0].value;
  $.each(cfg.data, function(index, item) {
    var point = $('<div class="point">');
    var value = $('<div class="value">' + item.value * 100 + '%' + '</div>')
    var key = $('<div class="key">' + item.key + '</div>')

    point.append(key).append(value)
    var per = item.value / baseValue;
    point.width(1 / Math.sqrt(1 / per) * 100 + '%').height(1 / Math.sqrt(1 / per) * 100 + '%');
    
    point.css('font-size', item.value * 100 + 'px')
    point.css('transition','all 1s '+0.5*index+'s')
    if (item.color) {
      point.css('background-color', item.color)
    }
    if (item.offsetX !== undefined && item.offsetY !== undefined) {
      point.css({ left: item.offsetX, top: item.offsetY })
    }
    component.append(point)

  })
  return component;
}