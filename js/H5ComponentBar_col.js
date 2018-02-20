var H5ComponentBar_col = function(name, cfg) {
  var component = new H5ComponentBase(name, cfg);
  $.each(cfg.data, function(index, item) {
    var bar = $('<div class="bar"></div>');
    var key = $('<div class="key">' + item.key + '</div>');
    var progress = $('<div class="progress">');
    var bg = $('<div class="bg">');
    var value = $('<div class="value">' + (item.value * 100).toFixed(1) + '%' + '</div>');
    bar.css('left',cfg.width/2/cfg.data.length*index+cfg.width/4/cfg.data.length)
    progress.append(bg).append(value);
    progress.height(item.value * 100 + '%')
    if (item.color) {
      bg.css('background', item.color);
      // value.css('color', item.color);
    }
    bar.append(progress).append(key)
      // bar.append(key).append(progress).append(value)
    component.append(bar)
  })
  return component;
}