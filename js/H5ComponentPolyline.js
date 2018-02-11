var H5ComponentPolyline = function(name, cfg) {
  var component = new H5ComponentBase(name, cfg);

  var w = cfg.width;
  var h = cfg.height;
  //第一层画布
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  //开始绘制网格线
  var step = 10;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#aaa';
  for (var i = 0; i <= 10; i++) {
    ctx.moveTo(0, i * (h / step));
    ctx.lineTo(w, i * (h / step));
  }
  step = cfg.data.length + 1;
  for (var i = 0; i <= step; i++) {
    ctx.moveTo(i * (w / step), 0);
    ctx.lineTo(i * (w / step), h);
    //创建文本节点
    if (cfg.data[i]) {
      var text = $('<div class="key">' + cfg.data[i].key + '</div>');
      text.width(w / step / 2).css('left', w / step / 4 * (2 * i + 1) + 'px')
      component.append(text)
    }
  }
  ctx.stroke();
  component.append(canvas);
  //第二层画布
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = ctx.width = w;
  canvas.height = ctx.height = h;
  /**
   * 
   * @param {per} per 用于调整图表高度，完成动画效果
   */
  var draw = function(per) {
    //开始绘制折线
    ctx.clearRect(0, 0, w, h)
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff8878';
    ctx.fillStyle = '#000';
    ctx.beginPath();    
    //画点
    $.each(cfg.data, function(index, item) {
        var x = w / step * (index + 1);
        var y = h * (1 - item.value * per);
        ctx.moveTo(x, y);
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
      })
      //连线
    ctx.moveTo(w / step, h * (1 - cfg.data[0].value * per));
    $.each(cfg.data, function(index, item) {
      x = w / step * (index + 1);
      y = h * (1 - item.value * per);
      ctx.lineTo(x, y);
    })
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255,178,178,.5)';
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    //阴影
    ctx.lineTo(x, h);
    ctx.lineTo(w / step, h);
    ctx.lineTo(w / step, h * (1 - cfg.data[0].value));
    ctx.fill()
      //填数据
    ctx.fillStyle = '#000';
    $.each(cfg.data, function(index, item) {
      var x = w / step * (index + 1);
      var y = h * (1 - item.value * per);
      ctx.moveTo(x, y);
      ctx.fillText(item.value, x - 10, y - 10)

    })
    ctx.stroke()
    component.append(canvas);
  }
  component.on('onLoad', function() {
    //载入动画
    var per = 0;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        per += 0.01
        draw(per)
      }, i * 10)
    }
  });
  component.on('onLeave', function() {
    //载出动画
    var per = 1;
    for (i = 0; i < 100; i++) {
      setTimeout(function() {
        per -= 0.01
        draw(per)
      }, i * 10)
    }
  });

  return component;
}